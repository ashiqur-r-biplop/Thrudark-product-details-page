let cursor = document.querySelector(".productImgCursor");
let cursorScale = document.querySelectorAll(".cursor-scale");
let prdGallery = document.querySelector(".prd-Gallery");
let mouseX = 0;
let mouseY = 0;

// Make sure the cursor is a child of the container
prdGallery.appendChild(cursor);

// Update the cursor position within the container
prdGallery.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - prdGallery.getBoundingClientRect().left;
  mouseY = e.clientY - prdGallery.getBoundingClientRect().top;
  cursor.style.opacity = 1; // Show cursor when moving inside the container
  cursor.style.transitionDelay = 1;
});

prdGallery.addEventListener("mouseenter", () => {
  cursor.style.opacity = 1; // Show cursor when entering the container
});

prdGallery.addEventListener("mouseleave", () => {
  cursor.style.opacity = 0; // Hide cursor when leaving the container
});

gsap.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

cursorScale.forEach((link) => {
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow");
    if (link.classList.contains("small")) {
      cursor.classList.remove("grow");
      cursor.classList.add("grow-small");
    }
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
    cursor.classList.remove("grow-small");
  });
});

// Product img change
// Select all the thumbnail buttons
const thumbnailButtons = document.querySelectorAll(".prd-Thumbnails_Item");
const mainImage = document.getElementById("main-image");
let mainImageSrc = mainImage.src;

thumbnailButtons.forEach((button) => {
  const newImgSrc = button.getAttribute("data-img");
  const borderElements = button.querySelectorAll(
    ".shop-card-left-top-border, .shop-card-right-top-border, .shop-card-left-bottom-border, .shop-card-right-bottom-border"
  );

  // Check if the current main image src matches this button's data-img
  if (mainImageSrc === newImgSrc) {
    borderElements.forEach((element) => {
      element.classList.add("display-block");
    });
  } else {
    button.style.background = ""; // Set button background to default
  }
});

// Add click event listener to each button
thumbnailButtons.forEach((button) => {
  const borderElements = button.querySelectorAll(
    ".shop-card-left-top-border, .shop-card-right-top-border, .shop-card-left-bottom-border, .shop-card-right-bottom-border"
  );

  button.addEventListener("click", function () {
    thumbnailButtons.forEach((btn) => {
      const allBorderElements = btn.querySelectorAll(
        ".shop-card-left-top-border, .shop-card-right-top-border, .shop-card-left-bottom-border, .shop-card-right-bottom-border"
      );
      allBorderElements.forEach((element) => {
        element.classList.remove("display-block");
      });
    });

    // Get the data-img attribute of the clicked button
    const newImgSrc = button.getAttribute("data-img");

    // Update the main image src and srcset attributes
    mainImageSrc = newImgSrc;

    if (newImgSrc === mainImageSrc) {
      // button.style.background = "#7b7356";

      // Add the class to each element
      borderElements.forEach((element) => {
        element.classList.add("display-block");
      });
    }

    mainImage.srcset = `
      ${newImgSrc.replace("_900x", "_900x")} 900w,
      ${newImgSrc.replace("_900x", "_720x")} 720w,
      ${newImgSrc.replace("_900x", "_540x")} 540w,
      ${newImgSrc.replace("_900x", "_360x")} 360w,
      ${newImgSrc.replace("_900x", "_180x")} 180w
    `;
  });
});

// *** Fullscreen Image ***
// Select the main image container and full screen elements
const galleryImage = document.querySelector(".prd-Gallery_Image");
const fullscreenImg = document.getElementById("fullscreen-img");
const fullscreenImgContent = document.getElementById("fullscreen-img-content");
const closeBtn = document.getElementById("close-btn");

// Add click event listener to the main image container
galleryImage.addEventListener("click", function () {
  fullscreenImgContent.src = mainImageSrc;
  fullscreenImg.style.display = "block";

  // Disable scroll on body
  document.body.style.overflow = "hidden";
});
// Add click event listener to the close button
closeBtn.addEventListener("click", function () {
  fullscreenImg.style.display = "none";

  // Enable scroll on body
  document.body.style.overflow = "auto";
});

// *** Fullscreen cart sidebar ***
// Select the main image container and full screen elements
const addToCartBtn = document.getElementById("addToCartBtn");
const cartSidebar = document.getElementById("cart-sidebar");
const cartSidebarCloseBtn = document.getElementById("cart-sidebar-close-btn");

// Add click event listener to the main image container
addToCartBtn.addEventListener("click", function () {
  cartSidebar.style.display = "block";

  // Disable scroll on body
  document.body.style.overflow = "hidden";
});
// Add click event listener to the close button
cartSidebarCloseBtn.addEventListener("click", function () {
  cartSidebar.style.display = "none";

  // Enable scroll on body
  document.body.style.overflow = "auto";
});

// *** Fullscreen description sidebar ***
// Select the main image container and full screen elements
const descriptionBtn = document.getElementById("descriptionBtn");
const descriptionSidebar = document.getElementById("description-sidebar");
const descriptionSidebarCloseBtn = document.getElementById(
  "description-sidebar-close-btn"
);

