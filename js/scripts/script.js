document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------------
    // Carrusel de Imágenes (Sección Principal)
    // ----------------------------------------------------------------------
    let slideIndex = 0;
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsImages = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        const slideWidth = slides[0].offsetWidth;
        const totalSlides = slides.length;

        function showSlides() {
            slideIndex = (slideIndex + 1) % totalSlides;
            carouselTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
            updateDots();
        }

        function updateDots() {
            dotsImages.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }

        setInterval(showSlides, 3000);
        updateDots();
    }

    // ----------------------------------------------------------------------
    // Manejo del Submenú
    // ----------------------------------------------------------------------
    document.querySelectorAll('.submenu > a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
            }
        });
    });

    // ----------------------------------------------------------------------
    // Manejo del Icono de Búsqueda
    // ----------------------------------------------------------------------
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchInput.focus();
        });
    }

    // ----------------------------------------------------------------------
    // Scroll Horizontal de la Sección de Juegos
    // ----------------------------------------------------------------------
    const juegosGrid = document.querySelector('.juegos-grid');
    const scrollAmount = 250;

    if (juegosGrid) {
        document.querySelector('.scroll-left')?.addEventListener('click', () => {
            juegosGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        document.querySelector('.scroll-right')?.addEventListener('click', () => {
            juegosGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------------------------
    // Activar el buscador solo en páginas específicas y buscar solo elementos de cada página
    // ----------------------------------------------------------------------
    if (searchInput && (window.location.pathname.includes("pagina-juegos") || 
    window.location.pathname.includes("consolas") || 
    window.location.pathname.includes("accesorios"))) {

    searchInput.addEventListener("input", function () {
    let filter = searchInput.value.toLowerCase();

    let elementos = [];
    if (window.location.pathname.includes("pagina-juegos")) {
    elementos = document.querySelectorAll(".juego"); 
    } else if (window.location.pathname.includes("consolas")) {
    elementos = document.querySelectorAll(".consola"); 
    } else if (window.location.pathname.includes("accesorios")) {
    elementos = document.querySelectorAll(".accesorio"); 
    }

    if (elementos.length === 0) {
    console.error("⚠️ No se encontraron elementos en esta página.");
    return;
    }

    elementos.forEach(elemento => {
    let title = elemento.querySelector("h3")?.textContent.toLowerCase() || "";
    elemento.style.display = title.includes(filter) ? "block" : "none";
    });
    });
    } else {
    console.warn("ℹ️ El buscador no está activo en esta página.");
    }
});
