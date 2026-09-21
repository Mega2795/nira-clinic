function openQuoteForm(event) {

    event.preventDefault();

    const modal = document.getElementById("quoteModal");

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeQuoteForm() {

    const modal = document.getElementById("quoteModal");

    modal.classList.remove("show");

    document.body.style.overflow = "";
}


/* Close when clicking outside the popup */

window.addEventListener("click", function (event) {

    const modal = document.getElementById("quoteModal");

    if (event.target === modal) {

        closeQuoteForm();

    }

});