// Add click event listener to the main image container
descriptionBtn.addEventListener("click", function () {
  descriptionSidebar.style.display = "block";

  // Disable scroll on body
  document.body.style.overflow = "hidden";
});
// Add click event listener to the close button
descriptionSidebarCloseBtn.addEventListener("click", function () {
  descriptionSidebar.style.display = "none";

  // Enable scroll on body
  document.body.style.overflow = "auto";
});

// Swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  slidesPerView: 3, // Default value
  spaceBetween: 30, // Default value

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 1024px
    //   1024: {
    //     slidesPerView: 4,
    //     spaceBetween: 40
    //   }
  },
  on: {
    init: function () {
      addSVGToActiveBullet(this);
    },
    slideChange: function () {
      addSVGToActiveBullet(this);
    },
  },
});

//   Generate SVG for for active bullet
function addSVGToActiveBullet(swiper) {
  // Remove existing SVGs to avoid duplicates
  document.querySelectorAll(".active-svg").forEach((el) => el.remove());

  const activeBullet = document.querySelector(
    ".swiper-pagination-bullet-active"
  );
  if (activeBullet) {
    const svgHTML = `
        <svg class="active-svg" viewBox="0 0 10 8" width="12" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.4641 7.5L8.89711 6.75L5.43301 0.75H4.56699L1.10289 6.75L1.5359 7.5H8.4641Z" stroke="#F4F4F4" stroke-linejoin="bevel"></path>
        </svg>
      `;
    activeBullet.insertAdjacentHTML("beforeend", svgHTML);
  }
}

let clientX = -100;
let clientY = -100;
let lastX = -100;
let lastY = -100;
const productCarouselCursor = document.querySelector(".productCarouselCursor");
const productCarousel = document.querySelector(".product-carousel");

// Show/hide the cursor when it is over the productCarousel
if (productCarousel) {
  productCarousel.addEventListener("mouseenter", () => {
    productCarouselCursor.classList.add("visible");
  });

  productCarousel.addEventListener("mouseleave", () => {
    productCarouselCursor.classList.remove("visible");
  });
}

// function for linear interpolation of values
const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

const initCursor = () => {
  if (!productCarouselCursor) return;

  // add listener to track the current mouse position
  document.addEventListener("mousemove", (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  // transform the cursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    // lesser delta, greater the delay that the custom cursor follows the real cursor
    const delta = 0.1;
    lastX = lerp(lastX, clientX, delta);
    lastY = lerp(lastY, clientY, delta);

    productCarouselCursor.style.transform = `translate(${lastX}px, ${lastY}px)`;

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

initCursor();

//  *** Fullscreen carousel img ***
// Select the main image container and full screen elements
const swiperSlides = document.querySelectorAll(".swiper-slide");
const fullscreenCarousel = document.getElementById("fullscreen-carousel");
const fullscreenCarouselImgContent = document.getElementById(
  "fullscreen-carousel-img-content"
);
const fullScreenCarouselCloseBtn = document.getElementById(
  "fullscreen-carousel-close-btn"
);

// Add click event listener to the main image container
swiperSlides.forEach((slide) => {
  const carouselImgSrc = slide.getAttribute("data-img");
  slide.addEventListener("click", function () {
    fullscreenCarouselImgContent.src = carouselImgSrc;
    fullscreenCarousel.style.display = "block";
    fullscreenCarousel.style.zIndex = "9999999999999";

    // Disable scroll on body
    document.body.style.overflow = "hidden";
  });
});

// Add click event listener to the close button
fullScreenCarouselCloseBtn.addEventListener("click", function () {
  fullscreenCarousel.style.display = "none";

  // Enable scroll on body
  document.body.style.overflow = "auto";
});

// scroll and action active tab functionally
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".detail-top-bar a");
  const offset = document.querySelector(".sticky-top").offsetHeight;

  let isScrolling = false;

  function setActiveLink() {
    if (isScrolling) return;

    let index = sections.length;

    while (--index && window.scrollY + offset < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    if (index >= 0) {
      const id = sections[index].id;
      const activeLink = document.querySelector(
        `.detail-top-bar a[href="#${id}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }

  function handleNavLinkClick(event) {
    navLinks.forEach((link) => link.classList.remove("active"));
    event.target.classList.add("active");

    isScrolling = true;

    // Scroll to the section smoothly
    const targetId = event.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: "smooth",
      });
    }
    event.preventDefault();
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);
});

// tabs
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabImages = document.querySelectorAll(".tab-conditional-image");
  const tabContents = document.querySelectorAll(".tab-conditional-table > div");

  function activateTab(index) {
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add("active");
        tabImages[i].classList.add("active");
        tabContents[i].classList.add("active");
      } else {
        tab.classList.remove("active");
        tabImages[i].classList.remove("active");
        tabContents[i].classList.remove("active");
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(index);
    });
  });

  // Set the second tab (index 1) as active by default
  activateTab(1);
});
// Keep track of the previously clicked button
let previousClickedButton = null;

// Select all the buttons
const buttons = document.querySelectorAll(".prd-Options_Button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (previousClickedButton) {
      const previousSpan = previousClickedButton.querySelector(
        ".prd-Options_Button-inner"
      );
      previousSpan.style.backgroundColor = "";
      previousSpan.style.color = "";
    }

    const currentSpan = button.querySelector(".prd-Options_Button-inner");
    currentSpan.style.backgroundColor = "white";
    currentSpan.style.color = "black";

    previousClickedButton = button;
  });
});
