/* ✴︎ node-0 + gorf : skip2theingredients mainframe ✴︎ */

window.addEventListener("DOMContentLoaded", () => {
  // --- device adaptive tuning ---
  let isMobile = window.matchMedia("(max-width: 700px)").matches;

  const TYPE_SPEED = isMobile ? 15 : 30;
  const LINE_SPACING = isMobile ? 1.3 : 1.6;

  const terminal = document.getElementById("terminal");
  const input = document.getElementById("input");
  const specials = document.getElementById("specials");

  // --- rotating specials ---
  const specialsList = [
    "asado negro",
    "salmorejo with quinoa and pork crackling",
    "green gazpacho with cherimoya and mint",
    "andalusian spiced roast pork",
    "poor man's potatoes with huancaína sauce and ripe plantain",
    "cuban coffee flan"
  ];
  let currentSpecial = 0;

  function rotateSpecials() {
    specials.innerHTML = `<span class="special-link">special of the day → ${specialsList[currentSpecial]}</span>`;
    const link = specials.querySelector(".special-link");
    link.addEventListener("click", () => showRecipe(specialsList[currentSpecial]));
    currentSpecial = (currentSpecial + 1) % specialsList.length;
  }
  rotateSpecials();
  setInterval(rotateSpecials, 8000);

  // --- typewriter effect ---
  function typeOut(text, speed = TYPE_SPEED, color = null, callback = null) {
    let i = 0;
    const span = document.createElement("span");
    if (color) span.style.color = color;
    terminal.appendChild(span);

    const interval = setInterval(() => {
      span.textContent += text.charAt(i);
      i++;
      terminal.scrollTop = terminal.scrollHeight;
      if (i >= text.length) {
        clearInterval(interval);
        span.textContent += "\n";
        if (callback) callback();
      }
    }, speed);
  }

  function printLine(line, color = null) {
    const span = document.createElement("span");
    if (color) span.style.color = color;
    span.textContent = line + "\n";
    terminal.appendChild(span);
    terminal.scrollTop = terminal.scrollHeight;
  }

  // --- input handler ---
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()) {
      const cmd = input.value.trim();
      printLine("> " + cmd);
      input.value = "";
      handleCommand(cmd);
    }
  });

  // --- jokes ---
  const jokes = [
    "ain’t no instructions, bih.",
    "the yolk remembers what you forgot.",
    "cook like it’s prophecy.",
    "no story, no ads, just flavor.",
    "everything returns to butter.",
    "the pan knows your sins.",
    "system error: too much garlic detected.",
    "taste achieved. continue.",
    "egg watching. always.",
    "your grandma approves this transmission."
  ];
  let currentJoke = 0;

  // --- multilingual “qué quieres” system ---
  const queQuieres = [
    { text: "¿qué quieres?", color: "#ff4040" },
    { text: "que quieres, panita?", color: "#ff4040" },
    { text: "what do you want?", color: "#ffffff" },
    { text: "hungry, are we?", color: "#ffffff" },
    { text: "मुझे बताओ, तुम क्या चाहते हो?", color: "#00ffff" },
    { text: "너 뭐 원해?", color: "#00ffff" },
    { text: "ምን ትፈልጋለህ?", color: "#00ff66" },
    { text: "the mainframe asks: qué quieres?", color: "#ffffff" }
  ];

  function randomQueQuieres() {
    const pick = queQuieres[Math.floor(Math.random() * queQuieres.length)];
    typeOut(`system prompt: ${pick.text}\n\n`, TYPE_SPEED, pick.color);
  }

  // --- command handler ---
  function handleCommand(cmd) {
    const l = cmd.toLowerCase();

    if (l === "help") {
      typeOut("commands: list, show <recipe>, pantry: <ingredients>, clear, help\n");
      return;
    }

    if (l === "clear") {
      terminal.textContent = "";
      return;
    }

    // pantry lookup
    if (l.startsWith("pantry:")) {
      const items = l.replace("pantry:", "").split(",").map(x => x.trim());
      fetch("https://skip2theingredients.onrender.com/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: items })
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) printLine(data.message);
          else if (!data.length) printLine("No match found — maybe order takeout?");
          else {
            printLine("Pantry scan complete:");
            data.slice(0, 5).forEach(r => printLine(`- ${r.recipe} (${r.match}% match)`));
          }
        })
        .catch(() => printLine("Error: could not reach backend."));
      return;
    }

    // recipe display
    if (l.startsWith("show ")) {
      const name = l.replace("show ", "");
      showRecipe(name);
      return;
    }

    // list all recipes
    if (l === "list") {
      fetch("https://skip2theingredients.onrender.com/recipes")
        .then(res => res.json())
        .then(data => {
          for (let [cat, items] of Object.entries(data)) {
            if (typeof items === "object")
              printLine(`${cat}: ${Object.keys(items).join(", ")}`);
          }
        })
        .catch(() => printLine("Error connecting to backend."));
      return;
    }

    printLine(`Unknown command: ${cmd}`);
  }

  // --- show recipe (with joke prelude) ---
  function showRecipe(name) {
    const joke = "// " + jokes[currentJoke] + "\n";
    currentJoke = (currentJoke + 1) % jokes.length;

    typeOut(joke, 25, "#00ff66", () => {
      fetch(`https://skip2theingredients.onrender.com/recipes/${name}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            printLine("Recipe not found.");
          } else {
            const recipeData = Object.values(data)[0];
            printLine("┌──────────────────────────────┐");
            printLine(`│ recipe: ${name}`);
            printLine("│ ingredients:");
            recipeData.forEach(i => printLine(`│ - ${i}`));
            printLine("└──────────────────────────────┘");
          }
        })
        .catch(() => printLine("Error connecting to backend."));
    });
  }

  // --- intro ---
  typeOut("System online.\n", TYPE_SPEED, null, () => {
    randomQueQuieres();
    typeOut("Type 'help' to see available commands.\n");
  });
});
