
document.addEventListener('DOMContentLoaded', () => {
    // Background Music Control
    const backgroundMusic = document.getElementById('background-music');

    // Attempt to play music. Browsers often block autoplay without user interaction.
    // We'll add a subtle hint later if needed, or rely on user interaction.
    const playMusic = () => {
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Music started playing automatically.');
            }).catch(error => {
                console.warn('Music autoplay blocked. User interaction required.', error);
                createMusicToggleButton(); // Create button if autoplay fails
            });
        }
    };
    playMusic(); // Try to play on load

    // Function to create a simple music toggle button if needed
    function createMusicToggleButton() {
        let toggleButton = document.getElementById('music-toggle-button');
        if (!toggleButton) { // Create only if it doesn't exist
            toggleButton = document.createElement('button');
            toggleButton.id = 'music-toggle-button';
            toggleButton.textContent = 'Play Music';
            toggleButton.style.cssText = 
            `position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background-color: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            color: var(--dark-text);
            cursor: pointer;
            z-index: 100;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.9em;`
            ;
            document.body.appendChild(toggleButton);
        }

        toggleButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                toggleButton.textContent = 'Pause Music';
            } else {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
                toggleButton.textContent = 'Play Music';
            }
        });
    }


    // Photo Slideshow
    const slideshowImages = document.querySelectorAll('.slideshow-image');
    let slideIndex = 0; // Renamed from currentSlide for clarity with plusSlides
    let slideshowInterval; // To store the interval ID for clearing

    // Function to show a specific slide
    const showSlides = (n) => {
        // Reset slideIndex if it goes out of bounds
        if (n >= slideshowImages.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slideshowImages.length - 1; }

        slideshowImages.forEach((image, i) => {
            image.classList.remove('active'); // Hide all slides
        });
        slideshowImages[slideIndex].classList.add('active'); // Show the current slide
    };

    // Function for manual navigation (prev/next buttons)
    window.plusSlides = (n) => {
        clearInterval(slideshowInterval); // Clear auto-advance when user interacts
        slideIndex += n; // Update slideIndex based on n (-1 for prev, 1 for next)
        showSlides(slideIndex);
        // Restart auto-advance after a short delay
        slideshowInterval = setInterval(() => showSlides(++slideIndex), 5000);
    };

    // Auto-advance function
    const autoAdvanceSlides = () => {
        showSlides(++slideIndex); // Increment and show next slide
    };

    // Initialize slideshow and start auto-advance
    if (slideshowImages.length > 0) {
        showSlides(slideIndex); // Show the first slide
        slideshowInterval = setInterval(autoAdvanceSlides, 5000); // Auto-advance every 5 seconds
    }


    // Floating Elements (Balloons, Sparkles, Confetti)


