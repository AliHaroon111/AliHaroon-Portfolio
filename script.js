const textElement = document.querySelector('.typewriter')
let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a');
// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const words = ["Full Stack Developer", "BSCS Student", "Node.js Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
// For Type writer
function type(){
    const currentWord = words[wordIndex];

    if(isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++
    }

    if (!isDeleting && charIndex == currentWord.length) {
        isDeleting = true;
        setTimeout(type,2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 10 : 30);
    }

}

// Navbar Scroll
window.onscroll = ()=>{

    // 1. Check if we are at the very bottom of the page (Contact Scroll make issue without it)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        navLinks.forEach(links => {
            links.classList.remove('active');
        });
        document.querySelector('header nav a[href*="contact"]').classList.add('active');
        return; // Stop the rest of the function from running
    }

    sections.forEach(section => {
        let top =window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            });
        }
        
    });
}

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

// Close nav when a link is clicked on mobile
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () =>{
        navbar.classList.remove('open')
    });
});


// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

type();