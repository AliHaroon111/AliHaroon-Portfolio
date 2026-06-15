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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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


    // scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
}

// Hamburger menu toggle (Updated for smooth structural feedback)
hamburger.addEventListener('click', () => {
    navbar.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close nav when a link is clicked on mobile
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () =>{
        navbar.classList.remove('open');
        hamburger.classList.remove('active');
    });
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

// Animated counters (count-up on scroll into view)
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (prefersReducedMotion) {
        el.textContent = target + '+';
        return;
    }
    let current = 0;
    const duration = 1500; // ms
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const increment = target / steps;

    const counterInterval = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(counterInterval);
        } else {
            el.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Run typewriter only if motion is not reduced
if (!prefersReducedMotion) {
    type();
} else if (textElement) {
    textElement.textContent = words[0];
}

// Dynamic GitHub Projects Fetching Functionality
async function fetchGitHubProjects() {
    const username = "AliHaroon111";
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        
        // Filter out fork copies and your main profile configuration repository
        const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);
        
        filteredRepos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <div style="width:100%; height:100%; background:linear-gradient(135deg, #0f2027, #203a43); display:flex; align-items:center; justify-content:center;">
                        <i class="bx bx-code-block" style="font-size: 4rem; color: var(--primary-blue); opacity:0.4;"></i>
                    </div>
                    <div class="img-overlay" style="transform: translateY(0); opacity: 1; background: rgba(8,8,8,0.85);">
                        <h3>${repo.name.replace(/-/g, ' ')}</h3>
                        <p>${repo.description || 'No description provided. Click below to inspect code repository architecture.'}</p>
                        <div class="project-links" style="margin-top: 10px;">
                            <a href="${repo.html_url}" target="_blank"><i class="bx bxl-github"></i> Inspect Repository</a>
                        </div>
                    </div>
                </div>
            `;
            portfolioGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error("Error loading GitHub projects:", error);
    }
}

// Initialize on execution sequence
document.addEventListener("DOMContentLoaded", fetchGitHubProjects);