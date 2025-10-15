<<<<<<< HEAD
/* ✴︎ node-0 + gorf : skip2theingredients mainframe ✴︎ */

window.addEventListener("DOMContentLoaded", () => {
  // --- device adaptive tuning ---
let isMobile = window.matchMedia("(max-width: 700px)").matches;

// tweak typewriter speed and spacing depending on screen
const TYPE_SPEED = isMobile ? 15 : 30;
const LINE_SPACING = isMobile ? 1.3 : 1.6;

// smooth scroll to bottom helper
function smoothScroll(element) {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: isMobile ? "smooth" : "auto"
  });
}

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
  function typeOut(text, speed = 30, color = null, callback = null) {
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
    // latin / romance
    { text: "¿qué quieres?", color: "#ff4040" },
    { text: "que quieres, panita?", color: "#ff4040" },
    { text: "o que você quer?", color: "#ff4040" },
    { text: "qu'est-ce que tu veux?", color: "#ff4040" },
    { text: "che vuoi?", color: "#ff4040" },
    { text: "ce vrei?", color: "#ff4040" },

    // english / germanic
    { text: "what do you want?", color: "#ffffff" },
    { text: "was willst du?", color: "#ffffff" },
    { text: "wat wil je?", color: "#ffffff" },
    { text: "hvad vil du?", color: "#ffffff" },
    { text: "vad vill du?", color: "#ffffff" },
    { text: "hva vil du?", color: "#ffffff" },
    { text: "wot d’ya fancy?", color: "#ffffff" },

    // slavic / eastern europe
    { text: "что ты хочешь?", color: "#b0b0ff" },
    { text: "co chcesz?", color: "#b0b0ff" },
    { text: "што сакаш?", color: "#b0b0ff" },
    { text: "шта хоћеш?", color: "#b0b0ff" },
    { text: "що ти треба?", color: "#b0b0ff" },
    { text: "čeho chceš?", color: "#b0b0ff" },

    // hellenic / middle east
    { text: "τι θέλεις;", color: "#ffcc66" },
    { text: "ماذا تريد؟", color: "#ffcc66" },
    { text: "چی می‌خوای؟", color: "#ffcc66" },
    { text: "מה אתה רוצה?", color: "#ffcc66" },

    // africa
    { text: "ምን ትፈልጋለህ?", color: "#00ff66" },
    { text: "o le batla eng?", color: "#00ff66" },
    { text: "nini unataka?", color: "#00ff66" },
    { text: "kí ni fẹ́?", color: "#00ff66" },
    { text: "ubufuna ntoni?", color: "#00ff66" },
    { text: "ungathanda ini?", color: "#00ff66" },

    // asia / pacific
    { text: "何が欲しい？", color: "#00ffff" },
    { text: "你想要什么？", color: "#00ffff" },
    { text: "nǐ xiǎng yào shénme?", color: "#00ffff" },
    { text: "क्या चाहते हो?", color: "#00ffff" },
    { text: "তুমি কি চাও?", color: "#00ffff" },
    { text: "คุณต้องการอะไร?", color: "#00ffff" },
    { text: "너 뭐 원해?", color: "#00ffff" },
    { text: "apa yang kamu mau?", color: "#00ffff" },
    { text: "നിനക്ക് എന്ത് വേണം?", color: "#00ffff" },

    // indigenous / island
    { text: "tlen ticnequi?", color: "#ff66ff" },
    { text: "ani piya?", color: "#ff66ff" },
    { text: "manaoana ianao?", color: "#ff66ff" },
    { text: "fa’apefea ou te mana’o?", color: "#ff66ff" },
    { text: "he aha tō hiahia?", color: "#ff66ff" },

    // misc / fun
    { text: "what’s your craving, traveler?", color: "#ffffff" },
    { text: "hungry, are we?", color: "#ffffff" },
    { text: "the mainframe asks: qué quieres?", color: "#ffffff" }
  ];

  function randomQueQuieres() {
    const pick = queQuieres[Math.floor(Math.random() * queQuieres.length)];
    typeOut(`system prompt: ${pick.text}\n\n`, 30, pick.color);
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

    if (l.startsWith("pantry:")) {
      const items = l.replace("pantry:", "").split(",").map(x => x.trim());
      fetch("http://127.0.0.1:5000/pantry", {
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

    if (l.startsWith("show ")) {
      const name = l.replace("show ", "");
      showRecipe(name);
      return;
    }

    if (l === "list") {
      fetch("http://127.0.0.1:5000/recipes")
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

  // --- show recipe (joke first) ---
  function showRecipe(name) {
    const joke = "// " + jokes[currentJoke] + "\n";
    currentJoke = (currentJoke + 1) % jokes.length;

    typeOut(joke, 25, "#00ff66", () => {
      fetch(`http://127.0.0.1:5000/recipes/${name}`)
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
  typeOut("System online.\n", 30, null, () => {
    randomQueQuieres();
    typeOut("Type 'help' to see available commands.\n");
  });
});
=======
/* ✴︎ node-0 + gorf : skip2theingredients mainframe ✴︎ */

window.addEventListener("DOMContentLoaded", () => {
  // --- device adaptive tuning ---
let isMobile = window.matchMedia("(max-width: 700px)").matches;

// tweak typewriter speed and spacing depending on screen
const TYPE_SPEED = isMobile ? 15 : 30;
const LINE_SPACING = isMobile ? 1.3 : 1.6;

// smooth scroll to bottom helper
function smoothScroll(element) {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: isMobile ? "smooth" : "auto"
  });
}

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
  function typeOut(text, speed = 30, color = null, callback = null) {
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
    // latin / romance
    { text: "¿qué quieres?", color: "#ff4040" },
    { text: "que quieres, panita?", color: "#ff4040" },
    { text: "o que você quer?", color: "#ff4040" },
    { text: "qu'est-ce que tu veux?", color: "#ff4040" },
    { text: "che vuoi?", color: "#ff4040" },
    { text: "ce vrei?", color: "#ff4040" },

    // english / germanic
    { text: "what do you want?", color: "#ffffff" },
    { text: "was willst du?", color: "#ffffff" },
    { text: "wat wil je?", color: "#ffffff" },
    { text: "hvad vil du?", color: "#ffffff" },
    { text: "vad vill du?", color: "#ffffff" },
    { text: "hva vil du?", color: "#ffffff" },
    { text: "wot d’ya fancy?", color: "#ffffff" },

    // slavic / eastern europe
    { text: "что ты хочешь?", color: "#b0b0ff" },
    { text: "co chcesz?", color: "#b0b0ff" },
    { text: "што сакаш?", color: "#b0b0ff" },
    { text: "шта хоћеш?", color: "#b0b0ff" },
    { text: "що ти треба?", color: "#b0b0ff" },
    { text: "čeho chceš?", color: "#b0b0ff" },

    // hellenic / middle east
    { text: "τι θέλεις;", color: "#ffcc66" },
    { text: "ماذا تريد؟", color: "#ffcc66" },
    { text: "چی می‌خوای؟", color: "#ffcc66" },
    { text: "מה אתה רוצה?", color: "#ffcc66" },

    // africa
    { text: "ምን ትፈልጋለህ?", color: "#00ff66" },
    { text: "o le batla eng?", color: "#00ff66" },
    { text: "nini unataka?", color: "#00ff66" },
    { text: "kí ni fẹ́?", color: "#00ff66" },
    { text: "ubufuna ntoni?", color: "#00ff66" },
    { text: "ungathanda ini?", color: "#00ff66" },

    // asia / pacific
    { text: "何が欲しい？", color: "#00ffff" },
    { text: "你想要什么？", color: "#00ffff" },
    { text: "nǐ xiǎng yào shénme?", color: "#00ffff" },
    { text: "क्या चाहते हो?", color: "#00ffff" },
    { text: "তুমি কি চাও?", color: "#00ffff" },
    { text: "คุณต้องการอะไร?", color: "#00ffff" },
    { text: "너 뭐 원해?", color: "#00ffff" },
    { text: "apa yang kamu mau?", color: "#00ffff" },
    { text: "നിനക്ക് എന്ത് വേണം?", color: "#00ffff" },

    // indigenous / island
    { text: "tlen ticnequi?", color: "#ff66ff" },
    { text: "ani piya?", color: "#ff66ff" },
    { text: "manaoana ianao?", color: "#ff66ff" },
    { text: "fa’apefea ou te mana’o?", color: "#ff66ff" },
    { text: "he aha tō hiahia?", color: "#ff66ff" },

    // misc / fun
    { text: "what’s your craving, traveler?", color: "#ffffff" },
    { text: "hungry, are we?", color: "#ffffff" },
    { text: "the mainframe asks: qué quieres?", color: "#ffffff" }
  ];

  function randomQueQuieres() {
    const pick = queQuieres[Math.floor(Math.random() * queQuieres.length)];
    typeOut(`system prompt: ${pick.text}\n\n`, 30, pick.color);
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

    if (l.startsWith("pantry:")) {
      const items = l.replace("pantry:", "").split(",").map(x => x.trim());
      fetch("http://127.0.0.1:5000/pantry", {
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

    if (l.startsWith("show ")) {
      const name = l.replace("show ", "");
      showRecipe(name);
      return;
    }

    if (l === "list") {
      fetch("http://127.0.0.1:5000/recipes")
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

  // --- show recipe (joke first) ---
  function showRecipe(name) {
    const joke = "// " + jokes[currentJoke] + "\n";
    currentJoke = (currentJoke + 1) % jokes.length;

    typeOut(joke, 25, "#00ff66", () => {
      fetch(`http://127.0.0.1:5000/recipes/${name}`)
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
  typeOut("System online.\n", 30, null, () => {
    randomQueQuieres();
    typeOut("Type 'help' to see available commands.\n");
  });
});
>>>>>>> 47b5f28 (initial commit : egg core awake)
