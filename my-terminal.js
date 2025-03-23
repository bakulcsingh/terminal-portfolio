const root = "~";
let cwd = root;

// Use configuration from config.js
const { user, server, email, social, directories } = portfolioConfig;

const commands = {
  help() {
    term.echo("Available commands:\n");
    const commandHelp = {
      help: "Show this help message",
      about: "Learn about me",
      projects: "View my projects",
      experience: "View my work experience",
      skills: "View my technical skills",
      contact: "Display contact information",
      clear: "Clear terminal screen",
      ls: "List directory contents",
      cd: "Change directory",
    };
    for (const [cmd, desc] of Object.entries(commandHelp)) {
      term.echo(`${cmd.padEnd(12)} - ${desc}`);
    }
  },
  echo(...args) {
    if (args.length > 0) {
      term.echo(args.join(" "));
    }
  },
  cd(dir = null) {
    if (dir === null || (dir === ".." && cwd !== root)) {
      cwd = root;
    } else if (dir.startsWith("~/") && dirs.includes(dir.substring(2))) {
      cwd = dir;
    } else if (dirs.includes(dir)) {
      cwd = root + "/" + dir;
    } else {
      this.error("Wrong directory");
    }
  },
  ls(dir = null) {
    if (dir) {
      if (dir.match(/^~\/?$/)) {
        // ls ~ or ls ~/
        print_dirs();
      } else if (dir.startsWith("~/")) {
        const path = dir.substring(2);
        const dirs = path.split("/");
        if (dirs.length > 1) {
          this.error("Invalid directory");
        } else {
          const dir = dirs[0];
          if (formatDirectories[dir]) {
            this.echo(formatDirectories[dir]().join("\n"));
          } else {
            this.error("Invalid directory");
          }
        }
      } else if (cwd === root) {
        if (formatDirectories[dir]) {
          this.echo(formatDirectories[dir]().join("\n"));
        } else {
          this.error("Invalid directory");
        }
      } else if (dir === "..") {
        print_dirs();
      } else {
        this.error("Invalid directory");
      }
    } else if (cwd === root) {
      print_dirs();
    } else {
      const dir = cwd.substring(2);
      if (formatDirectories[dir]) {
        this.echo(formatDirectories[dir]().join("\n"));
      } else {
        this.error("Invalid directory");
      }
    }
  },
  contact() {
    term.echo(
      [
        "<white>Contact Information:</white>",
        "",
        `<yellow>Email:</yellow> <white>${email}</white>`,
        `<yellow>LinkedIn:</yellow> <a href="${social.linkedin}">linkedin.com/in/bakuleshsingh/</a>`,
        `<yellow>GitHub:</yellow> <a href="${social.github}">github.com/bakulcsingh</a>`,
        "",
      ].join("\n")
    );
  },
  about() {
    term.echo(
      [
        "<white>About Me</white>",
        "",
        "Hi! I'm Bakul Singh, a Full Stack Engineer passionate about building innovative solutions.",
        "I have experience in web development, AI integration, and process automation.",
        "",
        "<white>Quick Navigation:</white>",
        "• Type 'experience' to see my work history",
        "• Type 'projects' to view my projects",
        "• Type 'skills' to see my technical skills",
        "• Type 'contact' to get in touch",
        "",
      ].join("\n")
    );
  },
  projects() {
    term.echo(formatDirectories.projects().join("\n"));
  },
  experience() {
    term.echo(formatDirectories.experience().join("\n"));
  },
  skills() {
    term.echo(formatDirectories.skills().join("\n"));
  },
};

// Convert config data to terminal format
const formatDirectories = {
  education: () => [
    "",
    "<white>Education</white>",
    ...directories.education.map(
      ({ institution, degree, period, url }) =>
        `* <a href="${url}">${institution}</a> <yellow>"${degree}"</yellow> ${period}`
    ),
    "",
  ],
  projects: () => [
    "",
    "<white>Projects</white>",
    ...directories.projects.map(
      ({ name, url, description }) =>
        `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`
    ),
    "",
  ],
  skills: () => [
    "",
    "<white>Languages</white>",
    ...directories.skills.languages.map((lang) => `* <yellow>${lang}</yellow>`),
    "",
    "<white>Libraries</white>",
    ...directories.skills.libraries.map((lib) => `* <green>${lib}</green>`),
    "",
    "<white>Tools</white>",
    ...directories.skills.tools.map((tool) => `* <blue>${tool}</blue>`),
    "",
  ],
  experience: () => [
    "",
    "<white>Experience</white>",
    ...directories.experience.map(
      ({ company, title, period, url, description }) =>
        `* <a href="${url}">${company}</a> &ndash; <i>${title}</i>, ${period} &mdash; <white>${description}</white>`
    ),
    "",
  ],
};

