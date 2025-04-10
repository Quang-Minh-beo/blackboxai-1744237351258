const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.get('/api/products', (req, res) => {
  // TODO: Connect to database
  res.json([{id: 1, name: 'Sample Product'}]);
});

// AI Chatbot Endpoint
app.post('/api/chatbot', (req, res) => {
  // TODO: Integrate NLP processing
  res.json({reply: "Xin chào! Tôi có thể giúp gì cho bạn?"});
});

// Admin Auth Endpoint  
app.post('/api/admin/login', (req, res) => {
  // TODO: Implement admin authentication
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
