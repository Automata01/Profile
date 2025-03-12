const nav = document.getElementById("nav");

function toggleNav(x) {
    nav.style.left = nav.style.left === "0px" ? "-100%" : "0px";
    x.classList.toggle("change");
}

function closeNav() {
    const elements = document.querySelectorAll(".container"); // Gets all elements with class "container"

    document.getElementById("nav").style.left = "-100%"; // Close the nav

    // Loop through all elements and remove "change" class
    elements.forEach(el => {
        el.classList.remove("change");
    });
}