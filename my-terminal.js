const commands = {};

const term = $("body").terminal(commands, {
  greetings: false,
});

function render(text) {
  const cols = term.cols();
  return figlet.textSync(text, {
    font: font,
    width: cols,
    whitespaceBreak: true,
  });
}

function ready() {
  term.echo(render("Fingers Crossed"));
}
const font = "Slant";

figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);
