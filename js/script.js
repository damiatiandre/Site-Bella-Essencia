// Menu Mobile
const toggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
toggle.addEventListener("click", () => navList.classList.toggle("active"));

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
    navList.classList.remove("active");
    });
});

// Carrossel Aprimorado
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("carouselDots");
const items = document.querySelectorAll(".carousel-item");

let currentIndex = 0;
const itemCount = items.length;

// Criar dots de navegação
items.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
    goToSlide(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Função para atualizar o carrossel
function updateCarousel() {
    const width = track.clientWidth;
  track.style.transform = `translateX(${-currentIndex * width}px)`;

  // Atualizar dots ativos
    dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
    });
}

// Função para ir para um slide específico
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Event listeners para os botões
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Auto-play (opcional)
let autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}, 5000);

// Pausar auto-play quando o mouse estiver sobre o carrossel
track.addEventListener("mouseenter", () => {
    clearInterval(autoPlayInterval);
});

track.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
    updateCarousel();
    }, 5000);
});

// Atualizar ao redimensionar a janela
window.addEventListener("resize", updateCarousel);

// Inicializar
updateCarousel();

// Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
    });
    });
});

// Efeito de digitação no título (opcional)
const typeEffect = () => {
    const title = document.querySelector('.about-content h2');
    const text = "Nossa História";
    let i = 0;
    
const typing = setInterval(() => {
    if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
    } else {
        clearInterval(typing);

    }
    }, 100);
};

window.addEventListener('load', typeEffect);

// Formulário moderno com feedback visual
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', async (e) => {
e.preventDefault();
  
  // Reset feedback
feedback.textContent = '';
feedback.style.backgroundColor = 'transparent';

try {
    const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
        feedback.textContent = '✅ Mensagem enviada com sucesso! Em breve retornaremos.';
        feedback.style.color = '#40E0D0';
        form.reset();
    } else {
        throw new Error('Erro no servidor');
    }
} catch (error) {
    feedback.textContent = '❌ Ocorreu um erro. Por favor, tente novamente mais tarde.';
    feedback.style.color = '#ff6b6b';
    console.error('Erro:', error);
}
});