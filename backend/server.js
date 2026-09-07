require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Member = require('./models/Member');
const Payment = require('./models/Payment');
const Expense = require('./models/Expense');
// const SportsData = require('./models/SportsData');
const Settings = require('./models/Settings');
const cloudinary = require('cloudinary').v2;
const Event = require('./models/Event');


const app = express();
app.use(cors({
  origin: [
    'https://tiswa.vercel.app',
    'https://tiswaadmin.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ]
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tiswa', {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('MongoDB Connected to TISWA db'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    console.log('TIP: Ensure local MongoDB is running, or add an Atlas URL to a .env file.');
  });

// Members Routes
app.get('/api/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});
app.post('/api/members', async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.json(newMember);
});
app.put('/api/members/:id', async (req, res) => {
  const update = await Member.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(update);
});
app.delete('/api/members/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Payments Routes
app.get('/api/payments', async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});
app.post('/api/payments', async (req, res) => {
  const newPayment = new Payment(req.body);
  await newPayment.save();
  res.json(newPayment);
});
app.delete('/api/payments/:id', async (req, res) => {
  await Payment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Expenses Routes
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});
app.post('/api/expenses', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});
app.delete('/api/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// // Sports Data Routes
// app.get('/api/sports', async (req, res) => {
//   let sports = await SportsData.findOne();
//   if(!sports) {
//     sports = new SportsData({
//       tournament: "Ramadan Cricket Cup 2026",
//       winner: "Team A (Green Stallions)",
//       runner: "Team B (United Warriors)",
//       manOfSeries: "Asaruddeen",
//       bestBowler: "Udhay (9 wickets)",
//       updates: "Final match held on April 12. Great sportsmanship!"
//     });
//     await sports.save();
//   }
//   res.json(sports);
// });
// app.put('/api/sports', async (req, res) => {
//   let sports = await SportsData.findOne();
//   if(sports) {
//     sports = await SportsData.findByIdAndUpdate(sports._id, req.body, {new:true});
//   } else {
//     sports = new SportsData(req.body);
//     await sports.save();
//   }
//   res.json(sports);
// });

// Event Routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    let imageUrl = req.body.image;
    
    // Upload to Cloudinary if it's a base64 image
    if (imageUrl && imageUrl.startsWith('data:image')) {
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: 'tiswa/events',
      });
      imageUrl = uploadRes.secure_url;
    }
    
    const newEvent = new Event({
      ...req.body,
      image: imageUrl
    });
    await newEvent.save();
    res.json(newEvent);
  } catch (error) {
    console.error("Event Creation Error:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    let imageUrl = req.body.image;
    
    // Upload to Cloudinary if it's a base64 image
    if (imageUrl && imageUrl.startsWith('data:image')) {
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: 'tiswa/events',
      });
      imageUrl = uploadRes.secure_url;
    }
    
    const updateData = {
      ...req.body,
      image: imageUrl
    };
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    console.error("Event Update Error:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Settings Routes
app.get('/api/settings', async (req, res) => {
  let settings = await Settings.findOne();
  if(!settings) {
    settings = new Settings({ upiId: "tiswa@icici", qrImage: "" });
    await settings.save();
  }
  res.json(settings);
});
app.put('/api/settings', async (req, res) => {
  try {
    let qrImageUrl = req.body.qrImage;
    // Upload if it's a new base64 image
    if (qrImageUrl && qrImageUrl.startsWith('data:image')) {
      const uploadRes = await cloudinary.uploader.upload(qrImageUrl, {
        folder: 'tiswa',
      });
      qrImageUrl = uploadRes.secure_url;
    }

    let settings = await Settings.findOne();
    if(settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, { upiId: req.body.upiId, qrImage: qrImageUrl }, {new:true});
    } else {
      settings = new Settings({ upiId: req.body.upiId, qrImage: qrImageUrl });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error("Settings Update Error:", error);
    res.status(500).json({ error: "Failed to save settings. Check Cloudinary Config." });
  }
});

// Health Check Routes
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
