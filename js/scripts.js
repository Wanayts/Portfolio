/*!
* Start Bootstrap - Business Frontpage v5.0.9 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => bar.style.width = width, 500);
    });
});

  // Counter animation 
  const counters = document.querySelectorAll('.counter');
  const speed = 50; // lower is faster

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const isPercent = counter.getAttribute('data-percent') === "true"; // check if % is needed
    let count = 0;

    const animate = () => {
      const increment = target / speed;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count) + (isPercent ? '%' : '');
        setTimeout(animate, 20);
      } else {
        counter.innerText = target + (isPercent ? '%' : '');
      }
    };
    animate();
  });

  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 15 },
      576: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 25 },
      992: { slidesPerView: 5, spaceBetween: 30 },
    }
  });

  const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};


// Scroll smoothly to top when clicked
scrollTopBtn.addEventListener("click", () => {
  // Add a “zoom” effect for fun
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(() => {
    scrollTopBtn.style.transform = "rotate(0deg) translateY(0)";
  }, 600);
});

  const testimonialsSwiper = new Swiper('.myTestimonials', {
    slidesPerView: 1,       // Show 1 testimonial at a time
    spaceBetween: 30,
    loop: true,             // Infinite loop
    autoplay: {
      delay: 4000,          // 4 seconds per slide
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 }, // Show 2 slides on medium screens
      992: { slidesPerView: 3 }, // Show 3 slides on large screens
    }
  });

  // Animate the progress bar when the section is in viewport
  const progressBar = document.getElementById('progress-bar-fill');
  const educationSection = document.getElementById('education');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  function animateProgress() {
    if(isInViewport(educationSection)) {
      progressBar.style.width = "100%"; // fill to full
      window.removeEventListener('scroll', animateProgress); // run once
    }
  }

  window.addEventListener('scroll', animateProgress);
  // trigger in case already in view
  animateProgress();
  

// ===== CONFIG =====
  const startDate = new Date("2025-11-27"); // 🔴 change to your OJT start
  const endDate = new Date(); // today

  const holidays = [
    "2025-11-30",
    "2025-12-25",
    "2026-01-01"
  ];

  // Count only Mon–Fri, excluding holidays
  function countOJTDays(start, end) {
    let count = 0;
    let current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      const dateStr = current.toISOString().split("T")[0];

      if (day !== 0 && day !== 6 && !holidays.includes(dateStr)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  }

  // Animate counter
  function animateCounter(element, target) {
    let current = 0;
    const speed = 60; // lower = faster

    const update = () => {
      const increment = Math.ceil(target / speed);
      current += increment;

      if (current >= target) {
        element.textContent = target;
      } else {
        element.textContent = current;
        requestAnimationFrame(update);
      }
    };
    update();
  }

  // Calculate + animate
  const totalOJTDays = countOJTDays(startDate, endDate);
  const ojtElement = document.getElementById("ojtDays");

  ojtElement.dataset.target = totalOJTDays;
  animateCounter(ojtElement, totalOJTDays);


  
const logo = document.getElementById('logo-hover');
const music = document.getElementById('hover-music');
let audioUnlocked = false;

// Set volume to 30%
music.volume = 0.1;

// Unlock audio on first click anywhere
document.body.addEventListener('click', () => {
  if (!audioUnlocked) {
    music.play().then(() => {
      music.pause(); // pause immediately after unlock
      audioUnlocked = true;
    }).catch(err => console.log(err));
  }
}, { once: true });

// Play music on hover (works after unlock)
logo.addEventListener('mouseenter', () => {
  if (audioUnlocked) music.play();
});

// Pause music on unhover
logo.addEventListener('mouseleave', () => {
  if (audioUnlocked) {
    music.pause();
    music.currentTime = 0;
  }
});

const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent page refresh

    // Collect form data as parameters
    const formData = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value
    };

    console.log("Form Data Submitted:", formData);

    // Here you can send formData to an API, email service, or server
    // Example: fetch('/submit', { method: 'POST', body: JSON.stringify(formData) })
  });