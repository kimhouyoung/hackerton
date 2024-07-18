document.addEventListener("DOMContentLoaded", (event) => {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    const slider = document.querySelector(".slider");
    const slideWidth = slides[0].clientWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  setInterval(nextSlide, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("header");
  var originalHeight = header.offsetHeight;
  
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.left = "0";
      header.style.width = "100%";
      header.style.height = originalHeight + "px";
    } else {
      header.style.position = "relative";
      header.style.height = originalHeight + "px";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const textContainer = document.querySelector(".text-container");
  const session2 = document.querySelector(".session2");
  const h3Elements = document.querySelectorAll(".session2 h3");
  const text4 = document.querySelector("input");
  const text2 = document.querySelector(".text2");

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const session2Top = session2.offsetTop;
    const session2Height = session2.offsetHeight;

    if (
      scrollTop + windowHeight > session2Top &&
      scrollTop < session2Top + session2Height
    ) {
      textContainer.style.opacity = "1";
      textContainer.style.transform = "translate(-50%, -50%)"; 
      
      h3Elements.forEach((h3, index) => {
        h3.style.opacity = "1";
        h3.style.transform = "translateY(0)";
      });
    } else {
      textContainer.style.opacity = "0";
      textContainer.style.transform = "translate(-50%, -50%) translateY(50px)";

      h3Elements.forEach((h3) => {
        h3.style.opacity = "0";
        h3.style.transform = "translateY(50px)";
      });
    }
  }

  window.addEventListener("scroll", handleScroll);
});
