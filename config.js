const portfolioConfig = {
  user: "guest",
  server: "bakulPortfolio",
  email: "bakulsingh@example.com",
  social: {
    linkedin: "https://linkedin.com/in/bakulsingh",
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
        company: "JP Morgan Chase Bank",
        title: "Senior Software Engineer",
        period: "2023-Present",
        url: "https://www.jpmorganchase.com/",
        description:
          "developing a web application to super power the sales team's operations and bespoke solutions to transfer accounts from FRB to JPMC",
      },
      // Add more experiences here
    ],
  },
};
