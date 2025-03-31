const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const [rows] = await pool.query(
    "INSERT INTO users (id, name, email, password) VALUES (UUID(), ?, ?, ?)",
    [name, email, hashed]
  );
  res.json({ msg: "등록 완료" });
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [users] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  const user = users[0];
  if (!user) return res.status(400).json({ msg: "이메일 없음" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "비밀번호 틀림" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;

