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
};

// Define terminal configuration
const term = $("body").terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
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
    .echo("<blue>Always a good idea to try help\n</blue>")
    .resume();
}

// Load the fonts and call ready function
figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);

const valid_command_re = new RegExp(`^\s*(${command_list.join("|")})`);
$.terminal.new_formatter([valid_command_re, "<green>$1</green>"]);
