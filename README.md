# memoApp

간단하고 직관적인 메모 관리 애플리케이션입니다.  
사용자는 메모를 생성, 수정, 삭제하며 팀 단위로도 협업할 수 있습니다.

---

## 🔗 배포 주소

👉 [메모 페이지 바로가기](http://k1212gh.site/memo)

---

## 📁 프로젝트 구조

```bash
memoApp/
├── backend/           # Express 기반 API 서버
│   ├── routes/        # 메모 및 인증 라우팅
│   ├── config/        # DB 설정
│   └── middleware/    # 인증 미들웨어 등
├── frontend/          # React 기반 프론트엔드
├── README.md
└── .gitignore
