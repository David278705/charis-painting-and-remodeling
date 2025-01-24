window.addEventListener("DOMContentLoaded", () => {
  // Selección de elementos
  const preloader = document.getElementById("preloader");
  const heroImage = document.querySelector(".hero-image");
  const mainHeader = document.getElementById("mainHeader");
  const headerLogo = document.getElementById("headerLogo");
  const pageWrapper = document.getElementById("pageWrapper");
  const mobileNav = document.getElementById("mobileNav");
  const menuBtn = document.getElementById("menuBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  // Calculamos la altura del hero para saber cuándo el header deja de estar "on-hero"
  let heroSection = document.getElementById("hero");
  let heroHeight = heroSection.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // e.preventDefault();
      closeMenuBtn.click();
      // document.querySelector(this.getAttribute("href")).scrollIntoView({
      //   behavior: "smooth",
      // });
    });
  });

  // 1) Quitar preloader y activar zoom del hero
  setTimeout(() => {
    onScroll();
  }, 500);

  setTimeout(() => {
    preloader.style.display = "none";
  }, 2000);

  setTimeout(() => {
    heroImage.classList.add("hero-loaded");
  }, 1000);

  // 2) Mostrar/ocultar header según scroll direction
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    onScroll();
  });

  function onScroll() {
    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // -- (A) Determinar si el header debe estar en modo "sobre hero" o no --
    if (currentScroll < heroHeight - 500) {
      // Sobre el hero -> Cambiamos a "on-hero"
      mainHeader.classList.add("on-hero", "bg-transparent");
      // Logo se vuelve blanco con filtro
      headerLogo.classList.add("logo-white");
      mainHeader.classList.remove("bg-white-transparent");
    } else {
      // Fuera del hero
      mainHeader.classList.remove("on-hero");
      headerLogo.classList.remove("logo-white");
      mainHeader.classList.add("bg-white-transparent");
    }

    // -- (B) Hide on scroll down, show on scroll up --
    if (currentScroll > lastScrollTop) {
      // Scroll down -> oculta
      mainHeader.classList.add("-translate-y-full");
    } else {
      // Scroll up -> muestra
      mainHeader.classList.remove("-translate-y-full");
    }

    // Actualizar último scroll
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  // 3) Abrir menú (empujando la página a la izquierda)
  menuBtn.addEventListener("click", () => {
    pageWrapper.style.transform = "translateX(-50%)";
    mobileNav.style.transform = "translateX(0)";
  });

  // 4) Cerrar menú (regresa la página a su posición)
  closeMenuBtn.addEventListener("click", () => {
    pageWrapper.style.transform = "translateX(0)";
    mobileNav.style.transform = "translateX(100%)";
    pageWrapper.style.transform = "none";
  });

  // ======== LÓGICA DEL CARRUSEL DE TESTIMONIOS ========
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const totalSlides = slides.length; // 3
  let currentSlide = 0;

  // Al iniciar, configuramos la posición
  updateCarousel();

  function updateCarousel() {
    // Quitamos todas las clases "slide-left", "slide-center", "slide-right"
    slides.forEach((slide) => {
      slide.classList.remove("slide-left", "slide-center", "slide-right");
    });

    // Asigna center al actual
    slides[currentSlide].classList.add("slide-center");

    // right => (currentSlide + 1) % totalSlides
    const rightIndex = (currentSlide + 1) % totalSlides;
    slides[rightIndex].classList.add("slide-right");

    // left => (currentSlide + totalSlides - 1) % totalSlides
    const leftIndex = (currentSlide + totalSlides - 1) % totalSlides;
    slides[leftIndex].classList.add("slide-left");
  }

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + totalSlides - 1) % totalSlides;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });

  // ======== 5) Detectar clic en enlaces que deben disparar el preloader ========
  //  Utiliza el selector que prefieras. EJEMPLO: Enlaces con clase "preloader-link"
  //  <a href="#" class="text-2xl font-semibold text-white preloader-link">Contact</a>
  const preloaderLinks = document.querySelectorAll("a.preloader-link");

  preloaderLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Evita el comportamiento normal si es "#"
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
      }

      // Relanzamos el preloader por 1s
      relaunchPreloader();
    });
  });

  function relaunchPreloader() {
    // MOSTRAR el preloader otra vez
    preloader.style.display = "flex";
    // Volvemos a poner su transform original (por si quedó con -100%)
    preloader.style.transform = "translateY(0)";

    // Luego de un pequeño delay, añadimos la animación "removePaint" si la usas en CSS
    // o simplemente puedes usar un setTimeout para ocultarlo:
    setTimeout(() => {
      // Ocultamos el preloader otra vez
      preloader.style.transform = "translateY(-100%)";
    }, 50);

    // Después de 1s (lo que dura la animación removePaint), lo quitamos del DOM
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1050);
  }
});
