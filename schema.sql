-- 1. 회원가입 테이블 (Users)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 견적 문의 테이블 (Estimates)
CREATE TABLE IF NOT EXISTS estimates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT,
  project_type TEXT,
  budget TEXT,
  description TEXT,
  attachment_url TEXT, -- R2에 업로드될 이미지 주소
  status TEXT DEFAULT 'PENDING',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
