// src/components/MemoItem.js
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  word-wrap: break-word;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const MemoItem = ({ memo, onDelete, onEdit }) => {
  return (
    <Card>
      <ButtonGroup>
        <ActionBtn onClick={() => onEdit(memo)}>✏️</ActionBtn>
        <ActionBtn onClick={() => onDelete(memo.note_id)}>🗑</ActionBtn>
      </ButtonGroup>
      <h3>{memo.title}</h3>
      <p>{memo.content}</p>
      <small>{new Date(memo.created_at).toLocaleString()}</small>
    </Card>
  );
};

export default MemoItem;

