gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Start Advanced GSAP Animations
        const tl = gsap.timeline();
        
        tl.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power4.out', backdropFilter: 'blur(0px)' })
          .from('.hero-content h1', { x: -100, opacity: 0, duration: 1, ease: 'power4.out' }, "-=0.5")
          .from('.hero-content p', { x: -100, opacity: 0, duration: 1, ease: 'power4.out' }, "-=0.7")
          .from('.hero-content .cta-button', { scale: 0.5, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, "-=0.5")
          .from('.hero-image-container', { x: 100, opacity: 0, rotation: 10, scale: 0.8, duration: 1.5, ease: 'power4.out' }, "-=1")
          .from('.hero-shape', { scale: 0, opacity: 0, duration: 2, ease: 'power2.out' }, "-=1.5");
          
    }, 500);

    // 1. Initialize Particles.js with a more dynamic config
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#3b82f6', '#8b5cf6', '#ec4899'] },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: true, distance: 150, color: '#8b5cf6', opacity: 0.3, width: 1.5 },
            move: { enable: true, speed: 3, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    const attachCursorHover = (elements) => {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    };
    
    attachCursorHover(document.querySelectorAll('a, button'));

    // Fetch dynamic data
    Promise.all([fetchSkills(), fetchProjects()]).then(() => {
        attachCursorHover(document.querySelectorAll('.skill-tag, .project-link'));
        initScrollAnimations();
    });
});

function initScrollAnimations() {
    // Section Headers Slide In
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: { trigger: header, start: 'top 85%' },
                y: 0, opacity: 1, duration: 1, ease: 'power3.out'
            }
        );
        
        gsap.fromTo(header.querySelector('.underline'), 
            { width: 0 },
            {
                scrollTrigger: { trigger: header, start: 'top 85%' },
                width: 60, duration: 1, delay: 0.3, ease: 'power3.out'
            }
        );
    });

    // About Section Slide In
    gsap.fromTo('.about-content p', 
        { x: -50, opacity: 0 },
        {
            scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
            x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out'
        }
    );

    gsap.fromTo('.achievements-container', 
        { y: 50, scale: 0.9, opacity: 0 },
        {
            scrollTrigger: { trigger: '.achievements-container', start: 'top 85%' },
            y: 0, scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.7)'
        }
    );

    // Skills Stagger Slide
    gsap.fromTo('.skill-tag', 
        { y: 50, opacity: 0, scale: 0.8 },
        {
            scrollTrigger: { trigger: '.skills-section', start: 'top 85%' },
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)'
        }
    );

    // Projects Slide Up & Initialize VanillaTilt
    gsap.fromTo('.project-card', 
        { y: 100, opacity: 0 },
        {
            scrollTrigger: { trigger: '.projects-section', start: 'top 80%' },
            y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out',
            onComplete: () => {
                VanillaTilt.init(document.querySelectorAll('.project-card'), {
                    max: 10, speed: 400, glare: true, "max-glare": 0.2, scale: 1.02
                });
            }
        }
    );

    // Important: Refresh ScrollTrigger after dynamic content is added
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
}

async function fetchSkills() {
    try {
        const response = await fetch('/api/skills');
        const skills = await response.json();
        
        const container = document.getElementById('skills-container');
        container.innerHTML = '';
        
        skills.forEach(skill => {
            const el = document.createElement('div');
            el.className = 'skill-tag';
            el.innerHTML = `
                <span>${skill.name}</span>
                <span class="skill-level">${skill.proficiency}%</span>
            `;
            container.appendChild(el);
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
}

async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = '';
        
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const techStackHtml = project.tech_stack
                .map(tech => `<span class="tech-badge">${tech}</span>`)
                .join('');
                
            card.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="${project.image_url}" alt="${project.title}" class="project-img" loading="lazy">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="tech-stack">
                        ${techStackHtml}
                    </div>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-link">
                        View Project <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}
