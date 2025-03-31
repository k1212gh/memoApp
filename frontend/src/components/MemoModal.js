import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
`;

const MemoModal = ({ title, content, setTitle, setContent, onAdd, onClose }) => {
  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <h3>✍️ 메모 추가</h3>
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={onAdd}>추가하기</Button>
      </ModalBox>
    </Backdrop>
  );
};

export default MemoModal;

