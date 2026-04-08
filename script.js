/* ============================================= */
/* SCRIPT — ALBERT DIGITAL PORTFOLIO             */
/* Full Experience: Loader, Cursor, Typing,      */
/* Horizontal Scroll, Magnetic Btns, Modal       */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ——— LOADING SCREEN ———
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('done');
        }, 1800);
    });
    // Fallback: if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => loader.classList.add('done'), 1800);
    }

    // ——— CUSTOM CURSOR ———
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    if (window.innerWidth > 968) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        });

        // Smooth follower
        const animateFollower = () => {
            followerX += (cursorX - followerX) * 0.12;
            followerY += (cursorY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effect on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, .portfolio__slide, .servico-card, .sobre__card, .depoimento-card, input, textarea, select');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                cursorFollower.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                cursorFollower.classList.remove('hovering');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }

    // ——— PROGRESS BAR ———
    const progressBar = document.getElementById('progressBar');
    const updateProgressBar = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgressBar, { passive: true });

    // ——— NAVBAR SCROLL ———
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ——— FLOATING PARTICLES ———
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroBg.appendChild(particlesContainer);

        const orb1 = document.createElement('div');
        orb1.className = 'hero__orb hero__orb--1';
        heroBg.appendChild(orb1);
        const orb2 = document.createElement('div');
        orb2.className = 'hero__orb hero__orb--2';
        heroBg.appendChild(orb2);

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ——— MOBILE MENU TOGGLE ———
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ——— TYPING EFFECT ———
    const typingEl = document.getElementById('typingText');
    const phrases = [
        'Transformo negócios com tecnologia.',
        'Sites que convertem visitantes em clientes.',
        'Robôs que atendem enquanto você dorme.',
        'Seu número nunca mais será banido.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Wait before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }
    // Start typing after loader
    setTimeout(typeEffect, 2000);

    // ——— SCROLL ANIMATIONS (IntersectionObserver) ———
    const animatedEls = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));

    // ——— MOUSE PARALLAX ON HERO ———
    const hero = document.querySelector('.hero');
    const heroGradient = document.querySelector('.hero__gradient');
    if (hero && heroGradient) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroGradient.style.transform = `translateX(calc(-50% + ${x * 40}px)) translateY(${y * 30}px)`;

            document.querySelectorAll('.hero__orb').forEach((orb, i) => {
                const speed = (i + 1) * 15;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // ——— BUTTON RIPPLE EFFECT ———
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // ——— MAGNETIC BUTTONS ———
    if (window.innerWidth > 968) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.4s ease';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'transform 0.15s ease-out';
            });
        });
    }

    // ——— 3D TILT ON CARDS ———
    document.querySelectorAll('.servico-card, .sobre__card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 12;
            const rotateY = (x - 0.5) * 12;
            card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.15s ease-out';
        });
    });

    // ——— COUNTER ANIMATION (Enhanced) ———
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2500; // Slower for more drama
                const start = performance.now();

                const animate = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    // easeOutExpo for dramatic effect
                    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    el.textContent = Math.floor(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = target;
                    }
                };

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    // ——— SMOOTH SCROLL ———
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ——— ACTIVE LINK HIGHLIGHT ———
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link:not(.navbar__link--cta)');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--primary-light)';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ——— PARALLAX ON SCROLL ———
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.section__tag').forEach(tag => {
            const rect = tag.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                tag.style.transform = `translateY(${(rect.top - window.innerHeight / 2) * 0.03}px)`;
            }
        });
    }, { passive: true });

    // ——— HORIZONTAL SCROLL PORTFOLIO (Drag) ———
    const track = document.getElementById('portfolioTrack');
    if (track) {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.parentElement.style.cursor = 'grabbing';
        });

        track.addEventListener('mouseleave', () => {
            isDragging = false;
            track.parentElement.style.cursor = 'grab';
        });

        track.addEventListener('mouseup', () => {
            isDragging = false;
            track.parentElement.style.cursor = 'grab';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });

        // Make the track natively scrollable
        track.style.overflowX = 'auto';
        track.style.scrollBehavior = 'smooth';
        track.style.scrollbarWidth = 'none'; // Firefox
        track.style.msOverflowStyle = 'none'; // IE

        // Touch support
        let touchStartX = 0;
        let touchScrollLeft = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = track.scrollLeft;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX;
            const walk = (touchStartX - x) * 1.5;
            track.scrollLeft = touchScrollLeft + walk;
        }, { passive: true });

        // Wheel scroll → horizontal scroll on portfolio
        track.parentElement.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                track.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }

    // ——— PORTFOLIO LIGHTBOX MODAL ———
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    const closeBtns = document.querySelectorAll('[data-modal-close]');

    const portfolioSlides = document.querySelectorAll('.portfolio__slide');

    // Open modal on click (but NOT on drag)
    let dragDistance = 0;
    let mouseDownX = 0;

    portfolioSlides.forEach(slide => {
        slide.addEventListener('mousedown', (e) => {
            mouseDownX = e.pageX;
        });

        slide.addEventListener('mouseup', (e) => {
            dragDistance = Math.abs(e.pageX - mouseDownX);
        });

        slide.addEventListener('click', (e) => {
            // Only open if it wasn't a drag
            if (dragDistance > 10) return;

            try {
                const projectData = JSON.parse(slide.getAttribute('data-project'));
                const isRich = slide.hasAttribute('data-project-rich');

                modalTitle.textContent = projectData.title;
                modalImg.src = projectData.img;

                if (isRich && projectData.richDesc) {
                    modalDesc.innerHTML = projectData.richDesc;
                } else {
                    modalDesc.textContent = projectData.desc || '';
                }

                if (projectData.link && projectData.link !== '#') {
                    modalLink.setAttribute('href', projectData.link);
                    modalLink.href = projectData.link; // Double insurance
                    modalLink.style.display = 'inline-flex';
                    const linkSpan = modalLink.querySelector('span');
                    if (linkSpan) {
                        linkSpan.textContent = projectData.linkText || 'Ver Projeto Ao Vivo';
                    }
                } else {
                    modalLink.style.display = 'none';
                    modalLink.href = '#';
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } catch (err) {
                console.error("Erro ao carregar dados do projeto:", err);
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ——— FORM HANDLING ———
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !telefone) {
            shakeButton();
            return;
        }

        const whatsappNumber = '55629993824952';

        const text = encodeURIComponent(
            `🌐 *Novo Lead do Portfólio!*\n\n` +
            `👤 *Nome:* ${nome}\n` +
            `📧 *E-mail:* ${email}\n` +
            `📱 *Telefone:* ${telefone}\n` +
            `📦 *Serviço:* ${servico || 'Não especificado'}\n` +
            `💬 *Mensagem:* ${mensagem || 'Sem mensagem'}`
        );

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;

        const btn = document.getElementById('submitBtn');
        btn.innerHTML = '<span>✓ Enviando...</span>';
        btn.style.background = '#22c55e';

        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            btn.innerHTML = '<span>Enviar Mensagem</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
            btn.style.background = '';
            form.reset();
        }, 800);
    });

    function shakeButton() {
        const btn = document.getElementById('submitBtn');
        btn.style.animation = 'shake 0.5s ease';
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        }, { once: true });
    }

    // ——— WHATSAPP FLOAT: Show after loader ———
    const waFloat = document.getElementById('whatsappFloat');
    waFloat.style.opacity = '0';
    waFloat.style.transform = 'scale(0)';
    waFloat.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
        waFloat.style.opacity = '1';
        waFloat.style.transform = 'scale(1)';
    }, 3000);

    // ——— BUILD ANIMATION: Service card list items reveal on scroll ———
    const serviceCards = document.querySelectorAll('.servico-card');
    const buildObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay so the card fade-up finishes first
                setTimeout(() => {
                    entry.target.classList.add('built');
                }, 200);
                buildObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    serviceCards.forEach(card => buildObserver.observe(card));

    // ——— PORTFOLIO SCROLL HINT: Hide after first interaction ———
    const scrollHint = document.querySelector('.portfolio__scroll-hint');
    if (scrollHint && track) {
        track.addEventListener('scroll', () => {
            if (track.scrollLeft > 50) {
                scrollHint.style.opacity = '0';
                scrollHint.style.transition = 'opacity 0.5s ease';
            }
        }, { once: true });
    }

});

/* Shake animation (injected via JS) */
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }
    /* Hide native scrollbar on portfolio track */
    .portfolio__track::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(style);
