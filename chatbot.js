Document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("chatToggleBtn");
    const closeBtn = document.getElementById("chatCloseBtn");
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");

    // Toggle Chat Visibility
    toggleBtn.addEventListener("click", () => {
        chatWindow.classList.toggle("hidden");
    });

    closeBtn.addEventListener("click", () => {
        chatWindow.classList.add("hidden");
    });

    // Form Submission
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
});

// Quick Chip Action Click Handler
function handleChipClick(topic) {
    const chipsContainer = document.getElementById("chatChips");
    if (chipsContainer) chipsContainer.style.display = "none"; // Hide chips after initial selection

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

// Append a message bubble to the chat body
function appendMessage(text, sender) {
    const chatBody = document.getElementById("chatBody");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Knowledge Base & Keyword Matching
function getBotResponse(input) {
    // Certifications & Courses
    if (input.includes("certif") || input.includes("course") || input.includes("cisco") || input.includes("ibm") || input.includes("hp") || input.includes("p&g") || input.includes("safalta")) {
        return "Mohamed holds several professional certifications:<br>" +
               "• <b>HP LIFE:</b> Data Science & Analytics Certificate<br>" +
               "• <b>Cisco Networking Academy:</b> Data Analytics Essentials<br>" +
               "• <b>IBM SkillsBuild:</b> AI Fundamentals<br>" +
               "• <b>P&G Safalta Program:</b> Digital Participation Certificate<br><br>" +
               "🔗 You can view all certificate details on the <a href='certificate.html' style='color:#007bff;font-weight:bold;'>Certificates Page</a>!";
    }

    // About / Bio / Education
    else if (input.includes("who") || input.includes("about") || input.includes("background") || input.includes("degree") || input.includes("college") || input.includes("education")) {
        return "<b>Mohamed Rafiq.M</b> is a 3rd-year <b>B.Com (Computer Applications)</b> student at Thiruthangal Nadar College (Madras University)[span_0](start_span)[span_0](end_span). He bridges business management, data analytics, and modern web engineering[span_1](start_span)[span_1](end_span).";
    }
    
    // Skills & Tools
    else if (input.includes("skill") || input.includes("tool") || input.includes("technol") || input.includes("programming")) {
        return "Mohamed's technical toolkit includes:<br>" +
               "• <b>Data Analytics & BI:</b> Power BI, SPSS Statistics, Advanced Excel, Python[span_2](start_span)[span_2](end_span)<br>" +
               "• <b>Web Development:</b> HTML5, CSS3, MySQL, GitHub[span_3](start_span)[span_3](end_span)<br>" +
               "• <b>Core Business:</b> Corporate Accounting, Tally Prime, Business Law[span_4](start_span)[span_4](end_span)<br>" +
               "• <b>AI & Multimedia:</b> Prompt Engineering (ChatGPT, Gemini, Meta AI) & Video Editing[span_5](start_span)[span_5](end_span)";
    } 
    
    // Projects
    else if (input.includes("project") || input.includes("work") || input.includes("portfolio")) {
        return "Here are Mohamed's featured projects:<br>" +
               "1. <b>Sustainable Travel Content Calendar:</b> 1-Week campaign strategy for Chennai & ECR coast.<br>" +
               "2. <b>Excel Mini Project:</b> Student Skill Course Enrollment tracking dashboard.<br>" +
               "3. <b>Personal Web Portfolio:</b> Custom HTML/CSS/JS deployed on GitHub Pages[span_6](start_span)[span_6](end_span).<br>" +
               "4. <b>R Tech Phoenix Channel:</b> YouTube content pipeline & analytics management[span_7](start_span)[span_7](end_span).";
    } 
    
    // Internship
    else if (input.includes("internship") || input.includes("lotus") || input.includes("shipping") || input.includes("experience")) {
        return "Mohamed completed a 15-day <b>Data Analysis Internship in Logistics & Operations</b> at <b>Lotus Shipping Company</b>[span_8](start_span)[span_8](end_span). You can download his full <a href='https://raw.githubusercontent.com/mohamedrafiqm3-max/Rafiq-s-Portfolio-/main/Lotus%20company%20internship%20report.pdf' target='_blank'>Internship Report Here</a>.";
    }

    // Contact Information
    else if (input.includes("contact") || input.includes("email") || input.includes("reach") || input.includes("linkedin") || input.includes("phone")) {
        return "You can get in touch with Mohamed via:<br>" +
               "📧 Email: <a href='mailto:mohamedrafiqmt9@gmail.com'>mohamedrafiqmt9@gmail.com</a>[span_9](start_span)[span_9](end_span)<br>" +
               "💼 LinkedIn: <a href='https://www.linkedin.com/in/mohamed-rafiq-m-221591351' target='_blank'>LinkedIn Profile</a>[span_10](start_span)[span_10](end_span)<br>" +
               "📍 Location: Vyasarpadi, Chennai - 600 039[span_11](start_span)[span_11](end_span)";
    } 
    
    // Resume
    else if (input.includes("resume") || input.includes("cv") || input.includes("download")) {
        return "📄 You can download his official resume <a href='Rafiq Resume.pdf' download='Mohamed_Rafiq_Resume.pdf' style='color:#007bff;font-weight:bold;'>Right Here</a>[span_12](start_span)[span_12](end_span).";
    } 
    
    // Greetings
    else if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
        return "Hello! 👋 Feel free to ask me about Mohamed's skills, projects, certificates, internship at Lotus Shipping Company, or contact details!";
    } 
    
    // Default Fallback
    else {
        return "I'm not sure about that specific query, but you can reach Mohamed directly via email at <b>mohamedrafiqmt9@gmail.com</b>[span_13](start_span)[span_13](end_span) or check out his certificates on the main menu[span_14](start_span)[span_14](end_span)!";
    }
}
