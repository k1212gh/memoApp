const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// 메모 전체 조회
router.get("/", async (req, res) => {
  try {
    const [memos] = await pool.execute("SELECT * FROM memos ORDER BY created_at DESC where state =active");
    res.json(memos);
  } catch (error) {
    console.error("? 메모 조회 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 메모 추가
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const [result] = await pool.execute("INSERT INTO memos (text) VALUES (?)", [text]);
    const [memo] = await pool.execute("SELECT * FROM memos WHERE id = ?", [result.insertId]);
    res.json(memo[0]);
  } catch (error) {
    console.error("? 메모 추가 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 메모 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute("DELETE FROM memos WHERE id = ?", [id]);
    res.json({ message: "삭제 완료" });
  } catch (error) {
    console.error("? 메모 삭제 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
