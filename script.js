// GLOBAL VARIABLES
let ytPlayer = null;
let playerReady = false;
let currentPhoto = 1;
let totalPhotos = 7;
let isMusicPlaying = false;  // Fixed: ubah dari true ke false
let photoTimeout;

// 1. START BIRTHDAY (dari popup)
function startBirthday() {
    // Hide popup, show main content
    const popup = document.getElementById('birthdayPopup');
    const mainContainer = document.getElementById('mainContainer');
    const musicPlayer = document.getElementById('musicPlayer');
    
    if (popup) popup.style.display = 'none';
    if (mainContainer) mainContainer.classList.add('show');
    if (musicPlayer) musicPlayer.style.display = 'block';
    
    // Start effects
    createParticles();
    startFallingHearts();
    preloadPhotos();
    calculateDaysTogether();

    const audio = document.getElementById('partyMusic');
audio.currentTime = 20;
audio.play().catch(() => {});
    
   

    
}

function togglePartyMusic() {
    const audio = document.getElementById('partyMusic');
    const btn = document.getElementById('musicControl');
    const icon = btn.querySelector('i');

    if (!audio) {
        alert("Audio tidak ditemukan!");
        return;
    }

    if (audio.paused) {
        // pastikan mulai dari detik 20 setelah siap
        audio.addEventListener('loadedmetadata', () => {
            audio.currentTime = 20;
        }, { once: true });

        audio.play()
            .then(() => {
                icon.className = 'fas fa-pause';
                console.log("Lagu berhasil diputar");
            })
            .catch(err => {
                console.log("Error play:", err);
                alert("Browser blokir audio 😢 klik lagi ya");
            });

    } else {
        audio.pause();
        icon.className = 'fas fa-play';
    }
}

// Fallback sound jika YouTube error
function playFallbackSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
}

// 3. PARTICLES + HATI ROMANTIS
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    particlesContainer.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${Math.random() * 4 + 4}s;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: ${Math.random() > 0.5 ? '#ffd93d' : '#ff6b6b'};
        `;
        particlesContainer.appendChild(particle);
    }
}

function startFallingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖', '💕', '💗', '❤️', '💝'][Math.floor(Math.random() * 5)];
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -10%;
            font-size: ${Math.random() * 25 + 15}px;
            pointer-events: none;
            z-index: 50;
            animation: fall 5s linear forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

// 4. FOTO SLIDESHOW - AUTO + MANUAL
function showPhoto(n) {
    const photos = [
        'https://images.unsplash.com/photo-1516589178581-6cd7838b8e0d?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-b6b749e7148d?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517457373958-b7bdd458720e?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=400&fit=crop'
    ];
    
    const img = document.getElementById('slideImg');
    if (img) {
        img.src = photos[n-1];
        img.onerror = () => img.src = photos[0];
    }
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i + 1 === n);
    });
    currentPhoto = n;
    
    clearTimeout(photoTimeout);
    photoTimeout = setTimeout(() => nextPhoto(), 4500);
}

function nextPhoto() {
    currentPhoto = (currentPhoto % totalPhotos) + 1;
    showPhoto(currentPhoto);
}

// 5-8. [Fungsi lainnya tetap sama - showSurprise, calculateDaysTogether, dll]

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
    // Music control
    document.getElementById('musicControl')?.addEventListener('click', togglePartyMusic);
    
    // Start button
    document.querySelector('.btn-start')?.addEventListener('click', startBirthday);
    
    // Dot clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const index = Array.from(e.target.parentNode.children).indexOf(e.target) + 1;
            showPhoto(index);
        }
    });
    
    // Auto start slideshow
    setTimeout(() => showPhoto(1), 1500);
    
    console.log('🎉 Birthday JS Loaded Perfectly! ❤️');
});
