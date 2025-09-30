const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 1337;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));
app.use('/admin', express.static('public'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Initialize SQLite database
const db = new sqlite3.Database('cms.db');

// Create tables
db.serialize(() => {
  // Trips table
  db.run(`CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    duration TEXT,
    price TEXT,
    location TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    price TEXT,
    category TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Articles table
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    author TEXT,
    category TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Videos table
  db.run(`CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    slug TEXT UNIQUE,
    duration TEXT,
    category TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Entrepreneurs table
  db.run(`CREATE TABLE IF NOT EXISTS entrepreneurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    contact_info TEXT,
    location TEXT,
    category TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Users table for authentication
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin user (password: admin123)
  db.run(`INSERT OR IGNORE INTO users (username, email, password, role) VALUES 
    ('admin', 'admin@greenbluerestbangkok.com', 'admin123', 'admin')`);
});

// Helper function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// API Routes for Trips
app.get('/api/trips', (req, res) => {
  db.all('SELECT * FROM trips ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/trips/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM trips WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/trips', upload.single('image'), (req, res) => {
  const { title, description, content, duration, price, location, status } = req.body;
  const slug = generateSlug(title);
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO trips (title, description, image_url, slug, content, duration, price, location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, image_url, slug, content, duration, price, location, status || 'draft'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Trip created successfully' });
    }
  );
});

app.put('/api/trips/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, description, content, duration, price, location, status } = req.body;
  const slug = generateSlug(title);
  
  let updateQuery = 'UPDATE trips SET title = ?, description = ?, slug = ?, content = ?, duration = ?, price = ?, location = ?, status = ?, updated_at = CURRENT_TIMESTAMP';
  let params = [title, description, slug, content, duration, price, location, status || 'draft'];
  
  if (req.file) {
    updateQuery += ', image_url = ?';
    params.push(`/uploads/${req.file.filename}`);
  }
  
  updateQuery += ' WHERE id = ?';
  params.push(id);

  db.run(updateQuery, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }
    res.json({ message: 'Trip updated successfully' });
  });
});

app.delete('/api/trips/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM trips WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }
    res.json({ message: 'Trip deleted successfully' });
  });
});

// API Routes for Products (similar structure)
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/products', upload.single('image'), (req, res) => {
  const { title, description, content, price, category, status } = req.body;
  const slug = generateSlug(title);
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO products (title, description, image_url, slug, content, price, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, image_url, slug, content, price, category, status || 'draft'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Product created successfully' });
    }
  );
});

// API Routes for Articles
app.get('/api/articles', (req, res) => {
  db.all('SELECT * FROM articles ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/articles', upload.single('image'), (req, res) => {
  const { title, description, content, author, category, status } = req.body;
  const slug = generateSlug(title);
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO articles (title, description, image_url, slug, content, author, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, image_url, slug, content, author, category, status || 'draft'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Article created successfully' });
    }
  );
});

// API Routes for Videos
app.get('/api/videos', (req, res) => {
  db.all('SELECT * FROM videos ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/videos', upload.single('thumbnail'), (req, res) => {
  const { title, description, video_url, duration, category, status } = req.body;
  const slug = generateSlug(title);
  const thumbnail_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO videos (title, description, thumbnail_url, video_url, slug, duration, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, thumbnail_url, video_url, slug, duration, category, status || 'draft'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Video created successfully' });
    }
  );
});

// API Routes for Entrepreneurs
app.get('/api/entrepreneurs', (req, res) => {
  db.all('SELECT * FROM entrepreneurs ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/entrepreneurs', upload.single('image'), (req, res) => {
  const { title, description, content, contact_info, location, category, status } = req.body;
  const slug = generateSlug(title);
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO entrepreneurs (title, description, image_url, slug, content, contact_info, location, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, image_url, slug, content, contact_info, location, category, status || 'draft'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Entrepreneur created successfully' });
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GreenBlueRest CMS is running!' });
});

// Default route
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GreenBlueRest CMS is running on http://localhost:${PORT}`);
  console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`🔗 API Endpoints: http://localhost:${PORT}/api/`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down CMS...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('📦 Database connection closed.');
    process.exit(0);
  });
});
