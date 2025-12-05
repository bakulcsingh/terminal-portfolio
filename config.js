const portfolioConfig = {
  user: "guest",
  server: "bakulPortfolio",
  email: "bakulsingh@example.com",
  social: {
    linkedin: "https://www.linkedin.com/in/bakuleshsingh/",
    github: "https://github.com/bakulcsingh",
  },
  directories: {
    education: [
      {
        institution: "Punjab Engineering College",
        degree: "BE, Mechanical Engineering",
        period: "2009-2013",
        url: "https://en.wikipedia.org/wiki/Punjab_Engineering_College",
      },
      {
        institution: "Cornell University",
        degree: "MEng, Systems Engineering",
        period: "2017-2018",
        url: "https://en.wikipedia.org/wiki/Cornell_University",
      },
    ],
    projects: [
      {
        name: "Instant Guru",
        url: "https://github.com/bakulcsingh/instantguru",
        description:
          "leverages the power of LLMs and RAG to give you the opportunity to ask questions of a chatbot that knows everything about your PDF",
      },
       {
        name: "Expense Tracker",
        url: "https://github.com/bakulcsingh/expense-tracker.git",
        description:
          "comprehensive financial management tool that empowers you to track expenses, set budgets, and visualize your spending patterns through an elegant Django-powered interface.",
      },
    ],
    skills: {
      languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
      libraries: ["React.js", "Jest"],
      tools: ["BluePrism", "git", "UiPath"],
    },
    experience: [
      {
        company: "Off Ramp Hub",
        title: "Full Stack Engineer",
        period: "2024-Present",
        url: "https://offramphub.com",
        description:
          "Core engineer for a “Bank OS” platform consolidating client lifecycle management, account opening (deposit & loan), and service operations for banks and credit unions.",
      },
      {
        company: "First Republic Bank / JPMorgan Chase",
        title: "Software Engineer",
        period: "2018-2024",
        url: "https://www.jpmorganchase.com/",
        description:
          "Delivered cross-functional automation and process improvement projects in a regulated banking environment, directly impacting compliance, client onboarding, and operational efficiency.",
      }
      // Add more experiences here
    ],
  },
};
