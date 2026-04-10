// Particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
        particlesContainer.appendChild(particle);
    }
}

// Surprise
function showSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
    document.querySelector('.btn-surprise').style.display = 'none';
}

// MUSIC FIXED ← INI YANG BARU
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (music.paused) {
        music.load();
        music.play().then(() => {
            btn.innerHTML = '⏸️ Stop Music';
        }).catch(e => {
            btn.innerHTML = '🎵 Allow → Click Again';
        });
    } else {
        music.pause();
        btn.innerHTML = '🎵 Play Birthday Song';
    }
}

createParticles();