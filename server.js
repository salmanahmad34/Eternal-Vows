require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve dynamic supabase-init.js
const fs = require('fs');
const path = require('path');
app.get('/supabase-init.js', (req, res) => {
  let content = fs.readFileSync(path.join(__dirname, 'supabase-init.js'), 'utf8');
  content = content.replace('REPLACE_SUPABASE_URL', process.env.SUPABASE_URL || '');
  content = content.replace('REPLACE_SUPABASE_KEY', process.env.SUPABASE_KEY || '');
  res.type('application/javascript');
  res.send(content);
});

// Serve static frontend files from current directory
app.use(express.static(__dirname));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
