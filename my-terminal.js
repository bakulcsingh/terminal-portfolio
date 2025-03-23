const root = "~";
let cwd = root;

// Use configuration from config.js
const { user, server, email, social, directories } = portfolioConfig;

const commands = {
  help() {
    term.echo("Available commands:\n");
    const commandHelp = {
      help: "Show this help message",
      ls: "List directory contents",
      cd: "Change directory",
      echo: "Print text to terminal",
      clear: "Clear terminal screen",
      contact: "Display contact information",
    };
    for (const [cmd, desc] of Object.entries(commandHelp)) {
      term.echo(`${cmd.padEnd(10)} - ${desc}`);
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
        `<yellow>LinkedIn:</yellow> <a href="${social.linkedin}">linkedin.com/in/bakulsingh</a>`,
        `<yellow>GitHub:</yellow> <a href="${social.github}">github.com/bakulcsingh</a>`,
        "",
      ].join("\n")
    );
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
  term.echo(
    dirs
      .map((dir) => {
        return `<blue class="directory">${dir}</blue>`;
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

// Remove the existing terminal initialization and move it inside ready()
let term;

// Replace everything from const font declaration to initializeTerminal() with:
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
    term = $("body").terminal(commands, {
      greetings: false,
      checkArity: false,
      exit: false,
      completion: true,
      prompt,
    });

    // Display ASCII art with color
    term.echo(`[[;#44D544;]${asciiArt}]`)
        .echo("<white>Welcome to my Portfolio in the Terminal.</white>")
        .echo("<white>Type 'help' to see available commands.</white>")
        .echo("<white>Type 'contact' to see my contact information.\n</white>")
  } catch (error) {
    console.error("Terminal initialization error:", error);
    document.body.innerHTML = "Error loading terminal. Please refresh the page.";
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
