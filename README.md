# Flowva Rewards Hub Technical Assessment

A high-performance, premium-designed Rewards Hub built with **Next.js 14**, **Tailwind CSS**, and **Supabase**. This project recreates the core "Earn" and "Redeem" features of the Flowva platform with real-time data persistence and a mobile-first approach.

## 🚀 Live Demo
**[Insert Your Live URL Here]**

---

## ✨ Features

### 💎 Rewards Engine
- **Dynamic Points Balance**: Real-time points tracking fetched directly from Supabase.
- **Daily Streak System**: 
  - Automated check-in logic that rewards consistency.
  - Streak protection: Increments if claimed within 48 hours, resets otherwise.
- **Engagement Actions**: 
  - One-time claimable rewards for "Tool Highlight" and "Social Sharing".
  - Backend validation to prevent duplicate claims.

### 🔗 Scalable Referrals
- **Personalized Links**: Each user gets a unique referral code generated on signup.
- **One-Click Sharing**: Horizontal social sharing bar with dynamic link generation.

### 📱 Premium UX/UI
- **Horizontal Filters**: Horizontally scrollable filter bar with a custom `scrollbar-hide` utility.
- **Glassmorphic Auth**: Sleek, high-converting Login and Signup pages.
- **Full Responsiveness**: Optimized for everything from iPhone SE to 4K displays.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend & Auth**: Supabase
- **Icons**: Lucide React
- **Animations**: Tailwind Keyframes

---

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd flowva-rewards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   Run the SQL found in [`lib/supabase/schema.sql`](./lib/supabase/schema.sql) in your Supabase SQL Editor. This will:
   - Extend the `profiles` table.
   - Create `reward_actions` and `referrals` tables.
   - Set up RLS (Row Level Security) policies.

5. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 🧪 Test Credentials
If you'd like to skip account creation, you can use the following test account:
- **Email**: `test@flowva.com`
- **Password**: `flowva123`

---

## 🧠 Assumptions & Trade-offs
- **Profile Creation**: For simplicity in this assessment, I implemented client-side profile initialization in the Signup flow. In a production environment, I would use a PostgreSQL trigger in Supabase to handle this server-side for better data integrity.
- **Streak Calculation**: I assumed a "daily" streak is valid if the last claim was > 24h ago but < 48h ago.
- **Static vs Dynamic**: Hardcoded static marketing content (like tool descriptions) to optimize load times, while keeping all user-specific values and states fully dynamic.

---

## 🏆 Assessment Requirements Met
- ✅ **Authentication**: Handled directly via Supabase Auth.
- ✅ **Database**: Real use of relational tables, foreign keys, and RLS.
- ✅ **UI/UX**: Recreated with pixel perfection and premium aesthetic.
- ✅ **Error Handling**: Full handling of loading, empty, and error states.
