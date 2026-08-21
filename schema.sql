-- 1. 회원가입 테이블 (Users)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 견적 문의 테이블 (Estimates)
DROP TABLE IF EXISTS estimates;

CREATE TABLE IF NOT EXISTS estimates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  title TEXT,
  company TEXT,
  region TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  user_type TEXT,
  platform_type TEXT,
  features TEXT,
  description TEXT,
  attachment_urls TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
