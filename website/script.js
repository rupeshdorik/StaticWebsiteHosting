// ================================
// Smooth Scroll for Navigation
// ================================

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({

            behavior: 'smooth'

        });

    });

});

// ================================
// Deployment Button Alert
// ================================

const deployBtn = document.getElementById("deployBtn");

deployBtn.addEventListener("click", function () {

    alert("🎉 Website has been deployed successfully using Python SDK (boto3) and Amazon S3.");

});

// ================================
// Animated Statistics Counter
// ================================

const counters = document.querySelectorAll(".stat-card h2");

const speed = 100;

counters.forEach(counter => {

    const animate = () => {

        let value = counter.innerText;

        let target;

        if (value.includes("+")) {

            target = parseInt(value);

        }

        else if (value.includes("%")) {

            target = parseInt(value);

        }

        else if (value.includes("×")) {

            return;

        }

        else {

            target = parseInt(value);

        }

        let count = 0;

        const update = () => {

            count++;

            if (count < target) {

                if (value.includes("+")) {

                    counter.innerText = count + "+";

                }

                else if (value.includes("%")) {

                    counter.innerText = count + "%";

                }

                else {

                    counter.innerText = count;

                }

                requestAnimationFrame(update);

            }

            else {

                counter.innerText = value;

            }

        };

        update();

    };

    animate();

});

// ================================
// Fade-in Animation on Scroll
// ================================

const cards = document.querySelectorAll(

    ".about-card, .feature-card, .tech-card, .flow-box, .stat-card, .contact-card"

);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.2

});

cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(50px)";

    card.style.transition = "0.8s";

    observer.observe(card);

});

// ================================
// Back To Top Button
// ================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "25px";
topBtn.style.bottom = "25px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#ff9900";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 8px 20px rgba(0,0,0,.2)";
topBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});