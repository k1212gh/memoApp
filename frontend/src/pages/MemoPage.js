// src/pages/MemoPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../api";
import MemoItem from "../components/MemoItem";
import InputModal from "../components/InputModal";

const Container = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  padding: 20px;
`;

const Header = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 24px;
`;

const MemoPage = () => {
  const navigate = useNavigate();
  const [memos, setMemos] = useState([]);
  const [user, setUser] = useState({ name: "", id: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");

    if (!token || !id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setUser({ name, id });
    fetchMemos(id);
  }, []);

  const fetchMemos = async (id) => {
    try {
      const res = await API.get(`/memos?created_by=${id}`);
      setMemos(res.data);
    } catch (err) {
      console.error("메모 불러오기 실패", err);
    }
  };

  const handleAdd = () => {
    setEditingMemo(null);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingMemo) {
        // 수정
        const res = await API.put(`/memos/${editingMemo.note_id}`, data);
        setMemos(memos.map((m) => (m.note_id === editingMemo.note_id ? res.data : m)));
      } else {
        // 추가
        const res = await API.post("/memos", { ...data, created_by: user.id });
        setMemos([res.data, ...memos]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error("메모 저장 실패", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;
    try {
      await API.delete(`/memos/${id}`);
      setMemos(memos.filter((m) => m.note_id !== id));
    } catch (err) {
      console.error("메모 삭제 실패", err);
    }
  };

  const handleEdit = (memo) => {
    setEditingMemo(memo);
    setModalOpen(true);
  };

  return (
    <Container>
      <Header>{user.name}님의 메모장</Header>
      <Button onClick={handleAdd}>+ 메모 추가</Button>
      <Grid>
        {memos.map((memo) => (
          <MemoItem key={memo.note_id} memo={memo} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </Grid>
      {modalOpen && (
        <InputModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingMemo}
        />
      )}
    </Container>
  );
};

export default MemoPage;

