// Initialize EmailJS public key
emailjs.init("Bxv-OmZrxtYjIYkWQ"); // 🔴 EmailJS public key

const textElement = document.querySelector('.typewriter')
let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a');
// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const words = ["Backend Developer", "Node.js & Express Engineer", "MongoDB Specialist", "BSCS Student"];
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

// ======================
// THEME TOGGLE
// ======================
// On page load, read saved preference from localStorage
// If user had set light mode before, apply it immediately
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on load
document.documentElement.setAttribute('data-theme', savedTheme);
// Show correct icon: sun = currently dark (click to go light), moon = currently light (click to go dark)
themeIcon.className = savedTheme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';

themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    // Swap icon
    themeIcon.className = next === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
});

// ======================
// RESUME MODAL
// ======================
function openResumeModal() {
    document.getElementById('resumeModal').classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeResumeModal() {
    document.getElementById('resumeModal').classList.remove('open');
    document.body.style.overflow = ''; // restore scroll
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResumeModal();
});


// ======================
// EMAILJS CONTACT FORM
// ======================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload — we handle submission via JS

    // Get values from inputs
    const name    = document.getElementById('from_name').value.trim();
    const email   = document.getElementById('from_email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status-msg error';
        return;
    }

    // Disable button while sending
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send via EmailJS
    // emailjs.send(serviceID, templateID, templateParams)
    emailjs.send(
        "service_7guhuc5",   // 🔴 EmailJS Service ID
        "template_9xuwgz1",  // 🔴 EmailJS Template ID
        {
            from_name:  name,
            from_email: email,
            message:    message
        }
    ).then(() => {
        // SUCCESS
        formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
        formStatus.className = 'form-status-msg success';
        contactForm.reset(); // Clear all fields
        submitBtn.textContent = 'Send Message 🚀';
        submitBtn.disabled = false;

    }).catch((error) => {
        // ERROR
        console.error('EmailJS error:', error);
        formStatus.textContent = '❌ Something went wrong. Try emailing me directly at aliharoon0111@gmail.com';
        formStatus.className = 'form-status-msg error';
        submitBtn.textContent = 'Send Message 🚀';
        submitBtn.disabled = false;
    });
});

// ======================
// PROJECT FILTER BUTTONS
// ======================
const filterBtns = document.querySelectorAll('.filter-btn');
// querySelectorAll — grabs ALL elements matching a CSS selector, returns a NodeList

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // 2. Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        // getAttribute — reads the value of data-filter on the clicked button

        // 3. Get ALL static project cards (not GitHub API ones)
        const cards = document.querySelectorAll('.portfolio-grid:first-of-type .project-card');

        cards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden'); // show all
            } else if (card.getAttribute('data-filter') === filter) {
                card.classList.remove('hidden'); // show matching
            } else {
                card.classList.add('hidden'); // hide non-matching
            }
        });
    });
});