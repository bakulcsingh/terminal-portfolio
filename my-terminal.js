const commands = {};
const font = "ANSI Shadow";

const term = $("body").terminal(commands, {
  greetings: false,
});

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
    .echo("<white>Welcome to my Terminal Portfolio\n</white>")
    .resume();
}

figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);
