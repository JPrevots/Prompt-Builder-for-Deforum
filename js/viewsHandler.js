// Views Handler
export function mainContentHandler(contentName) {
    hideAll();
    showCurrentContent(contentName);
}

// Add display-none (hide) to every elements with class "view"
function hideAll() {
    let views = document.getElementsByClassName("view"); // Collection of HTML elements with the class "view"
    // Loop through these elements hide each of them
    for (let i = 0; i < views.length; i++) {
        views[i].classList.add("d-none"); // Hide
    }
}

// contentName is the id of what will be shown on the page
function showCurrentContent(contentName) {
    let currentContent = document.getElementById(contentName);
    currentContent.classList.remove("d-none"); // Display
}