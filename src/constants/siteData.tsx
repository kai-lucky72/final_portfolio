
import {
    SiRedux, SiReact, SiNextdotjs, SiExpress, SiLaravel,
    SiSpringboot, SiTailwindcss,
    SiPython, SiPostgresql, SiMysql, SiMongodb, SiTypescript,
    SiDocker, SiVercel, SiNetlify,
    SiRailway, SiCloudflare,
    SiGithubactions, SiGit,
    SiNestjs, SiRender,
    SiBurpsuite,
    SiKalilinux,
    SiWireshark,
    SiMetasploit,
    SiArduino,
    SiRaspberrypi,
    SiEspressif,
    SiMqtt,
    SiBluetooth,
    SiCplusplus,
    SiFramer,
    SiSvelte,
    SiBun,
    SiHono,
    SiDrizzle,
    SiRust,
    SiPrisma,
    SiCloudflareworkers,
    SiCloudflarepages
} from 'react-icons/si';

import { FaJava, FaMicrochip, FaWifi } from 'react-icons/fa';

// Navigation Links
export const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
];


// Hero Section
export const heroTypingSequence = [
    "Backend Engineer.",
    2000,
    "AI Engineer.",
    2000,
    "Technical Founder.",
    2000,
];


export const heroContent = {
    name: "Lucky",
    badge: "BACKEND & AI ENGINEER",
    badgeIcon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    subLabels: [
        {
            text: "AI Engineer",
            icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        },
        {
            text: "Technical Founder",
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        }
    ],
    description: "I build intelligent software systems that solve real-world problems. My work combines backend engineering, artificial intelligence, and product development to create scalable applications for businesses and communities.",
    meetCardText: "Discussing Backend Architecture, AI Systems & Startups.",
    ctaText: "Enquire"
};




export const heroFloatingIcons = [
    {
        id: 'security-shield',
        path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    },
    {
        id: 'security-lock',
        path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v4h8z"
    },
    {
        id: 'code',
        path: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    },
    {
        id: 'microchip',
        path: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"
    },
    {
        id: 'terminal',
        path: "M4 17l6-6-6-6M12 19h8"
    },
    {
        id: 'gear',
        path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
        id: 'server',
        path: "M3 7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 10a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"
    },
    {
        id: 'bug',
        path: "M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M8.34 15.66l-1.41 1.41m0-11.32l1.41 1.41m7.07 7.07l1.41 1.41M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"
    }
];

// Features Section - Skills
export const featuresData = [
    {
        title: "Backend Engineering",
        description: "Designing scalable APIs, authentication systems, databases, and business logic for production-ready applications.",
        icon: "M4 7v10c0 1.657 3.582 3 8 3s8-1.343-8 3-8-1.343-8-3V7m0 10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0-1.657-3.582-3-8-3s-8 1.343-8 3",
        imageSrc: "/images/arch_design.png",
        className: "md:col-span-2 min-h-[220px]",
        isHorizontal: false,
        graphType: "sparkline",
        techStack: [
            SiPython, SiTypescript, SiPostgresql, SiMongodb,
            SiDocker, SiGit, SiNestjs
        ]
    },
    {
        title: "AI Integration",
        description: "Building AI-powered features using retrieval, computer vision, and large language models for enterprise and consumer applications.",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        imageSrc: "/images/arch_design.png",
        className: "md:col-span-3 min-h-[220px]",
        isHorizontal: true,
        graphType: "uptrend",
        techStack: [
            SiPython, SiPostgresql, SiMongodb, SiTypescript,
            SiDocker
        ]
    },
    {
        title: "System Architecture",
        description: "Designing reliable software architectures with scalability, maintainability, and performance in mind.",
        icon: "M3 7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 10a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z",
        imageSrc: "/images/devops.png",
        className: "md:col-span-3 min-h-[220px]",
        isHorizontal: true,
        graphType: "pulse",
        techStack: [
            SiDocker, SiGit, SiGithubactions, SiCloudflare,
            SiRailway, SiVercel
        ]
    },
    {
        title: "Technical Consulting",
        description: "Helping startups transform ideas into technically sound and scalable products.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
        imageSrc: "/images/monitoring.png",
        className: "md:col-span-2 min-h-[220px]",
        isHorizontal: false,
        graphType: "pulse-static",
        techStack: [
            SiPython, SiTypescript, SiDocker, SiGit
        ]
    }
];


// Reviews Section (Technical Specializations / Focus)
export const testimonials = [];

