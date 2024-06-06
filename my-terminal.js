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

function ready() {
  term
    .echo(
      () => {
        const ascii = render("Bakulesh Singh");
        return `${ascii}\nWelcome to my Portfolio!`;
      },
      { ansi: true }
    )
    .resume();
}

figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);
