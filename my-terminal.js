// Define the commands
const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
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
          this.echo(directories[dir].join("\n"));
        }
      } else if (cwd === root) {
        if (dir in directories) {
          this.echo(directories[dir].join("\n"));
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
      this.echo(directories[dir].join("\n"));
    }
  },
};

const directories = {
  education: [
    "",
    "<white>Education</white>",

    '* <a href="https://en.wikipedia.org/wiki/Punjab_Engineering_College">Punjab Engineering College</a> <yellow>"BE, Mechanical Engineering"</yellow> 2009-2013',
    '* <a href="https://en.wikipedia.org/wiki/Cornell_University">Cornell University</a> <yellow>"MEng, Systems Engineering"</yellow> 2017-2018',
    "",
  ],
  projects: [
    "",
    "<white>Projects</white>",
    [
      [
        "Instant Guru",
        "https://instantguru.vercel.app/",
        "leverages the power of LLMs and RAG to give you the opportunity to ask questions of a chatbot that knows everything about your PDF",
      ],
      [
        "Cervical Cancer Risk Prediction",
        "https://github.com/bakulcsingh/CervicalCancerBiopsyPrediction/tree/master/Final",
        "machine learning model to capture the risk of cervical cancer in women, based on behavioral risk factors",
      ],
      [
        "Cornell Carbon Neutral Initiative",
        "https://ctech.cee.cornell.edu/files/2018/02/ElectricVehicleChargingStations-xwvz4k.pdf",
        "mathematical models to plan charging site locations presented at the Cornell Sustainable Leadership Summit '17",
      ],
      [
        "Crowdfunded Startup Risk Prediction",
        "https://github.com/bakulcsingh/CrowdfundingStartupRiskPrediction",
        "machine learning model to predict the risk of a crowdfunded startup failing",
      ],
    ].map(([name, url, description = ""]) => {
      return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
    }),
    "",
  ].flat(),
  skills: [
    "",
    "<white>Languages</white>",

    ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"].map(
      (lang) => `* <yellow>${lang}</yellow>`
    ),
    "",
    "<white>Libraries</white>",
    ["React.js", "Jest"].map((lib) => `* <green>${lib}</green>`),
    "",
    "<white>Tools</white>",
    ["BluePrism", "git", "UiPath"].map((lib) => `* <blue>${lib}</blue>`),
    "",
  ].flat(),
};

const dirs = Object.keys(directories);

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
const user = "guest";
const server = "bakulPortfolio";

function prompt() {
  return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

const root = "~";
let cwd = root;

$.terminal.xml_formatter.tags.green = (attrs) => {
  return `[[;#44D544;]`;
};

$.terminal.xml_formatter.tags.blue = (attrs) => {
  return `[[;#55F;;${attrs.class}]`;
};

// Define terminal configuration
const term = $("body").terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
  completion: true,
  prompt,
});

// Initialize the terminal
term.on("click", ".command", function () {
  const command = $(this).text();
  term.exec(command);
});

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

// Define the font style and color of the welcome message
const font = "ANSI Shadow";
function render(text) {
  const cols = term.cols();
  return trim(
    figlet.textSync(text, {
      font: font,
      width: cols,
      whitespaceBreak: true,
    })
  );
}

function hex(color) {
  return (
    "#" +
    [color.red, color.green, color.blue]
      .map((n) => {
        return n.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

function rainbow(string) {
  return lolcat
    .rainbow(function (char, color) {
      char = $.terminal.escape_brackets(char);
      return `[[;${hex(color)};]${char}]`;
    }, string)
    .join("\n");
}

// function that is called once fonts are ready
function ready() {
  term
    .echo(() => rainbow(render("Bakulesh Singh")), { ansi: true })
    .echo("<white>Welcome to my Portfolio in the Terminal.</white>")
    .echo("<white>Always a good idea to try help\n</white>")
    .resume();
}

// Load the fonts and call ready function
figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);

// Regex to return 2 capture groups: command and arguments
const valid_command_re = new RegExp(`^\s*(${command_list.join("|")}) (.*)`);

$.terminal.new_formatter(function (string) {
  return string.replace(valid_command_re, function (_, command, args) {
    return `<green>${command}</green><white>${args}</white>`;
  });
});
