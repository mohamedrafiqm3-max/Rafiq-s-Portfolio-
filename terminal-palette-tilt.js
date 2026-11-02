/**
 * Interactive Features: Terminal Mode, 3D Tilt Cards, & Ctrl+K Command Palette
 * Mohamed Rafiq M. - Portfolio Enhancements
 */

document.addEventListener("DOMContentLoaded", () => {
    init3DTilt();
    initCommandPalette();
    initTerminalMode();
});

/* ==========================================================================
   1. Vanilla JS 3D Tilt Hover Effect
   ========================================================================== */
function init3DTilt() {
    const cards = document.querySelectorAll(".glowing-card, .card");

    cards.forEach((card) => {
        card.classList.add("tilt-card");

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Compute tilt angles (max tilt ~12deg)
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}

/* ==========================================================================
   2. Command Palette (Ctrl+K / Cmd+K Search)
   ========================================================================== */
const paletteNavigation = [
    { name: "Home Page", category: "Navigation", url: "index.html" },
    { name: "About Me", category: "Navigation", url: "about.html" },
    { name: "Certificates Page", category: "Navigation", url: "certificate.html" },
    { name: "Contact Page", category: "Navigation", url: "contact.html" },
    { name: "Zentaxic - Smart GST & Tax Invoice", category: "Project", url: "https://zentaxic2.vercel.app/" },
    { name: "ShipVertex - Logistics Expense Tracker", category: "Project", url: "https://express-tracker4-m2aj.vercel.app/" },
    { name: "Sustainable Travel Content Strategy", category: "Project", url: "ilovepdf_merged.pdf" },
    { name: "Excel Student Tracking Dashboard", category: "Project", url: "https://docs.google.com/spreadsheets/d/1cIxSWKRds_CDCPSvsNmOIk3enHzFRv3V/edit?usp=sharing" },
    { name: "YouTube Channel (@RTechPhoenix)", category: "Social", url: "https://www.youtube.com/@RTechPhoenix-k5h" },
    { name: "LinkedIn Profile", category: "Social", url: "https://www.linkedin.com/in/mohamed-rafiq-m-221591351" },
    { name: "GitHub Profile", category: "Social", url: "https://github.com/mohamedrafiqm3-max" },
    { name: "Download Resume", category: "Document", url: "Mohamed_Rafiq_Resume_v3.pdf" }
];

function initCommandPalette() {
    // Inject Command Palette HTML into DOM dynamically if not present
    if (!document.getElementById("commandPaletteModal")) {
        const paletteHTML = `
            <div class="cmd-palette-modal" id="commandPaletteModal">
                <div class="cmd-palette-overlay" onclick="toggleCommandPalette(false)"></div>
                <div class="cmd-palette-box">
                    <div class="cmd-palette-header">
                        <span class="cmd-icon">🔍</span>
                        <input type="text" id="cmdInput" placeholder="Type a command or search (e.g. Zentaxic, Resume, Certificates)..." autocomplete="off">
                        <kbd class="cmd-shortcut">ESC</kbd>
                    </div>
                    <div class="cmd-palette-results" id="cmdResults"></div>
                    <div class="cmd-palette-footer">
                        <span>Navigation: <b>↑</b> <b>↓</b></span>
                        <span>Select: <b>↵ Enter</b></span>
                        <span>Close: <b>Esc</b></span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", paletteHTML);
    }

    const modal = document.getElementById("commandPaletteModal");
    const input = document.getElementById("cmdInput");
    const resultsContainer = document.getElementById("cmdResults");

    // Listen for Ctrl+K or Cmd+K
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            toggleCommandPalette(true);
        } else if (e.key === "Escape" && modal.classList.contains("active")) {
            toggleCommandPalette(false);
        }
    });

    input.addEventListener("input", () => {
        renderPaletteResults(input.value.trim().toLowerCase());
    });
}

function toggleCommandPalette(show) {
    const modal = document.getElementById("commandPaletteModal");
    const input = document.getElementById("cmdInput");

    if (show) {
        modal.classList.add("active");
        input.value = "";
        renderPaletteResults("");
        setTimeout(() => input.focus(), 50);
    } else {
        modal.classList.remove("active");
    }
}

function renderPaletteResults(query) {
    const resultsContainer = document.getElementById("cmdResults");
    resultsContainer.innerHTML = "";

    const filtered = paletteNavigation.filter(item => 
        item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="cmd-no-results">No matching commands or pages found.</div>`;
        return;
    }

    filtered.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = `cmd-item ${index === 0 ? "selected" : ""}`;
        row.innerHTML = `
            <div class="cmd-item-info">
                <span class="cmd-item-title">${item.name}</span>
            </div>
            <span class="cmd-item-badge">${item.category}</span>
        `;
        row.onclick = () => {
            toggleCommandPalette(false);
            if (item.url.startsWith("http") || item.url.endsWith(".pdf")) {
                window.open(item.url, "_blank");
            } else {
                window.location.href = item.url;
            }
        };
        resultsContainer.appendChild(row);
    });
}

