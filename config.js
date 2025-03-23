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
        url: "https://instantguru.vercel.app/",
        description:
          "leverages the power of LLMs and RAG to give you the opportunity to ask questions of a chatbot that knows everything about your PDF",
      },
      // Add more projects here
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
          "building AI-driven fintech solutions using Next.js, NestJS, React, and Redux with ML model integration via AWS",
      },
      {
        company: "JP Morgan Chase Bank",
        title: "Software Engineer",
        period: "2023-2024",
        url: "https://www.jpmorganchase.com/",
        description:
          "developed React/Redux-powered sales support tools with RESTful API integration and reusable component architecture",
      },
      {
        company: "First Republic Bank",
        title: "Senior Software Engineer, Continuous Process Improvement",
        period: "2018-2023",
        url: "https://www.firstrepublic.com/",
        description:
          "served as the technology agnostic developer of solutions empowering colleagues to improve processes and operational efficiency",
      },
      // Add more experiences here
    ],
  },
};