const floatingElementsContainer = document.querySelector('.floating-elements');
    const balloonColors = ['var(--pink)', 'var(--lavender)', 'var(--baby-blue)', 'var(--peach)'];
    const confettiColors = ['var(--pink)', 'var(--lavender)', 'var(--baby-blue)', 'var(--peach)', '#ffe0b2', '#c8e6c9']; // More confetti colors

    const createFloatingElement = (type) => {
        const element = document.createElement('div');
        element.classList.add('floating-element', type);

        // Random starting position (off-screen bottom)
        const startX = Math.random() * 100; // 0-100% width
        element.style.left =` ${startX}vw`;
        element.style.bottom = `-100px`; // Start below viewport

        // Apply a random horizontal animation offset (drift)
        element.style.setProperty('--rand-x', (Math.random() * 400 - 200).toFixed(0)); // -200 to 200px horizontal drift

        // Random animation duration and delay for staggered effect
        const animationDuration = 10 + Math.random() * 10; // 10-20 seconds
        const animationDelay = Math.random() * 5; // 0-5 seconds delay
        element.style.animationDuration = `${animationDuration}s`;
        element.style.animationDelay = `${animationDelay}s`;
        element.style.animationIterationCount = 'infinite'; // Loop indefinitely

        if (type === 'balloon') {
            element.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            element.style.width = `${40 + Math.random() * 30}px`; // Vary size (40px to 70px)
            element.style.height = `${element.offsetWidth * 1.4}px`; // Maintain aspect ratio
        } else if (type === 'sparkle') {
            element.style.width = `${5 + Math.random() * 5}px`; // 5px to 10px
            element.style.height = element.style.width;
            element.style.animationDuration = `${2 + Math.random() * 3}s`; // Faster sparkle fade (2-5 seconds)
        } else if (type === 'confetti') {
            element.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            element.style.width = `${5 + Math.random() * 7}px`; // 5px to 12px
            element.style.height = element.style.width;
            element.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'; // Square or circle confetti
            element.style.animationName = 'fallAndFade'; // Use specific confetti animation
            element.style.animationDuration = `${5 + Math.random() * 5}s`; // 5-10 seconds fall time
            element.style.animationDelay = `${Math.random() * 3}s`; // 0-3 seconds delay
        }

        floatingElementsContainer.appendChild(element);

        // Remove element after it goes off-screen to prevent DOM bloat
        // and recreate it to maintain a constant number of floating items
        element.addEventListener('animationend', () => {
            if (element.parentNode === floatingElementsContainer) {
                element.remove();
                if (type === 'balloon') createFloatingElement('balloon');
                else if (type === 'sparkle') createFloatingElement('sparkle');
                else if (type === 'confetti') createFloatingElement('confetti');
            }
        });
    };

    // Generate a good number of floating elements
    const numBalloons = 8;
    const numSparkles = 25;
    const numConfetti = 30; // More confetti for a festive feel

    for (let i = 0; i < numBalloons; i++) {
        createFloatingElement('balloon');
    }
    for (let i = 0; i < numSparkles; i++) {
        createFloatingElement('sparkle');
    }
    for (let i = 0; i < numConfetti; i++) {
        createFloatingElement('confetti');
    }
});

