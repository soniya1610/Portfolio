export const profile = {
  name: 'Soniya Meena',
  title: 'Computer Science & Engineering undergraduate',
  email: 'meenasonia243@gmail.com',
  location: 'New Delhi, India',
  github: 'https://github.com/soniya1610',
  linkedin: 'https://www.linkedin.com/in/soniya-meena-3bb25b395/',
  leetcode: 'https://leetcode.com/u/soniya_meena/',
}

export const stats = [
  { value: '8', suffix: '/10', label: 'CGPA' },
  { value: '500', suffix: '+', label: 'DSA problems solved' },
  { value: '20', suffix: '+', label: 'Merged open-source PRs' },
  { value: '05', suffix: '', label: 'Featured projects' },
]

export const experience = [
  {
    company: 'QuantekSolutions',
    role: 'Software Developer Intern — Mobile App & Blockchain',
    dates: '2026 — Present',
    type: 'Internship',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Solidity', 'Ethereum'],
    points: [
      'Developing cross-platform mobile applications with React Native and Expo.',
      'Implementing Firebase authentication, navigation, and audio integration.',
      'Building blockchain applications and smart-contract integrations for Ethereum Sepolia.',
    ],
  },
  {
    company: 'GirlScript Summer of Code',
    role: 'Open Source Contributor',
    dates: 'Apr — Sep 2026',
    type: 'Open source',
    technologies: ['Git', 'GitHub', 'JavaScript', 'React'],
    points: [
      'Contributed 4+ merged pull requests to open-source projects.',
      'Fixed frontend bugs and refined user-interface interactions.',
      'Collaborated with maintainers through issues, pull requests, and code reviews.',
    ],
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    skills: ['Java', 'JavaScript', 'SQL', 'Python', 'C++', 'C' , 'TypeScript'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA', 'Spring AI' , 'Servlet', 'Hibernate', 'REST APIs', 'JWT', 'OAuth2', 'BCrypt'],
  },
  {
    title: 'Frontend & mobile',
    skills: ['React.js', 'React Native', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Thymeleaf'],
  },
  {
    title: 'Blockchain',
    skills: ['Solidity', 'Ethereum', 'Hardhat', 'Foundry', 'Wagmi', 'Viem', 'MetaMask'],
  },
  {
    title: 'Tools & platforms',
    skills: ['Git', 'GitHub', 'Maven', 'Postman', 'Linux', 'IntelliJ IDEA', 'VS Code', 'Firebase'],
  },
  {
    title: 'Testing',
    skills:['JUnit'],
  },
]

export const projects = [
  {
    name: 'AI Logistics',
    category: 'Full-stack · AI',
    description:
      'A role-based shipment management platform that brings booking, tracking, and driver workflows together.',
    details:
      'The project is split into Spring Boot frontend and backend applications. Its documented features include customer, driver, and admin workflows, Google OAuth2, MySQL persistence, REST APIs, and an AI-assisted vehicle recommendation flow using Spring AI and Groq.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Spring AI', 'MySQL'],
    url: 'https://github.com/soniya1610/AI-Logistics',
    mark: '01',
    accent: 'plum',
  },

  {
    name: 'LokNigrani',
    category: 'Frontend · Civic tech',
    description:
      'A public infrastructure quality dashboard for comparing project plans with geo-tagged ground evidence.',
    details:
      'The repository contains a React UI prototype backed by local mock data. Its documented modules include project and evidence views, map-based exploration, potential-anomaly indicators, human verification workflows, analytics, and audit history. The project README describes a separate backend as planned work.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'React-Leaflet'],
    url: 'https://github.com/soniya1610/LokNigrani',
    demo: 'https://lok-nigrani-xi.vercel.app/',
    mark: '02',
    accent: 'blue',
  },
  {
    name: 'AgentCart',
    category: 'Backend · Commerce',
    description:
      'An AI-ready commerce platform exploring bounded, explainable, and auditable shopping workflows.',
    details:
      'AgentCart brings product discovery, negotiation, cart and order management, role-based access, transaction approvals, and Razorpay test-mode payments into one commerce platform. Its README describes JWT-based authentication and spending-limit-aware agent workflows as part of the platform direction.',
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Razorpay'],
    url: 'https://github.com/soniya1610/AgentCart',
    mark: '03',
    accent: 'green',
  },
  {
    name: 'TipJar',
    category: 'Web3 · Blockchain',
    description:
      'A decentralized tipping and ERC-20 token platform allowing users to send ETH tips with on-chain messages.',
    details:
      'Features a Solidity smart contract for receiving ETH tips with memo messages and an OpenZeppelin-based QuantekToken (QTK) ERC-20 token, deployed and verified on Ethereum Sepolia testnet. Includes a Next.js dApp frontend with RainbowKit, Wagmi, and Viem for seamless wallet interactions.',
    stack: ['Solidity', 'Hardhat', 'Ethereum', 'Next.js', 'Wagmi', 'Viem'],
    url: 'https://github.com/QuantekSolutions/soniya-intern-app/tree/main/tipjar',
    demo: 'https://sepolia.etherscan.io/address/0x6252d560A25F0ED120932932476C7216aBe757Ae#code',
    mark: '04',
    accent: 'blue',
  },
  {
    name: 'Dhunn',
    category: 'Mobile · React Native',
    description:
      'A cross-platform music streaming and player mobile application built with React Native and Expo Go.',
    details:
      'Built with Expo SDK 58, Expo Router, and TypeScript. Dhunn integrates the Audius API for music discovery and streaming, Expo Audio for full playback control, Firebase Authentication for user accounts, and local persistence for liked songs and playlists, with an APK preview build generated via EAS Build.',
    stack: ['React Native', 'Expo Go', 'TypeScript', 'Firebase', 'Expo Router', 'Audius API'],
    url: 'https://github.com/soniya1610/dhunn',
    demo: 'https://expo.dev/artifacts/eas/0g_AiSl2i6oBMnEJ6NgbSHPptTmeQ6Ij_Av_fEVKLs8.apk',
    mark: '05',
    accent: 'plum',
  },
]

export const education = [
  {
    institution: 'Bhagat Phool Singh Mahila Vishwavidyalaya',
    degree: 'B.Tech — Computer Science and Engineering',
    dates: 'July 2024 — Expected 2028',
    result: '8.0 / 10 CGPA',
  },
  {
    institution: 'Madhya Pradesh Board of Secondary Education',
    degree: 'Class XII',
    dates: '',
    result: '90%',
  },
]

export const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Computer Architecture',
  'Generative AI',
  'Machine Learning',
]

export const credentials = [
  { name: 'Spring Boot Training', issuer: 'Incapp', year: '2026', type: 'Certification' },
  { name: 'Diploma of Proficiency in German', issuer: 'BPSMV', year: '2026', type: 'Certification' },
  { name: 'GirlScript Summer of Code', issuer: 'Open-source contributor', year: '2026', type: 'Program' },
]
