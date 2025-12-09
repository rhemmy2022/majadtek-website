const form = document.getElementById("applicationForm");
const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");
const uploadText = document.getElementById("uploadText");
const fileName = document.getElementById("fileName");
const submitBtn = form.querySelector('button[type="submit"]');

function showError(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideError(id) {
    document.getElementById(id).classList.add("hidden");
}

// Show loading state
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Submitting..." : "Submit Application";
}

// Show success/error messages
function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-md ${isError ? 'bg-red-500' : 'bg-green-500'} text-white shadow-lg z-50`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 5000);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let valid = true;
    
    // Validate all fields
    if (!firstName.checkValidity()) { showError("fnameError"); valid = false; } else hideError("fnameError");
    if (!lastName.checkValidity()) { showError("lnameError"); valid = false; } else hideError("lnameError");
    if (!email.checkValidity()) { showError("emailError"); valid = false; } else hideError("emailError");
    if (!phone.checkValidity()) { showError("phoneError"); valid = false; } else hideError("phoneError");
    if (!fileInput.files.length) { showError("fileError"); valid = false; } else hideError("fileError");
    if (!message.value.trim()) { showError("msgError"); valid = false; } else hideError("msgError");
    
    if (!valid) return;
    
    // Prepare form data
    const formData = new FormData();
    formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY'); // Get this from web3forms.com
    formData.append('email', 'info@majadtek.com.ng'); // Your email
    formData.append('subject', 'New Job Application from Website');
    formData.append('from_name', `${firstName.value.trim()} ${lastName.value.trim()}`);
    formData.append('First Name', firstName.value.trim());
    formData.append('Last Name', lastName.value.trim());
    formData.append('Applicant Email', email.value.trim());
    formData.append('Phone', phone.value.trim());
    formData.append('Message', message.value.trim());
    formData.append('attachment', fileInput.files[0]);
    
    try {
        setLoading(true);
        
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Success
        showMessage('Application submitted successfully!');
        form.reset();
        fileName.textContent = "Supported: PDF, JPG, PNG, DOC, DOCX";
        
    } catch (error) {
        console.error('Submission error:', error);
        showMessage('Failed to submit application. Please try again.', true);
    } finally {
        setLoading(false);
    }
});

// File upload handlers
uploadBox.addEventListener("click", () => fileInput.click());

uploadText.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    fileName.textContent = file ? file.name : "Supported: PDF, JPG, PNG, DOC, DOCX";
    hideError("fileError");
});

uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("bg-teal-100");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("bg-teal-100");
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("bg-teal-100");
    
    fileInput.files = e.dataTransfer.files;
    fileName.textContent = e.dataTransfer.files[0].name;
    hideError("fileError");
});