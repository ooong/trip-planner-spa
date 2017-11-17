// Carousel
let currentImageIndex = 0;

const carouselImages = document.querySelectorAll(".carousel-image");

const updateImg = () => {
  let img = carouselImages[currentImageIndex];
  img.classList.add("hidden");
  currentImageIndex++;
  if (currentImageIndex === carouselImages.length) currentImageIndex = 0;
  img = carouselImages[currentImageIndex];
  img.classList.remove("hidden");
};

setInterval(() => {
  updateImg();
}, 5000);

// Scroll based animations

let ticking = false;

// Cache elements
const header = document.getElementsByTagName("header")[0]; // We're interested in the first element
const sections = Array.from(document.querySelectorAll("section"));

// Activation Margins
const HEADER_MARGIN = 65;
const SECTION_MARGIN = 300;

const scrollActions = () => {
  // 1. Sets whether the header is visible or not
  if (window.scrollY > HEADER_MARGIN) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  // 2. Loops through carouselImages and assigns a value to style.transform
  carouselImages.forEach(image => {
    image.style.transform = `translateY(${window.scrollY / 3}px)`;
  });

  // 3. Loops through All sections, get their getBoundingClientRect() and sets them as "active" if they're visible
  // Cache `getBoundingClientRect` to avoid layout trashing (https://gist.github.com/collin/b857f20e7b0898264558ab55d0508336)
  const rects = sections.map(section => section.getBoundingClientRect());
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const rect = rects[i];

    if (rect.top < window.innerHeight - SECTION_MARGIN && rect.bottom > 0) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  }

  ticking = false;
};

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(scrollActions);
    ticking = true;
  }
});
scrollActions();