const dirs = Object.keys(formatDirectories);

function print_dirs() {
  const dirDescriptions = {
    education: "🎓 Education History",
    projects: "💻 My Projects",
    skills: "🛠️ Technical Skills",
    experience: "💼 Work Experience",
  };

  term.echo(
    dirs
      .map((dir) => {
        return `<blue class="directory">${dirDescriptions[dir] || dir}</blue>`;
      })
      .join("\n")
  );
}

//create a custom prompt to display the user and server
function prompt() {
  return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

$.terminal.xml_formatter.tags.green = (attrs) => {
  return `[[;#44D544;]`;
};

$.terminal.xml_formatter.tags.blue = (attrs) => {
  return `[[;#55F;;${attrs.class}]`;
};

const asciiArt = `
██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗     
██╔══██╗██╔══██╗██║ ██╔╝██║   ██║██║     
██████╔╝███████║█████╔╝ ██║   ██║██║     
██╔══██╗██╔══██║██╔═██╗ ██║   ██║██║     
██████╔╝██║  ██║██║  ██╗╚██████╔╝███████╗
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

function initializeTerminal() {
  console.log("Initializing terminal...");
  try {
    // Clear existing buttons
    $("#command-buttons").empty();

    // Create command buttons
    const commonCommands = ["about", "experience", "projects", "contact"];
    commonCommands.forEach((cmd) => {
      const button = $(`<button class="cmd-btn">${cmd}</button>`);
      button.on("click", function () {
        term.exec(cmd);
      });
      $("#command-buttons").append(button);
    });

    term = $("body").terminal(commands, {
      greetings: false,
      checkArity: false,
      exit: false,
      completion: true,
      prompt,
    });

    // Display welcome message
    term
      .echo(`[[;#44D544;]${asciiArt}]`)
      .echo("<white>👋 Welcome to my Interactive Portfolio!</white>")
      .echo("<white>You can either:</white>")
      .echo("  • Click the command buttons above for quick navigation")
      .echo("  • Type commands in the terminal (try typing 'help')")
      .echo("  • Click on any blue text to explore that section")
      .echo("\n<white>Popular commands:</white>")
      .echo("  • about    - Learn about me")
      .echo("  • projects - View my projects")
      .echo("  • contact  - Get my contact information")
      .echo("");
  } catch (error) {
    console.error("Terminal initialization error:", error);
    document.body.innerHTML =
      "Error loading terminal. Please refresh the page.";
  }
}

// Replace the ready() function with a simpler version
function ready() {
  initializeTerminal();
}

// Call ready() when document is fully loaded
$(document).ready(ready);

// Add command suggestion for invalid commands
function initializeEventHandlers() {
  if (!term) return;

  term.on("command", function (command) {
    if (!commands[command.split(" ")[0]] && command !== "clear") {
      const similarCommands = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(command.split(" ")[0])
      );
      if (similarCommands.length) {
        term.echo(
          `Command not found. Did you mean: ${similarCommands.join(", ")}?`
        );
      } else {
        term.echo('Command not found. Type "help" for available commands.');
      }
    }
  });

  term.on("click", ".command", function () {
    const command = $(this).text();
    term.exec(command);
  });
}

// Call event handler initialization after ready
setTimeout(initializeEventHandlers, 100);

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const command_list = ["clear"].concat(Object.keys(commands));
const formatted_list = command_list.map((cmd) => {
  return `<yellow class="command">${cmd}</yellow>`;
});
const help = formatter.format(formatted_list);

function trim(str) {
  return str.replace(/[\n\s]+$/, "");
}
