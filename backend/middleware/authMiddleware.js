const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    // 'Bearer ' 접두사를 제거하고 실제 토큰만 추출
    const realToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    // JWT 검증
    const decoded = jwt.verify(realToken, process.env.JWT_SECRET);

    // 디코딩된 유저 정보 저장 (req.user로 사용 가능)
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