export const specializationsData = [
    {
        brand: "Prime Life Insurance",
        badge: "IT Director",
        text: "Lucky contributed to the development of our Agent Management System and showed strong commitment throughout the project. He was able to understand business requirements, translate them into technical solutions, and contribute effectively to backend development using C# technologies. His professionalism, adaptability, and willingness to learn made him a valuable contributor to the team.",
        author: "Director Eric",
        image: "/images/Director Eric.png"
    },
];

export const testimonialsData = [
    {
        brand: "Calyx / Synapse / Leapable.ai",
        badge: "Founder & CTO",
        text: "Working with Lucky on AI-driven product development has been a great experience. He approaches engineering with curiosity, ownership, and a strong desire to understand problems deeply before building solutions. His ability to combine backend engineering with AI concepts has been valuable while working on Bwenge's vision for intelligent enterprise systems. Lucky is someone who learns quickly, takes initiative, and consistently looks for ways to turn ideas into practical technology.",
        author: "Christopher Royce",
        image: "/images/Christopher Royce.png",
        githubLink: ""
    },
    {
        brand: "Rwanda Coding Academy",
        badge: "Intelligent Robotics Instructor",
        text: "Lucky demonstrated strong initiative and technical curiosity while working on the Water Meter Reader computer vision project. He showed the ability to move from an idea to a working AI application by combining computer vision concepts, experimentation, and deployment. His willingness to explore challenging technical problems and learn beyond the classroom reflects the mindset of a growing engineer.",
        author: "Tr Gabriel",
        image: "/images/Tr Gabriel.png",
        githubLink: ""
    },
    {
        brand: "Prime Life Insurance",
        badge: "IT Director",
        text: "Lucky contributed to the development of our Agent Management System and showed strong commitment throughout the project. He was able to understand business requirements, translate them into technical solutions, and contribute effectively to backend development using C# technologies. His professionalism, adaptability, and willingness to learn made him a valuable contributor to the team.",
        author: "Director Eric",
        image: "/images/Director Eric.png",
        githubLink: ""
    },
    {
        brand: "Bwenge",
        badge: "Co-Founder",
        text: "Working with Lucky as a co-founder has shown me his ability to combine technical skills with product vision. He is highly driven, constantly learning, and willing to take responsibility for challenging problems. His focus on building AI-powered solutions and transforming ideas into working products has been one of the strongest contributions to our journey at Bwenge.",
        author: "Beni Samuel",
        image: "/images/beni.png",
        githubLink: ""
    },
    {
        brand: "NexaTech Rwanda",
        badge: "Co-Founder",
        text: "Building NexaTech Rwanda together has been an inspiring journey. Lucky brings strong technical leadership, creativity, and persistence when turning ideas into products. His ability to think about both engineering and the bigger impact of technology makes him a valuable teammate and builder.",
        author: "Livia",
        image: "/images/Livia.png",
        githubLink: ""
    },
    {
        brand: "Rwanda Coding Academy",
        badge: "Software Engineering Student",
        text: "Lucky has always been someone who pushes himself to learn and build beyond the normal curriculum. His passion for software engineering, AI, and entrepreneurship is clear through the projects he works on and the problems he chooses to solve.",
        author: "Mahinga Rodin",
        image: "/images/mahinga.jpg",
        githubLink: ""
    },
    {
        brand: "Rwanda Coding Academy",
        badge: "Software Engineering Student",
        text: "Lucky stands out through his dedication to technology and continuous improvement. His curiosity, willingness to collaborate, and commitment to building real projects demonstrate the mindset of someone preparing for impactful work in software engineering.",
        author: "Irere",
        image: "/images/irere.png",
        githubLink: ""
    },
    {
        brand: "Shoppa Project",
        badge: "Software Developer",
        text: "Working with Lucky on Shoppa showed his ability to take ownership of backend development and contribute to building a real product. He understands how technical decisions connect with user needs and works hard to create reliable solutions.",
        author: "Irasubiza Nelson",
        image: "/images/nelson.jpg",
        githubLink: ""
    },
    {
        brand: "Rwanda Coding Academy",
        badge: "Software Engineering Student",
        text: "Lucky is a motivated engineer who consistently explores new technologies and challenges himself through practical projects. His passion for software development and AI inspires those around him.",
        author: "Ashraf",
        image: "/images/ashraf.jpg",
        githubLink: ""
    },
];