/* ==========================================================================
   3. Terminal / Command Line Mode (Developer Mode Toggle)
   ========================================================================== */
function initTerminalMode() {
    // Inject Terminal Floating Window into DOM dynamically
    if (!document.getElementById("terminalWindow")) {
        const termHTML = `
            <div class="terminal-window hidden" id="terminalWindow">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <span class="dot red" onclick="toggleTerminal(false)"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <div class="terminal-title">rafiq@dev-box:~ (zsh)</div>
                </div>
                <div class="terminal-body" id="terminalBody">
                    <div class="term-line">Welcome to Mohamed Rafiq's Terminal Shell v2.6.0</div>
                    <div class="term-line">Type <span class="term-cmd">help</span> to list available commands.</div>
                    <div class="term-line">&nbsp;</div>
                </div>
                <form class="terminal-input-row" id="terminalForm">
                    <span class="prompt-symbol">rafiq@portfolio:~$</span>
                    <input type="text" id="terminalInput" autocomplete="off" spellcheck="false">
                </form>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", termHTML);
    }

    const form = document.getElementById("terminalForm");
    const input = document.getElementById("terminalInput");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const cmd = input.value.trim();
        if (!cmd) return;

        appendTerminalLine(`rafiq@portfolio:~$ ${cmd}`, "user-cmd");
        input.value = "";
        processTerminalCommand(cmd.toLowerCase());
    });
}

function toggleTerminal(show) {
    const term = document.getElementById("terminalWindow");
    const input = document.getElementById("terminalInput");

    if (show === undefined) {
        term.classList.toggle("hidden");
    } else if (show) {
        term.classList.remove("hidden");
    } else {
        term.classList.add("hidden");
    }

    if (!term.classList.contains("hidden")) {
        setTimeout(() => input.focus(), 100);
    }
}

function appendTerminalLine(text, type = "info") {
    const body = document.getElementById("terminalBody");
    const line = document.createElement("div");
    line.className = `term-line ${type}`;
    line.innerHTML = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
}

function processTerminalCommand(cmd) {
    switch (cmd) {
        case "help":
            appendTerminalLine("Available Terminal Commands:", "system");
            appendTerminalLine("  <span class='term-cmd'>about</span>       - Brief overview of background and degree");
            appendTerminalLine("  <span class='term-cmd'>skills</span>      - Technical stack & analytical tools");
            appendTerminalLine("  <span class='term-cmd'>projects</span>    - Key web apps and content projects");
            appendTerminalLine("  <span class='term-cmd'>contact</span>     - Reach out via email or LinkedIn");
            appendTerminalLine("  <span class='term-cmd'>resume</span>      - Direct download link for resume PDF");
            appendTerminalLine("  <span class='term-cmd'>clear</span>       - Clear the terminal screen");
            appendTerminalLine("  <span class='term-cmd'>exit</span>        - Close terminal window");
            break;
        case "about":
            appendTerminalLine("Mohamed Rafiq M. - B.Com (Computer Applications) Senior Student.");
            appendTerminalLine("Bridges commerce logic, Power BI data analytics, and full-stack web solutions.");
            break;
        case "skills":
            appendTerminalLine("[Data Analytics] Power BI, SPSS, Advanced Excel, Python");
            appendTerminalLine("[Web & Systems]  HTML5, CSS3, JavaScript, MySQL, GitHub, Vercel");
            appendTerminalLine("[AI Automation]  Prompt Engineering (ChatGPT, Gemini, Meta AI)");
            break;
        case "projects":
            appendTerminalLine("1. Zentaxic (Smart Tax & GST Calculation Web App)");
            appendTerminalLine("2. ShipVertex (Logistics Expense Tracking System)");
            appendTerminalLine("3. Sustainable Travel Campaign Strategy (Chennai & ECR)");
            appendTerminalLine("4. R Tech Phoenix Gaming YouTube Channel");
            break;
        case "contact":
            appendTerminalLine("Email: <a href='mailto:mohamedrafiqmt9@gmail.com' style='color:#38bdf8;'>mohamedrafiqmt9@gmail.com</a>");
            appendTerminalLine("LinkedIn: <a href='https://www.linkedin.com/in/mohamed-rafiq-m-221591351' target='_blank' style='color:#38bdf8;'>mohamed-rafiq-m-221591351</a>");
            break;
        case "resume":
            appendTerminalLine("Downloading resume... <a href='Mohamed_Rafiq_Resume_v3.pdf' download style='color:#4ade80;'>[Download Resume PDF]</a>");
            break;
        case "clear":
            document.getElementById("terminalBody").innerHTML = "";
            break;
        case "exit":
            toggleTerminal(false);
            break;
        default:
            appendTerminalLine(`Command not found: '${cmd}'. Type <span class='term-cmd'>help</span> for options.`, "error");
            break;
    }
}
