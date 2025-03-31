import axios from "axios";

const API = axios.create({
  baseURL: "https://k1212gh.site/api", // 백엔드 포트
});

// 요청마다 JWT 토큰 자동 추가
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

