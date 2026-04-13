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
    
    // START YOUTUBE MUSIC - FIXED
    initYouTubeMusic();
}

// 2. YOUTUBE MUSIC - KADO TERINDAH (detik 20+) **SEKARANG LENGKAP!**
function initYouTubeMusic() {
    // Cek apakah YouTube API sudah loaded
    if (typeof YT !== 'undefined' && YT.loaded) {
        initYouTubePlayer();
        return;
    }
    
    // LOAD YOUTUBE API jika belum ada
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(tag, firstScript);
    
    // Set global callback untuk API ready
    window.onYouTubeIframeAPIReady = function() {
        initYouTubePlayer();
    };
}

// Initialize YouTube Player **LENGKAP**
function initYouTubePlayer() {
    ytPlayer = new YT.Player('ytPlayer', {
        events: {
            'onReady': function(event) {
                playerReady = true;
                console.log('🎁 YouTube Player Ready!');
                
                // Mulai dari detik 20 (bagian romantis)
                event.target.seekTo(20, true);
                event.target.setVolume(30); // 30% volume
                event.target.playVideo();
                
                // Update UI
                isMusicPlaying = true;
                const btn = document.getElementById('musicControl');
                if (btn) {
                    btn.classList.add('playing');
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-pause';
                }
                console.log('🎵 Kado Terindah started from 20s! ❤️');
            },
            'onStateChange': function(event) {
                const btn = document.getElementById('musicControl');
                const icon = btn ? btn.querySelector('i') : null;
                
                if (event.data == YT.PlayerState.ENDED) {
                    // Loop dari detik 20
                    setTimeout(() => {
                        if (ytPlayer) {
                            ytPlayer.seekTo(20, true);
                            ytPlayer.playVideo();
                        }
                    }, 1000);
                }
                
                // Update button state
                if (event.data == YT.PlayerState.PLAYING) {
                    isMusicPlaying = true;
                    if (btn) btn.classList.add('playing');
                    if (btn && icon) icon.className = 'fas fa-pause';
                } else if (event.data == YT.PlayerState.PAUSED) {
                    isMusicPlaying = false;
                    if (btn) {
                        btn.classList.remove('playing');
                        btn.classList.add('paused');
                    }
                    if (icon) icon.className = 'fas fa-play';
                }
            },
            'onError': function(event) {
                console.log('YouTube Error:', event.data);
                // Fallback sound
                playFallbackSound();
            }
        }
    });
}

function togglePartyMusic() {
    if (!ytPlayer || !playerReady) {
        console.log('Player not ready');
        return;
    }
    
    const btn = document.getElementById('musicControl');
    const icon = btn ? btn.querySelector('i') : null;
    
    if (isMusicPlaying) {
        // PAUSE
        ytPlayer.pauseVideo();
        if (icon) icon.className = 'fas fa-play';
        if (btn) {
            btn.classList.remove('playing');
            btn.classList.add('paused');
        }
        isMusicPlaying = false;
    } else {
        // PLAY
        ytPlayer.playVideo();
        if (icon) icon.className = 'fas fa-pause';
        if (btn) {
            btn.classList.remove('paused');
            btn.classList.add('playing');
        }
        isMusicPlaying = true;
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