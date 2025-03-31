// src/components/InputModal.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 12px;
`;

const Btn = styled.button`
  padding: 10px;
  margin-right: 8px;
  background: ${(props) => (props.cancel ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const InputModal = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = () => {
    if (!title || !content) return alert("내용을 입력해주세요.");
    onSave({ title, content });
  };

  return (
    <Overlay>
      <Modal>
        <Title>{initialData ? "메모 수정" : "새 메모 추가"}</Title>
        <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
        <div>
          <Btn onClick={handleSubmit}>{initialData ? "수정" : "추가"}</Btn>
          <Btn cancel onClick={onClose}>취소</Btn>
        </div>
      </Modal>
    </Overlay>
  );
};

export default InputModal;

