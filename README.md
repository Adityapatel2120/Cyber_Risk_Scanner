<div align="center">

# 🛡️ Scam Scanner

![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38BDF8?logo=tailwind-css&logoColor=white)
![VirusTotal API](https://img.shields.io/badge/VirusTotal_API-integrated-brightgreen)

</div>

---

**Scam Scanner** is a web-based tool built with **React** that helps users quickly determine whether a URL is safe or potentially malicious. It uses the **VirusTotal API** to analyze any submitted link and displays detailed information — including reputation, threat level, and safety indicators — in an easy-to-understand format.

---

### 🚀 **Features**
- 🔗 **Real-time Link Scanning** — Paste any URL and get its safety report within seconds.  
- 🧭 **VirusTotal Integration** — Fetches accurate, up-to-date scan data from trusted cybersecurity sources.  
- 🧩 **Interactive Interface** — Clean, modern UI built with Tailwind CSS for a seamless experience.  
- ⚡ **Instant Feedback** — Displays whether a link is **Safe**, **Suspicious**, or **Malicious**.  
- 💡 **Educational Insight** — Encourages safer browsing habits by showing transparent results.

---

### 🖥️ **Live Demo**
If deployed (e.g., on Vercel or Netlify):  
👉 [Live App Link](#)  
*(replace `#` with your hosted URL once deployed)*

---

### 🧰 **Tech Stack**
| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js (Vite) |
| **Styling** | Tailwind CSS |
| **API** | VirusTotal API |
| **Build Tool** | Vite |
| **Language** | JavaScript (ES6+) |

---

### 🧠 **How It Works**
1. The user pastes a suspicious or unknown URL into the input field.  
2. When the **“Scan Now”** button is clicked, the app calls the VirusTotal API endpoint:
3. The API response includes:
- **Reputation score**
- **Threat categories**
- **Scan engine results**
4. The app processes this data and visually displays whether the link is:
- ✅ **Safe**
- ⚠️ **Suspicious**
- 🚨 **Malicious / Scam**

---

### 🎨 **UI Highlights**
- Elegant **dark mode** design using Tailwind CSS  
- Indigo–purple gradient accents for a cyber-security aesthetic  
- Smooth transitions, rounded cards, and shadow depth for visual clarity  
- Clean result cards summarizing safety information  

---

### 📁 **Project Structure**
scam-scanner/
├── src/

│ ├── api/ # API call logic to VirusTotal

│ ├── components/ # React components (Scannerform, Result, etc.)

│ ├── App.jsx # Root component

│ ├── main.jsx # Entry point

│ ├── index.css # Global styles

├── public/

├── package.json

├── README.md

└── .env

---

### ⚠️ **Notes**
- VirusTotal’s **free API** is limited to a small number of requests per minute.  
- Use responsibly and avoid excessive calls to prevent throttling.  
- The results are **indicative**, not a 100% guarantee of safety — always stay cautious online.

---

### 💙 **Credits**
Built for safe browsing with 💙 by **Aditya Patel**

