const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
  },
  echo(...args) {
    term.echo(args.join(" "));
  },
};
const font = "ANSI Shadow";

const term = $("body").terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
});

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const command_list = ["clear"].concat(Object.keys(commands));
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(formatted_list);

function trim(str) {
  return str.replace(/[\n\s]+$/, "");
}

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

function ready() {
  term
    .echo(() => rainbow(render("Bakulesh Singh")), { ansi: true })
    .echo("<white>Welcome to my Portfolio in the Terminal.</white>")
    .echo("<blue>Always a good idea to try help\n</blue>")
    .resume();
}

figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);
