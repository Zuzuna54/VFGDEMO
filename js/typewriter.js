class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

document.addEventListener("DOMContentLoaded", function() {
    let scrolled = false;
    const navbar = document.getElementById("navbar");
    window.onscroll = function() {
        if (window.pageYOffset > 100) {
            navbar.classList.remove("top");
            if (!scrolled) {
                navbar.style.transform = "translateY(-70px)";
            }
            setTimeout(function() {
                navbar.style.transform = "translateY(0px)";
            }, 100);
        } else {
            navbar.classList.add("top");
        }
    };

    // Smooth Scrolling/ Jquery
    $("#navbar a, .btn").on("click", function(e) {
        console.log("JQ loaded");
        if (this.hash !== "") {
            e.preventDefault();

            const hash = this.hash;

            $("html, body").animate({
                    scrollTop: $(hash).offset().top - 100,
                },
                800
            );
        }
    });
});

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction1() {
    document.getElementById("Fed-Drop").classList.toggle("show");
}

function myFunction2() {
    document.getElementById("nat-drop").classList.toggle("show");
}

function myFunction3() {
    document.getElementById("club-drop").classList.toggle("show");
}

function myFunction4() {
    document.getElementById("var-drop").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

window.addEventListener("scroll", function() {
    const currentScroll = window.pageYOffset;
    console.log(currentScroll);
    const nav = document.getElementById("nav-wrap");
    console.log(nav);
    if (currentScroll >= 660) {
        nav.classList.add("hide-nav");
        console.log(nav.classList);
    } else {
        nav.classList.remove("hide-nav");
    }
});