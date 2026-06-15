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
    // Targets the new distinct container safely
    const githubGrid = document.getElementById('github-grid');
    
    if (!githubGrid) return; 
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);
        
        githubGrid.innerHTML = ""; // Clear loader states if any
        
        filteredRepos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            // Re-engineered card design tailored for text-heavy API repos
            projectCard.innerHTML = `
                <div class="project-img" style="background: linear-gradient(135deg, #0d1b2a, #1b263b); height: 100%;">
                    <div style="position: absolute; top: 20px; left: 20px; color: var(--neon-cyan); opacity: 0.15;">
                        <i class="bx bx-code-alt" style="font-size: 5rem;"></i>
                    </div>
                    <div class="api-card-content" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 25px; display: flex; flex-direction: column; justify-content: space-between; z-index: 5;">
                        <div>
                            <h3 style="color: var(--neon-cyan); font-size: 1.3rem; margin-bottom: 10px;">
                                ${repo.name.replace(/[-_]/g, ' ')}
                            </h3>
                            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.5; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">
                                ${repo.description || 'No description provided. Click below to inspect code repository architecture.'}
                            </p>
                        </div>
                        <div class="project-links" style="margin-top: 15px;">
                            <a href="${repo.html_url}" target="_blank" style="color: var(--primary-blue); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
                                <i class="bx bxl-github"></i> Inspect Repository
                            </a>
                        </div>
                    </div>
                </div>
            `;
            githubGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error("Error loading GitHub projects:", error);
        githubGrid.innerHTML = `<p style="color: var(--text-gray); grid-column: 1/-1; text-align: center;">Unable to load live repositories at this moment.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", fetchGitHubProjects);