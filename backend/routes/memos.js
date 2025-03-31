const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// 전체 메모 불러오기
router.get("/", auth, async (req, res) => {
  const { created_by } = req.query;
  const [rows] = await pool.query(
    "SELECT * FROM notes WHERE created_by=? AND state='active' ORDER BY created_at DESC",
    [created_by]
  );
  res.json(rows);
});

// 메모 추가
router.post("/", auth, async (req, res) => {
  const { title, content, created_by } = req.body;
  const [result] = await pool.query(
    "INSERT INTO notes (title, content, created_by) VALUES (?, ?, ?)",
    [title, content, created_by]
  );
  const [newMemo] = await pool.query("SELECT * FROM notes WHERE note_id=?", [result.insertId]);
  res.json(newMemo[0]);
});

// 메모 삭제
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  await pool.query("UPDATE notes SET state='deleted', deleted_at=NOW() WHERE note_id=?", [id]);
  res.json({ msg: "삭제 완료" });
});

module.exports = router;

