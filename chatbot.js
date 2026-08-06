document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("chatToggleBtn");
    const closeBtn = document.getElementById("chatCloseBtn");
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");

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
        else if (topic === "certificates");
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
/


// Knowledge Base & Keyword Matching
function getBotResponse(input) {
    if (input.includes("skill") || input.includes("tool") || input.includes("technol")) {
        return "Mohamed specializes in <b>Web Development</b> (HTML5, CSS3, MySQL), <b>Data Analytics</b> (Power BI, SPSS, Excel), and <b>AI Workflow Automation</b>.";
    } 
    else if (input.includes("project") || input.includes("work")) {
        return "Some featured projects include:<br>• <i>Sustainable Travel Content Calendar</i><br>• <i>Student Skill Course Enrollment Dashboard (Excel)</i><br>• <i>Gaming YouTube Content & Performance Analytics</i>";
    } 
            // Certifications & Courses
   else if (input.includes("certif") || input.includes("course") || input.includes("cisco") || input.includes("ibm") || input.includes("hp") || input.includes("p&g") || input.includes("safalta")) {
        return "Mohamed holds several professional certifications:<br>" +
               "• <b>HP LIFE:</b> Data Science & Analytics Certificate<br>" +
               "• <b>Cisco Networking Academy:</b> Data Analytics Essentials<br>" +
               "• <b>IBM SkillsBuild:</b> AI Fundamentals<br>" +
               "• <b>P&G Safalta Program:</b> Digital Participation Certificate<br><br>" +
               "🔗 You can view all certificate details on the <a href='certificate.html' style='color:#007bff;font-weight:bold;'>Certificates Page</a>!";
    }
    else if (input.includes("contact") || input.includes("email") || input.includes("reach") || input.includes("linkedin")) {
        return "You can reach Mohamed via:<br>📧 Email: <a href='mailto:mohamedrafiqmt9@gmail.com'>mohamedrafiqmt9@gmail.com</a><br>💼 LinkedIn: <a href='https://www.linkedin.com/in/mohamed-rafiq-m-221591351' target='_blank'>Connect here</a>";
    } 
    else if (input.includes("resume") || input.includes("cv") || input.includes("download")) {
        return "📄 You can download the full resume <a href='Rafiq Resume.pdf' download='Mohamed_Rafiq_Resume.pdf' style='color:#007bff;font-weight:bold;'>Right Here</a>.";
    } 
    else if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
        return "Hello! Feel free to ask about my skills, projects, resume, or contact details.";
    } 
    else if (input.includes("internship") || input.includes("report")) {
        return "Check out the <a href='https://raw.githubusercontent.com/mohamedrafiqm3-max/Rafiq-s-Portfolio-/main/Lotus%20company%20internship%20report.pdf' target='_blank'>Lotus Company Internship Report</a>.";
    } 
    else {
        return "I'm not sure about that query, but you can email Mohamed directly at <b>mohamedrafiqmt9@gmail.com</b> for details!";
    }
}
