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