// Particles animation
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
    
    // Hitung hari bersama
    const startDate = new Date('2023-01-01'); // Ganti tanggal pacaran
    const today = new Date();
    const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('days-together').textContent = daysTogether;
}

// Mulai
createParticles();
let musicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (musicPlaying) {
        music.pause();
        btn.textContent = '🎵 Play Birthday Song';
        btn.classList.remove('playing');
        musicPlaying = false;
    } else {
        music.play();
        btn.textContent = '🎵 Stop Music';
        btn.classList.add('playing');
        musicPlaying = true;
    }
}
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (!music.src) {
        alert('Download birthday-song.mp3 dulu ya sayang! 💕');
        return;
    }
    
    if (music.paused) {
        music.play();
        btn.innerHTML = '⏸️ Stop Music';
    } else {
        music.pause();
        btn.innerHTML = '🎵 Play Love Song';
    }
}