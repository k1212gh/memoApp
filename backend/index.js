const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

// CORS 허용: 실제 프론트 배포 주소만 허용
app.use(
  cors({
    origin: "https://k1212gh.site",  // 👈 배포된 프론트 주소만 허용
    credentials: true, // 쿠키 등 인증 필요 시
  })
);

app.use(express.json());

// API 라우터 등록
app.use("/api/auth", require("./routes/auth"));
app.use("/api/memos", require("./routes/memos"));

// (옵션) 프론트엔드 build 폴더 정적 파일 제공 (SPA 대응)
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// 포트 설정
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

