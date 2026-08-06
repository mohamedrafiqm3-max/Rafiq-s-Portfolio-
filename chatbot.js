     document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("chatToggleBtn");
    const closeBtn = document.getElementById("chatCloseBtn");
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");

    // Toggle Chat Visibility
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            chatWindow.classList.toggle("hidden");
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            chatWindow.classList.add("hidden");
        });
    }

    // Form Submission
    if (chatForm) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage(text, "user");
            chatInput.value = "";

            setTimeout(() => {
                const response = getBotResponse(text.toLowerCase());
                appendMessage(response, "bot");
            }, 400);
        });
    }

    // Restore Google login session on page load
    const savedUser = localStorage.getItem("google_user");
    if (savedUser) {
        updateUserUI(JSON.parse(savedUser));
    }
});

// Quick Chip Action Click Handler
function handleChipClick(topic) {
    const chipsContainer = document.getElementById("chatChips");
    if (chipsContainer) chipsContainer.style.display = "none";

    let userText = "";
    if (topic === "skills") userText = "What are your skills?";
    else if (topic === "projects") userText = "Tell me about your projects.";
    else if (topic === "certificates") userText = "What certificates do you have?";
    else if (topic === "contact") userText = "How can I contact you?";
    else if (topic === "resume") userText = "Where can I get your resume?";

    appendMessage(userText, "user");

    setTimeout(() => {
        const response = getBotResponse(userText.toLowerCase());
        appendMessage(response, "bot");
    }, 400);
}

// Append message to chat body
function appendMessage(text, sender) {
    const chatBody = document.getElementById("chatBody");
    if (!chatBody) return;
    
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Knowledge Base & Keyword Matching
function getBotResponse(input) {
    if (input.includes("certif") || input.includes("course") || input.includes("cisco") || input.includes("ibm") || input.includes("hp") || input.includes("p&g") || input.includes("safalta")) {
        return "Mohamed holds several professional certifications:<br>" +
               "• <b>HP LIFE:</b> Data Science & Analytics Certificate<br>" +
               "• <b>Cisco Networking Academy:</b> Data Analytics Essentials<br>" +
               "• <b>IBM SkillsBuild:</b> AI Fundamentals<br>" +
               "• <b>P&G Safalta Program:</b> Digital Participation Certificate<br><br>" +
               "🔗 You can view all certificate details on the <a href='certificate.html' style='color:#007bff;font-weight:bold;'>Certificates Page</a>!";
    } else if (input.includes("who") || input.includes("about") || input.includes("background") || input.includes("degree") || input.includes("college") || input.includes("education")) {
        return "<b>Mohamed Rafiq.M</b> is a 3rd-year <b>B.Com (Computer Applications)</b> student at Thiruthangal Nadar College (Madras University). He bridges business management, data analytics, and modern web engineering.";
    } else if (input.includes("skill") || input.includes("tool") || input.includes("technol") || input.includes("programming")) {
        return "Mohamed's technical toolkit includes:<br>" +
               "• <b>Data Analytics & BI:</b> Power BI, SPSS Statistics, Advanced Excel, Python<br>" +
               "• <b>Web Development:</b> HTML5, CSS3, MySQL, GitHub<br>" +
               "• <b>Core Business:</b> Corporate Accounting, Tally Prime, Business Law<br>" +
               "• <b>AI & Multimedia:</b> Prompt Engineering (ChatGPT, Gemini, Meta AI) & Video Editing";
    } else if (input.includes("project") || input.includes("work") || input.includes("portfolio")) {
        return "Here are Mohamed's featured projects:<br>" +
               "1. <b>Sustainable Travel Content Calendar:</b> 1-Week campaign strategy for Chennai & ECR coast.<br>" +
               "2. <b>Excel Mini Project:</b> Student Skill Course Enrollment tracking dashboard.<br>" +
               "3. <b>Personal Web Portfolio:</b> Custom HTML/CSS/JS deployed on GitHub Pages.<br>" +
               "4. <b>R Tech Phoenix Channel:</b> YouTube content pipeline & analytics management.";
    } else if (input.includes("internship") || input.includes("lotus") || input.includes("shipping") || input.includes("experience")) {
        return "Mohamed completed a 15-day <b>Data Analysis Internship in Logistics & Operations</b> at <b>Lotus Shipping Company</b>. You can download his full <a href='https://raw.githubusercontent.com/mohamedrafiqm3-max/Rafiq-s-Portfolio-/main/Lotus%20company%20internship%20report.pdf' target='_blank'>Internship Report Here</a>.";
    } else if (input.includes("contact") || input.includes("email") || input.includes("reach") || input.includes("linkedin") || input.includes("phone")) {
        return "You can get in touch with Mohamed via:<br>" +
               "📧 Email: <a href='mailto:mohamedrafiqmt9@gmail.com'>mohamedrafiqmt9@gmail.com</a><br>" +
               "💼 LinkedIn: <a href='https://www.linkedin.com/in/mohamed-rafiq-m-221591351' target='_blank'>LinkedIn Profile</a><br>" +
               "📍 Location: Vyasarpadi, Chennai - 600 039";
    } else if (input.includes("resume") || input.includes("cv") || input.includes("download")) {
        return "📄 You can download his official resume <a href='Rafiq Resume.pdf' download='Mohamed_Rafiq_Resume.pdf' style='color:#007bff;font-weight:bold;'>Right Here</a>.";
    } else if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
        return "Hello! 👋 Feel free to ask me about Mohamed's skills, projects, certificates, internship at Lotus Shipping Company, or contact details!";
    } else {
        return "I'm not sure about that specific query, but you can reach Mohamed directly via email at <b>mohamedrafiqmt9@gmail.com</b> or check out his certificates on the main menu!";
    }
}

/* ==========================================
   Google OAuth 2.0 Auth Functions
   ========================================== */

// Helper to decode JWT token returned by Google
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}

// Callback triggered when Google Sign-In succeeds
function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);
    console.log("Logged in user:", responsePayload);

    // Save user session in localStorage
    localStorage.setItem("google_user", JSON.stringify(responsePayload));

    // Update UI
    updateUserUI(responsePayload);
}

// Update Header UI elements after sign-in / sign-out
function updateUserUI(user) {
    const googleBtn = document.querySelector('.g_id_signin');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');

    if (user) {
        if (googleBtn) googleBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (userName) userName.textContent = `Hi, ${user.given_name}`;
        if (userAvatar) userAvatar.src = user.picture;
    } else {
        if (googleBtn) googleBtn.style.display = 'inline-block';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// Log out user
function logoutGoogle() {
    localStorage.removeItem("google_user");
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.disableAutoSelect();
    }
    updateUserUI(null);
}
            
