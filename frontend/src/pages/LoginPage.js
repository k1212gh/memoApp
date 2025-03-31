import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
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

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // ✅ 로그인 정보 저장 (user.name 포함!)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);        // UUID
      localStorage.setItem("userName", user.name);    // 이름 저장

      alert("로그인 성공!");
      navigate("/memo");
    } catch (err) {
      console.error("로그인 실패", err);
      alert("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Container>
      <Title>🔐 로그인</Title>
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
      <Button onClick={handleLogin}>로그인</Button>

      <LinkText>
        계정이 없으신가요? <a href="/memo/register">회원가입</a>
      </LinkText>
    </Container>
  );
};

export default LoginPage;

