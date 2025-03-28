// Lenis smooth scroll
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

// Embla carousel 1
document.addEventListener("DOMContentLoaded", function () {
  const emblaNode = document.querySelector(".embla__viewport");
  const options = { loop: true, align: "start" };
  const embla = EmblaCarousel(emblaNode, options);
  const nextBtn = document.querySelector(".embla__next");
  nextBtn.addEventListener("click", () => embla.scrollNext());
});

// Embla carousel 2
document.addEventListener("DOMContentLoaded", function () {
  const emblaNode = document.querySelector(".another_embla");
  const options = { loop: true, align: "start" };
  const embla = EmblaCarousel(emblaNode, options);
  const nextBtn = document.querySelector(".another_next");
  nextBtn.addEventListener("click", () => embla.scrollNext());
});

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".read-more-toggle");
  const paragraph = document.querySelector(".description-paragraph");

  toggle.addEventListener("click", () => {
    paragraph.classList.toggle("expanded");
    toggle.textContent = paragraph.classList.contains("expanded") ? "Read less" : "Read more";
  });
});
