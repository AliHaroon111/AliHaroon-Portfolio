const textElement = document.querySelector('.typewriter')
let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a');
const words = ["Full Stack Developer", "BSCS Student", "Node.js Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

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

type();