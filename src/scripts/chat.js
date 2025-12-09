const modal = document.getElementById('chatModal');
const openChatBtn = document.getElementById('openChat');
const closeChatBtn = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatStatus = document.getElementById('chatStatus');

// Open modal
openChatBtn.onclick = () => {
    modal.classList.remove('hidden');
};

// Close modal
closeChatBtn.onclick = () => {
    modal.classList.add('hidden');
};

// Close modal when clicking outside
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
};

// Handle form submission
chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    chatStatus.textContent = "Sending...";
    chatStatus.className = "text-center text-xs text-blue-600 py-2";

    // Send email via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        message: document.getElementById('messageInput').value,
        to_email: "write2remsar@gmail.com"
    })
    .then(() => {
        // Success
        chatStatus.textContent = "Message sent successfully! ✔";
        chatStatus.className = "text-center text-xs text-green-600 py-2";
        chatForm.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            chatStatus.textContent = "";
        }, 3000);
    })
    .catch((error) => {
        // Error
        console.error('EmailJS Error:', error);
        chatStatus.textContent = "Failed to send. Please try again ❌";
        chatStatus.className = "text-center text-xs text-red-600 py-2";
    });
});