// 🎆 Center blast explosion effect
function blastEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 200 + 100;
      const x = Math.cos(angle) * distance + 'px';
      const y = Math.sin(angle) * distance + 'px';

      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.setProperty('--x', x);
      particle.style.setProperty('--y', y);
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 70%)`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1200);
    }
  }


  // 🌟 On page load
  window.onload = function () {
    blastEffect();
  }

   // Confetti
//    const canvas = document.getElementById('confetti');
//    const ctx = canvas.getContext('2d');
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;

//    const confetti = [];
//    for (let i = 0; i < 300; i++) {
//      confetti.push({
//        x: Math.random() * canvas.width,
//        y: Math.random() * canvas.height - canvas.height,
//        r: Math.random() * 6 + 2,
//        d: Math.random() * 5 + 2,
//        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
//        tilt: Math.random() * 10 - 5
//      });
//    }

//    function drawConfetti() {
//      ctx.clearRect(0, 0, canvas.width, canvas.height);
//      confetti.forEach(p => {
//        ctx.beginPath();
//        ctx.fillStyle = p.color;
//        ctx.fillRect(p.x + p.tilt, p.y, p.r, p.r * 0.6);
//        p.y += p.d;
//        p.tilt += Math.random() - 0.5;

//        if (p.y > canvas.height) {
//          p.y = -20;
//          p.x = Math.random() * canvas.width;
//        }
//      });
//      requestAnimationFrame(drawConfetti);
//    }

//    drawConfetti();




    // Confetti burst in 1 second
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    let allowNewConfetti = true;

    function createConfettiParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        tilt: Math.random() * 10 - 5
      };
    }

    // Initial burst
    for (let i = 0; i < 500; i++) {
      confetti.push(createConfettiParticle());
    }

    // Stop adding new confetti after 1 second
    setTimeout(() => {
      allowNewConfetti = false;
    }, 1000);

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x + p.tilt, p.y, p.r, p.r * 0.6);
        p.y += p.d;
        p.tilt += Math.random() - 0.5;
      });

      // Remove confetti that have left the screen
      for (let i = confetti.length - 1; i >= 0; i--) {
        if (confetti[i].y > canvas.height + 20) {
          confetti.splice(i, 1);
        }
      }

      requestAnimationFrame(drawConfetti);
    }

    drawConfetti();



    // Candles Blowing
    const candleImg = document.getElementById("candleImg");
    const bgMusic = document.getElementById("bgMusic");
    let isBlown = false;

    candleImg.addEventListener("click", () => {
      if (!isBlown) {
        candleImg.src = "./assets/candOf2.webp";  // swap to blown candle image
        bgMusic.play();                      // play music
        isBlown = true;
      } else {
        candleImg.src = "./assets/LitCandles.jpeg";
        bgMusic.pause();
        bgMusic.currentTime = 0; // Reset music
        isBlown = false;
      }
    });



    // // Balloons
    // // const balloonImages = [
    // //     'assets/balloon.png',
    // //     'assets/balloon1.png',
    // //     'assets/balloon4.png',
    // //     'assets/balloon3.png'
    // //   ];
  
    // //   for (let i = 0; i < 25; i++) {
    // //     const balloon = document.createElement('div');
    // //     balloon.classList.add('balloon');
  
    // //     // Random position, speed, and size
    // //     const left = Math.random() * 100;
    // //     const duration = 4 + Math.random() * 4;
    // //     const size = 40 + Math.random() * 60;
  
    // //     balloon.style.left = `${left}vw`;
    // //     balloon.style.width = `${size}px`;
    // //     balloon.style.animationDuration = `${duration}s`;
  
    // //     // Random balloon image
    // //     const img = document.createElement('img');
    // //     img.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
    // //     img.alt = 'Balloon';
  
    // //     balloon.appendChild(img);
    // //     document.body.appendChild(balloon);
    // //   }



    // // Balloons
    // const balloonImages = [
    //     'assets/balloon3.png',
    //     'assets/balloon4.png',
    //     'assets/balloon3.png',
    //     'assets/balloon4.png'
    //   ];
  
    //   const numBalloons = 10;
    //   const balloons = [];
    //   const startY = window.innerHeight * 0.3;
  
    //   // Create balloons and place them at 30% height
    //   for (let i = 0; i < numBalloons; i++) {
    //     const balloon = document.createElement('div');
    //     balloon.classList.add('balloon');
  
    //     const size = 40 + Math.random() * 60;
    //     const left = Math.random() * (window.innerWidth - size);
    //     const y = startY;
  
    //     balloon.style.width = `${size}px`;
    //     balloon.style.left = `${left}px`;
    //     balloon.style.top = `${y}px`;
  
    //     const img = document.createElement('img');
    //     img.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
    //     img.alt = 'Balloon';
  
    //     balloon.appendChild(img);
    //     document.body.appendChild(balloon);
    //     balloons.push({ el: balloon, y: y, speed: Math.random() * 8 });
    //   }
  
    //   // Animate balloons upward for 1 second
    //   function animateBalloons() {
    //     const start = performance.now();
    //     function frame(now) {
    //       const elapsed = now - start;
    //       if (elapsed > 5000) {
    //         // End: fade out balloons
    //         balloons.forEach(b => {
    //           b.el.style.opacity = 0;
    //           setTimeout(() => b.el.remove(), 3000);
    //         });
    //         return;
    //       }
    //       balloons.forEach(b => {
    //         b.y -= b.speed;
    //         b.el.style.top = `${b.y}px`;
    //       });
    //       requestAnimationFrame(frame);
    //     }
    //     requestAnimationFrame(frame);
    //   }
  
    //   animateBalloons();
  
  