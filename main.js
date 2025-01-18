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
    if (currentScroll < heroHeight) {
      // Sobre el hero -> Cambiamos a "on-hero"
      mainHeader.classList.add("on-hero", "bg-transparent");
      // Logo se vuelve blanco con filtro
      headerLogo.classList.add("logo-white");
      mainHeader.classList.remove("bg-white-transparent");
      // Fondo (ya es blanco, pero lo forzamos a transparente si deseas)
      // En este caso, lo dejamos como "blanco" para cumplir tu requerimiento
      // de "todo es blanco", y forzamos el color de links con on-hero.
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
    // Mueve el contenedor principal medio ancho a la izquierda
    pageWrapper.style.transform = "translateX(-50%)";

    // Mueve el menú hamburguesa a la vista (de translateX(100%) a 0)
    mobileNav.style.transform = "translateX(0)";
  });

  // 4) Cerrar menú (regresa la página a su posición)
  closeMenuBtn.addEventListener("click", () => {
    pageWrapper.style.transform = "translateX(0)";
    mobileNav.style.transform = "translateX(100%)";

    pageWrapper.style.transform = "none";
  });

  //   menuBtn.addEventListener("click", () => {
  //     pageWrapper.style.transform = "translateX(0)";
  //     mobileNav.style.transform = "translateX(100%)";
  //   });
});
