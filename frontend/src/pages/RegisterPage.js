import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Container = styled.div`
  max-width: 400px;
  margin: 120px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 16px;

  a {
    color: #007bff;
    text-decoration: none;
  }
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } 
catch (err) {
  console.error("회원가입 실패", err);
  if (err.response?.data?.message) {
    alert(`회원가입 실패: ${err.response.data.message}`);
  } else {
    alert("회원가입에 실패했습니다.");
  }
}
};

  return (
    <Container>
      <Title>📋 회원가입</Title>
      <Input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>가입하기</Button>

      <LinkText>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </LinkText>
    </Container>
  );
};

export default RegisterPage;

