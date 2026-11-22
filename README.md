# Soniya Meena — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-portfolio--soniya.vercel.app-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-soniya.vercel.app/)

> 🌐 **Live Portfolio:** [https://portfolio-soniya.vercel.app/](https://portfolio-soniya.vercel.app/)

A modern, responsive developer portfolio showcasing full-stack engineering, mobile development, Web3/blockchain applications, and open-source contributions. Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **6 Featured Projects**: Detailed showcase spanning Full-Stack AI, Civic Tech, AI Commerce, Web3/Blockchain, Cross-Platform Mobile, and Multi-Agent AI applications.
- **Custom CSS Artworks**: Handcrafted, interactive UI mockups for each project (Logistics tracking board, Civic geo-map, Agent workflow orbits, Ethereum dApp tip board, and an Expo audio music player).
- **Live GitHub Activity Integration**: Fetches real-time public repositories and profile stats directly from the GitHub REST API with language filtering, star sorting, and pagination.
- **Theme Switching**: Dark and light mode toggle with smooth CSS transitions and local storage persistence.
- **Fluid Animations**: Staggered scroll animations and micro-interactions powered by Framer Motion.
- **Accessible Project Dialogs**: Keyboard accessible (`Esc`, `Tab` focus trap) project modal dialogs with links to source code and live demos / APK builds.
- **Interactive Contact Form**: Integrated with EmailJS for direct messaging, with a graceful mailto fallback.

---

## 🛠️ Featured Projects

| # | Project | Category | Tech Stack | Highlights |
|---|---------|----------|------------|------------|
| **01** | [**AI Logistics**](https://github.com/soniya1610/AI-Logistics) | Full-stack · AI | Java, Spring Boot, Spring Security, Spring AI, MySQL | Role-based shipment management, driver workflows, Google OAuth2, and Groq-assisted vehicle recommendations. |
| **02** | [**LokNigrani**](https://github.com/soniya1610/LokNigrani) | Frontend · Civic tech | React, Vite, Tailwind CSS, Recharts, React-Leaflet | Public infrastructure dashboard comparing project plans with geo-tagged ground evidence and anomaly indicators. |
| **03** | [**AgentCart**](https://github.com/soniya1610/AgentCart) | Backend · Commerce | Java 17, Spring Boot, Spring Security, JWT, MySQL, Razorpay | AI-ready commerce platform exploring bounded, explainable shopping workflows, approvals, and Razorpay payments. |
| **04** | [**TipJar**](https://github.com/QuantekSolutions/soniya-intern-app/tree/main/tipjar) | Web3 · Blockchain | Solidity, Hardhat, Ethereum Sepolia, Next.js, Wagmi, Viem | Decentralized tipping dApp with memo messages and OpenZeppelin ERC-20 QuantekToken (QTK), verified on Sepolia Etherscan. |
| **05** | [**Dhunn**](https://github.com/soniya1610/dhunn) | Mobile · React Native | React Native, Expo Go, TypeScript, Firebase, Expo Router, Audius API | Modern cross-platform music streaming & player app with Audius API integration, Expo Audio controls, and EAS Build APK. |
| **06** | [**CareerIQ AI**](https://github.com/soniya1610/Syntax-Error) | Full-stack · Multi-Agent AI | React, Node.js, Express, MongoDB, Gemini AI, Tailwind CSS | Multi-agent employment platform with skill gap analysis, ATS resume scoring, mock interviews, and 90-day roadmaps. |

---

## 💻 Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties (Dark / Light themes)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Services & APIs**: GitHub REST API, EmailJS
- **Mobile & Web3 Ecosystem**: React Native, Expo (SDK 58), Solidity, Hardhat, Wagmi, Viem

---

## 🚀 Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Run Locally

```bash
# Clone the repository
git clone https://github.com/soniya1610/portfolio.git
cd portfolio/Soniya-Resume

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open the local development URL printed in your terminal (usually `http://localhost:5173`).

---

## 📦 Production Build

```bash
# Run TypeScript type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

The production output is built into the `dist/` directory, optimized for static hosting.

---

## ⚙️ Configuration

### 1. Contact Form (EmailJS)

The contact form is configured to send emails directly using EmailJS when credentials are provided:

1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Create an Email Service and Template with variables: `name`, `email`, `subject`, and `message`.
3. Create `.env.local` based on `.env.example`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Restart the Vite development server.

> **Note:** If environment variables are omitted, the form automatically falls back to opening the visitor's default email client with a pre-filled draft.

### 2. Resume PDF

Place your resume PDF at `public/resume.pdf`. The download button checks whether the file exists:
- If present, it downloads the PDF file.
- If absent, it provides user feedback that the PDF is being updated.

### 3. GitHub Section

The GitHub activity component uses the unauthenticated GitHub REST API to fetch public repositories for `soniya1610`. It features:
- Filter by programming language
- Sort by stars or recent updates
- Fork and stargazer counts
- Fallback loading skeletons and error handling

---

## 🌐 Deployment

You can deploy the contents of `dist/` to any static web hosting platform:

- **Vercel**: Import the repository and set the root directory to `Soniya-Resume` (Framework Preset: Vite).
- **Netlify**: Connect your repository with build command `npm run build` and publish directory `dist`.
- **GitHub Pages**: Deploy static assets from `dist/` via GitHub Actions.

Make sure to add your `VITE_EMAILJS_*` environment variables in your hosting provider's dashboard settings.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
