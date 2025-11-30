
    const form = document.getElementById("applicationForm");
    const fileInput = document.getElementById("fileInput");
    const uploadBox = document.getElementById("uploadBox");
    const uploadText = document.getElementById("uploadText");
    const fileName = document.getElementById("fileName");

    function showError(id) {
        document.getElementById(id).classList.remove("hidden");
    }
    function hideError(id) {
        document.getElementById(id).classList.add("hidden");
    }

    form.addEventListener("submit", (e) => {
        let valid = true;

        if (!firstName.checkValidity()) { showError("fnameError"); valid = false; } else hideError("fnameError");
        if (!lastName.checkValidity()) { showError("lnameError"); valid = false; } else hideError("lnameError");
        if (!email.checkValidity()) { showError("emailError"); valid = false; } else hideError("emailError");
        if (!phone.checkValidity()) { showError("phoneError"); valid = false; } else hideError("phoneError");
        if (!fileInput.files.length) { showError("fileError"); valid = false; } else hideError("fileError");
        if (!message.value.trim()) { showError("msgError"); valid = false; } else hideError("msgError");

        if (!valid) e.preventDefault();
    });

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
