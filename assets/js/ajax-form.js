(function ($) {
    'use strict';
    var form = $('.contact-form'),
        message = $('.messenger-box-contact__msg'),
        form_data;

    // Success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 3000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    // Fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-danger');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 3000);
    }
    
    form.submit(function (e) {
        e.preventDefault();

        const message = document.getElementById('required-msg');
        const fullName = document.getElementById("full-name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");

        if (!fullName.value || !email.value || !subject.value) {
            message.classList.add('show');
            fullName.classList.add("invalid");
            console.log('false');
            return false;
        }
        message.classList.remove('show');

        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });

    // Attachment handling
    const fileInput = document.getElementById('upload-attachment');
    const attachmentBox = document.querySelector('.attachment-box');
    const fileNameDisplay = document.querySelector('.file-name');
    const fileSizeDisplay = document.querySelector('.file-size');
    const removeButton = document.querySelector('.remove-file');

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                fileNameDisplay.textContent = `Name: ${file.name}`;
                fileSizeDisplay.textContent = `Size: ${(file.size / 1024).toFixed(2)} KB`;
                attachmentBox.style.display = 'block';
            }
        });

        removeButton.addEventListener('click', () => {
            fileInput.value = '';
            attachmentBox.style.display = 'none';
            fileNameDisplay.textContent = '';
            fileSizeDisplay.textContent = '';
        });
    }
})(jQuery);

// Remove modal backdrop when the modal is shown
$('#resumeModal').on('shown.bs.modal', function () {
    $('.modal-backdrop').remove();
});

// Handle resume download buttons and close the modal
const englishButton = document.querySelector('a[href="assets/resume/EN_CV_OMBORDA.pdf"]');
const deutschButton = document.querySelector('a[href="assets/resume/DE_CV_OMBORDA.pdf"]');
const resumeModal = document.getElementById('resumeModal');

// Close the modal after clicking the English button
englishButton.addEventListener('click', () => {
    console.log('English button clicked');
    // Programmatically close the modal
    const modalInstance = bootstrap.Modal.getInstance(resumeModal);
    modalInstance.hide();
});

// Close the modal after clicking the Deutsch button
deutschButton.addEventListener('click', () => {
    console.log('Deutsch button clicked');
    // Programmatically close the modal
    const modalInstance = bootstrap.Modal.getInstance(resumeModal);
    modalInstance.hide();
});