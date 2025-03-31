const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// �޸� ��ü ��ȸ
router.get("/", async (req, res) => {
  try {
    const [memos] = await pool.execute("SELECT * FROM memos ORDER BY created_at DESC where state =active");
    res.json(memos);
  } catch (error) {
    console.error("? �޸� ��ȸ ����:", error);
    res.status(500).json({ error: "���� ����" });
  }
});

// �޸� �߰�
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const [result] = await pool.execute("INSERT INTO memos (text) VALUES (?)", [text]);
    const [memo] = await pool.execute("SELECT * FROM memos WHERE id = ?", [result.insertId]);
    res.json(memo[0]);
  } catch (error) {
    console.error("? �޸� �߰� ����:", error);
    res.status(500).json({ error: "���� ����" });
  }
});

// �޸� ����
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute("DELETE FROM memos WHERE id = ?", [id]);
    res.json({ message: "���� �Ϸ�" });
  } catch (error) {
    console.error("? �޸� ���� ����:", error);
    res.status(500).json({ error: "���� ����" });
  }
});

module.exports = router;
