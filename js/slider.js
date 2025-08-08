const slider = document.getElementById('slider');
const btnIzq = document.getElementById('btn-izq');
const btnDer = document.getElementById('btn-der');

const visibleSlides = 3;
const totalSlides = slider.children.length;

let index = visibleSlides;
let isTransitioning = false;

// Función para obtener el ancho actual de cada slide
function getSlideWidth() {
  return slider.offsetWidth / visibleSlides;
}

// Posicionamiento inicial
slider.style.transform = `translateX(-${index * getSlideWidth()}px)`;

// Función para mover el carrusel
function moverSlider(direccion) {
  if (isTransitioning) return;
  isTransitioning = true;

  index += direccion;

  slider.style.transition = 'transform 0.5s ease';
  slider.style.transform = `translateX(-${index * getSlideWidth()}px)`;

  slider.addEventListener('transitionend', () => {
    if (index >= totalSlides - visibleSlides) {
      index = visibleSlides;
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    }
    if (index <= 0) {
      index = totalSlides - visibleSlides * 2;
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    }
    isTransitioning = false;
  }, { once: true });
}

// Botones
btnDer.addEventListener('click', () => moverSlider(1));
btnIzq.addEventListener('click', () => moverSlider(-1));

// Reajustar al redimensionar la pantalla
window.addEventListener('resize', () => {
  slider.style.transition = 'none';
  slider.style.transform = `translateX(-${index * getSlideWidth()}px)`;
});

// Movimiento automático (opcional)
setInterval(() => moverSlider(1), 5000);