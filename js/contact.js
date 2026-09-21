// =========================================
// NIRA CLINIC - CONTACT PAGE
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            // Prevent the page from refreshing
            event.preventDefault();

            // Get form values
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();


            // Basic validation
            if (fullName === "") {
                alert("Please enter your full name.");
                return;
            }

            if (email === "") {
                alert("Please enter your email address.");
                return;
            }

            if (subject === "") {
                alert("Please enter a subject.");
                return;
            }

            if (message === "") {
                alert("Please enter your message.");
                return;
            }


            // Simple email validation
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }


            // For now, display confirmation
            alert(
                "Thank you, " + fullName +
                "! Your message has been submitted successfully."
            );


            // Clear the form
            contactForm.reset();

        });

    }

});