// FAQ Section
export const faqs = [
    {
        question: 'What technologies do you specialize in?',
        answer: 'Backend development, AI integration, distributed systems, and enterprise software using Python, FastAPI, C#/.NET, TypeScript, and PostgreSQL.',
    },
    {
        question: 'Are you available for freelance work?',
        answer: 'Yes. I\'m available for freelance, internship, and full-time opportunities depending on project scope and availability.',
    },
    {
        question: 'What types of projects interest you?',
        answer: 'Backend platforms, AI-powered applications, enterprise software, automation, and developer tools.',
    },
    {
        question: 'Do you work remotely?',
        answer: 'Yes. I\'m open to both remote and on-site opportunities.',
    },
];


// Achievements Section
export const achievementsPhrases = ["security breaches", "deployment bottlenecks"];
export const achievementsWords = [
    // Backend Engineering
    { text: "system lag", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { text: "downtime", icon: "M18.364 5.636l-2.828 2.828m0 5.656l2.828 2.828M5.636 18.364l2.828-2.828m0-5.656L5.636 5.636M12 2v4m0 12v4M2 12h4m12 0h4" },
    { text: "unhandled errors", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
    { text: "slow response time", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { text: "database bottlenecks", icon: "M4 7v10c0 1.657 3.582 3 8 3s8-1.343-8 3-8-1.343-8-3V7m0 10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0 1.657-3.582 3-8 3s-8-1.343-8-3m16 0c0-1.657-3.582-3-8-3s-8 1.343-8 3" },
];

export const achievementsMetrics = [
    { value: "6+", label: "Production Products" },
    { value: "4+", label: "Years Programming" },
    { value: "3", label: "Companies Worked With" },
    { value: "2", label: "Startups Founded" }
];


export const processSteps = [
    {
        id: "discovery-design",
        title: "Problem Discovery",
        description: "Understanding the problem space, identifying requirements, and defining clear technical constraints before writing any code.",
        badgeTitle: "01",
        image: "/images/neural-network.png",
        delay: 0
    },
    {
        id: "architecture-build",
        title: "System Architecture",
        description: "Designing scalable backend systems, database schemas, API contracts, and AI integration points with maintainability in mind.",
        badgeTitle: "02",
        image: "/images/robot-working.png",
        delay: 0.1
    },
    {
        id: "testing-refinement",
        title: "Implementation & Testing",
        description: "Building the core functionality with clean code practices, validating logic through testing, and refining edge cases.",
        badgeTitle: "03",
        image: "/images/ai-hand.png",
        delay: 0.2
    },
    {
        id: "deployment",
        title: "Deployment & Scaling",
        description: "Deploying to production, monitoring performance, and iterating based on real usage patterns to ensure reliability at scale.",
        badgeTitle: "04",
        image: "/images/kigali_engineers.png",
        delay: 0.3
    }
];




export const projectData = [
    {
        name: "Argo",
        year: "2025",
        title: "AI-Powered Enterprise Assistant",
        description: "Designed and built the backend in Golang and Python, architected the REST API and gRPC services for AI integration, designed the database schema, system architecture, and deployed using Docker.",
        link: "",
        image: "",
        type: "web" as const
    },
    {
        name: "Echelon",
        year: "2025",
        title: "SaaS Analytics Platform",
        description: "Full-stack development using TypeScript for the backend and React for the frontend. Designed the REST API, system architecture, and database schema for a scalable SaaS analytics platform.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/echelon.png",
        type: "web" as const
    },
    {
        name: "Water Meter Reader",
        year: "2025",
        title: "Computer Vision AI System",
        description: "Full-stack development of an AI-powered computer vision application. Designed the REST API, system architecture, and database for automatic water meter reading extraction from images.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/watermeter.png",
        type: "web" as const
    },
    {
        name: "Shoppa",
        year: "2025",
        title: "Mobile Commerce Platform",
        description: "Backend development using Java. Designed the REST API, system architecture, database schema, and deployed the platform using Docker for a reliable e-commerce workflow.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/shoppa.png",
        type: "mobile" as const
    },
    {
        name: "Pixic",
        year: "2025",
        title: "Photography Marketplace Platform",
        description: "Backend development using NestJS. Designed the REST API, system architecture, and database schema for a marketplace connecting clients with photographers through portfolio-driven discovery.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/pixic.png",
        type: "web" as const
    },
    {
        name: "Estate",
        year: "2025",
        title: "Real Estate Management Platform",
        description: "Full-stack development using FastAPI for the backend and React for the frontend. Designed the REST API, system architecture, and database schema for property discovery and agent management.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/estate.png",
        type: "web" as const
    },
    {
        name: "Kora",
        year: "2025",
        title: "ERP Intelligence Platform",
        description: "Full-stack development using Golang and Python for the backend, React for the web frontend, and Electron for the desktop UI. Designed the REST API and gRPC services for AI integration, system architecture, database schema, and deployed using Docker.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/kora.png",
        type: "web" as const
    },
    {
        name: "Tugendane",
        year: "2025",
        title: "Ride-Hailing Platform",
        description: "Backend development using Java. Designed the REST API, system architecture, and database schema for a transportation platform connecting riders and drivers through digital services.",
        link: "",
        image: "https://pub-9470d972970443bcae6c7678040244a2.r2.dev/images/tugendane.png",
        type: "mobile" as const
    }
];


export const projectStats = [
    { value: "Products", label: "Builder" },
];


export const projectLogos = ["Python", "FastAPI", "C#", ".NET", "TypeScript", "PostgreSQL"];

export const servicesList = [
    {
        title: "Backend Development",
        icon: "M4 7v10c0 1.657 3.582 3 8 3s8-1.343-8 3-8-1.343-8-3V7m0 10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0 1.657-3.582 3-8 3s-8-1.343-8-3m16 0c0-1.657-3.582-3-8-3s-8 1.343-8 3"
    },
    {
        title: "AI Integration",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    },
    {
        title: "System Architecture",
        icon: "M3 7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 10a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"
    },
    {
        title: "Technical Consulting",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    }
];


export const servicesScrollingBanner = [
    { title: "Backend APIs", icon: "M4 7v10c0 1.657 3.582 3 8 3s8-1.343-8 3-8-1.343-8-3V7m0 10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0 1.657-3.582 3-8 3s-8-1.343-8-3m16 0c0-1.657-3.582-3-8-3s-8 1.343-8 3" },
    { title: "AI Systems", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { title: "Database Design", icon: "M4 7v10c0 1.657 3.582 3 8 3s8-1.343-8 3-8-1.343-8-3V7m0 10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0 1.657-3.582 3-8 3s-8-1.343-8-3m16 0c0-1.657-3.582-3-8-3s-8 1.343-8 3" },
    { title: "System Architecture", icon: "M3 7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 10a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" },
    { title: "Cloud Deployment", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" }
];

export const servicesWorkflowSteps = [
    {
        title: "Problem Analysis",
        icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    },
    {
        title: "System Design",
        icon: "M4 7v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7m0 10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 0c0 1.657-3.582 3-8 3s-8-1.343-8-3m16 0c0-1.657-3.582-3-8-3s-8 1.343-8 3"
    },
    {
        title: "Implementation",
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    },
    {
        title: "Deploy & Scale",
        icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    }
];

// Contact Section
export const contactInfo = {
    email: "kagabolucky72@gmail.com",
    phone: "+250 739 200 728",
    location: "Rwanda",
    calLink: "",
    contactFormLink: "#contact"
};

export const contactSubjects = [
    { value: "backend", label: "Backend Development" },
    { value: "ai", label: "AI Integration" },
    { value: "architecture", label: "System Architecture" },
    { value: "consulting", label: "Technical Consulting" },
    { value: "startup", label: "Startup Collaboration" },
];

export const socialLinks = [
    {
        name: 'LinkedIn',
        href: '#',
        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    },
    {
        name: 'GitHub',
        href: 'https://github.com/kai-lucky72',
        icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.403 22 11.983c0-5.533-4.478-10.017-10-10.017"
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/250723374650',
        icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
    }
];

export const securityPositioning = {
    paragraph: "I build intelligent software systems that solve real-world problems. My work combines backend engineering, artificial intelligence, and product development to create scalable applications for businesses and communities.",
    strategicLine: "Technology becomes meaningful when it solves problems people actually face.",
    skills: [
        "Backend Architecture",
        "AI Integration",
        "System Design"
    ]
};


export const whoWeAreContent = {
    badge: "Who I Am",
    mainQuote: {
        prefix: "I design and develop ",
        highlight1: "intelligent software systems",
        mid1: " that solve real-world problems through ",
        highlight2: "backend engineering and AI",
        mid2: ", transforming ambitious ideas into ",
        highlight3: "reliable, scalable products",
        suffix: "."
    },
    engineeringLabel: "Building Software That Creates Lasting Value"
};


export const servicesContent = {
    badge: "Services",
    title: "Engineering & AI Services",
    description: "Backend development, AI integration, and system architecture. Building scalable applications that solve real-world problems.",
    cards: [
        {
            title: "Backend Development",
            description: "Designing scalable APIs, authentication systems, databases, and business logic for production-ready applications.",
            codeSnippets: [
                `# FastAPI REST API
from fastapi import FastAPI
app = FastAPI()

@app.get("/api/projects")
async def get_projects():
    return await db.fetch_all()`,
                `# SQLAlchemy Models
class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(String, default="active")`
            ]
        },
        {
            title: "AI Integration",
            description: "Building AI-powered features using retrieval, computer vision, and large language models for enterprise and consumer applications.",
            codeSnippets: [
                `# Computer Vision - Meter Reading
import cv2
model = load_model("meter_reader.h5")
image = cv2.imread("meter.jpg")
reading = predict_reading(model, image)`,
                `# RAG Pipeline
from langchain.vectorstores import Chroma
docs = retriever.get_relevant_docs(query)
response = llm.generate(context=docs)`
            ]
        },
        {
            title: "System Architecture",
            description: "Designing reliable software architectures with scalability, maintainability, and performance in mind.",
            codeSnippets: [
                `# Docker Compose
services:
  api:
    build: ./api
    ports: ["8000:8000"]
  db:
    image: postgres:15
    volumes: ["pgdata:/var/lib/postgresql/data"]`,
                `# GitHub Actions CI/CD
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3`
            ]
        },
        {
            title: "Technical Consulting",
            description: "Helping startups transform ideas into technically sound and scalable products."
        }

    ],
    ctaText: "View My Projects"
};


export const featuresContent = {
    badge: "Engineering Focus",
    title: "Deep Stack Technical Expertise",
    description: "Backend engineering, AI integration, and system architecture used to build robust, scalable, and production-ready solutions.",
    skillsTitle: "Technical Specializations",
    ctaText: "Building intelligent systems that solve real problems",
    buttonText: "Let's Build"
};

export const workflowContent = {
    badge: "Workflow",
    title: "Engineering Workflow",
    description: "Building resilient systems from system design to cloud hosting.",
    ctaText: "From system architecture to cloud execution.",
    buttonText: "Let’s Make It Real"
};

export const projectsContent = {
    badge: "Projects",
    title: "My Latest Projects",
    description: "A showcase of AI-powered applications, backend platforms, and enterprise software built to solve real-world problems.",
    ctaText: "Creating intelligent systems that deliver measurable value.",
    buttonText: "Work With Me",
    stats: [
        { value: "6+", label: "Production Products" },
        { value: "4+", label: "Years Exp" }
    ]
};

export const achievementsContent = {
    badge: "Achievements",
    mainQuote: {
        prefix: "I've built ",
        highlight1: "6+ production products",
        mid1: " across ",
        highlight2: "3 companies",
        mid2: " and founded ",
        highlight3: "2 technology startups",
        suffix: "."
    }
};

export const reviewsContent = {
    badge: "Testimonials",
    title: "What People Say",
    description: "Feedback from leaders and collaborators who have worked with me on AI-powered systems, backend platforms, and startup products.",
    buttonText: "Let's Collaborate"
};

export const faqContent = {
    badge: "FAQS",
    title: "Your Questions Answered",
    description: "Find answers about my technical expertise, availability, and the types of projects I work on.",
    ctaButtonText: "More Questions",
    contactText: "Feel free to reach out for any enquiries - ",
    email: "kagabolucky72@gmail.com"
};

export const contactContent = {
    badge: "Contact",
    title: "Let's Build Something",
    description: "Currently open to Internship, Graduate Software Engineer, Backend Engineer, and AI Engineer opportunities. Let's connect.",
    buttonText: "Let's Connect",
    form: {
        namePlaceholder: "Your Name",
        emailPlaceholder: "Email Address",
        subjectPlaceholder: "Subject (e.g: Backend Development)",
        messagePlaceholder: "Tell me about your project...",
        submitButtonText: "Send Request"
    }
};

export const navbarContent = {
    logoText: "KL",
    ctaButtonText: "Enquire"
};

export const footerContent = {
    name: "Lucky",
    statement: "Backend engineering, AI integration, and product development for scalable, intelligent systems.",
    ctaButtonText: "Get In Touch",
    copyright: "Kagabo Irene Lucky © 2026."
};


