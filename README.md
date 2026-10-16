# GroupWorks

그룹웨어 (근태, 공지, 결재, 조직도, 회의실 예약, 할 일, 쪽지)

## 구조

| 폴더 | 내용 |
|---|---|
| `backend/` | Spring Boot 3.3 + Java 17, MyBatis, Oracle |
| `groupworksreactapp/` | React 18 프론트 (CRA) |
| `db/GroupWorks.sql` | DB 스키마 |

## 실행

**백엔드** (http://127.0.0.1:8888/app)

1. `backend/src/main/resources/application-local.yml.example` 을 `application-local.yml` 로 복사하고 DB 계정, JWT secret 을 채웁니다. (커밋되지 않음)
2. JDK 17 로 실행합니다.

```bash
cd backend
mvn spring-boot:run
```

로그인은 JWT 토큰 방식입니다. 토큰 유효 시간은 기본 8시간(`app.jwt.access-token-hours`)이고, 로그인/회원가입 외 모든 API 는 토큰이 있어야 합니다.

환경변수로도 설정할 수 있습니다: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `UPLOAD_DIR`(기본 `./uploads`), `CORS_ALLOWED_ORIGINS`.

**프론트** (http://localhost:3000)

```bash
cd groupworksreactapp
npm install
npm start
```

## ERD

![image](https://github.com/sbj07/groupworks/assets/102196339/244612ad-77e8-444c-9960-484dc7d5a72e)
