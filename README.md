# Feedants Full Stack Competition Assignment

This repository contains the completed, fully dynamic full-stack technical assignment for the **Feedants Classical Dance Competition** feature.

---

## Architecture & Technology Stack

- **Backend**: Node.js, Express, TypeScript, Mongoose (MongoDB Atlas)
- **Frontend**: React Native, Expo, TypeScript
- **Database**: MongoDB Cloud (Atlas)

---

## Key Features & Implementations

1. **Atomic Concurrency Handling**:
   - Spot booking uses MongoDB atomic conditional operations (`findOneAndUpdate` checking `$expr: { $lt: ["$bookedSpots", "$totalSpots"] }`) to guarantee spots are never overbooked even under concurrent user requests.

2. **Complete Reference UI Components**:
   - Top Header with Language switchers.
   - Live Countdown Timer calculating dynamic days, hours, minutes, and seconds remaining based on backend lifecycle dates.
   - Spots progress indicator showing real-time booked/remaining status.
   - Interactive Tabs for About, Judging Parameters, and Rules.
   - Responsive, styled sections for Rewards, Important Dates, and Judges.

---

## Setup & Running Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with your MongoDB connection string:
```env
MONGO_URI=mongodb+srv://dhruv_081:c1ebb9fBsV@cluster0.fxwvtr5.mongodb.net/feedants?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

Seed the database with the reference competition data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

---

### 2. Frontend Setup

In a new terminal window:
```bash
cd frontend
npm install --legacy-peer-deps
```

Start the Expo development server:
```bash
npx expo start -c
```

- Press **`w`** to view the app directly in your desktop browser.
- Scan the QR code with **Expo Go** to view it on an Android or iOS device.

---

## API Overview

- `GET /api/competitions/:id` - Fetches full details for a competition along with user registration status.
- `POST /api/competitions/:id/register` - Registers a user for the competition with atomic spot checks.
