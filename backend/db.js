const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'news.db'));

// Initialize tables with all required columns
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    source TEXT,
    date TEXT,
    content TEXT,
    full_text TEXT,
    url TEXT UNIQUE,
    image_url TEXT,
    category_hint TEXT,
    raw_json TEXT,
    summary TEXT,
    sentiment_label TEXT,
    sentiment_score REAL,
    bias_label TEXT,
    bias_score REAL,
    bias_breakdown TEXT,
    reliability_score REAL,
    category TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
