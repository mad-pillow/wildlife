const sliderLeftBtn = document.querySelector(".latest-articles__left-btn");
const sliderRightBtn = document.querySelector(".latest-articles__right-btn");
const sliderContainer = document.querySelectorAll(
  ".latest-articles__slider-container"
);
const sliderList = document.querySelector(".latest-articles__list");
const sliderItems = document.querySelectorAll(".latest-articles__item");
const sliderImages = document.querySelectorAll(".latest-articles__image");
let itemPosition = 0;
let widthOfSlider = parseInt(
  getComputedStyle(sliderContainer[0]).getPropertyValue("width")
);
let sliderItemMarginLeft = parseInt(
  getComputedStyle(sliderItems[1]).getPropertyValue("margin-left")
);
let widthOfSliderItem = parseInt(
  getComputedStyle(sliderItems[0]).getPropertyValue("width")
);
let sliderLength =
  sliderItems.length - parseInt(widthOfSlider / widthOfSliderItem);
let int = "undefined";

//=== Watch window size and adjust slider parameters

function setSlider() {
  widthOfSlider = parseInt(
    getComputedStyle(sliderContainer[0]).getPropertyValue("width")
  );
  widthOfSliderItem = parseInt(
    getComputedStyle(sliderItems[0]).getPropertyValue("width")
  );
  sliderItemMarginLeft = parseInt(
    getComputedStyle(sliderItems[1]).getPropertyValue("margin-left")
  );
  sliderLength =
    sliderItems.length - parseInt(widthOfSlider / widthOfSliderItem);
}

setSlider();

window.addEventListener("resize", setSlider);

//=== Handle slider with buttons

function sliderToLeft(shiftSize = widthOfSliderItem) {
  if (itemPosition < 0) {
    itemPosition++;
    sliderList.style.left =
      (shiftSize + sliderItemMarginLeft) * itemPosition + "px";
  }
}

function sliderToRight(shiftSize = widthOfSliderItem) {
  itemPosition--;
  if (itemPosition >= -1 * sliderLength) {
    sliderList.style.left =
      (shiftSize + sliderItemMarginLeft) * itemPosition + "px";
  } else {
    sliderList.style.left = 0 + "px";
    itemPosition = 0;
  }
}

sliderLeftBtn.addEventListener("click", () => {
  int = clearInterval(int);
  sliderToLeft(widthOfSliderItem);
});

sliderRightBtn.addEventListener("click", () => {
  int = clearInterval(int);
  sliderToRight(widthOfSliderItem);
});

function setSliderInterval(step = 2000) {
  if (typeof int == "undefined") {
    int = setInterval(sliderToRight, step);
  }
}

//=== Restart slider after stopping for manual handling

window.addEventListener("scroll", () => {
  setSliderInterval();
});

//=== Swipe slider with finger

let touchOnX1 = null;
let xShift = null;
let touchOnSliderLeft = 0;
let deltaShift = parseInt(sliderList.style.left);

function handleTouchOn(e) {
  touchOnX1 = e.touches[0].clientX;
  sliderList.style.transition = "none";
  deltaShift = parseInt(sliderList.style.left);
}

function handleTouchMove(e) {
  let touchOnX2 = e.touches[0].clientX;
  xShift = touchOnX2 - touchOnX1;
  sliderList.style.left = xShift + deltaShift + "px";
}

function handleTouchOff(e) {
  let touchOnX2 = e.changedTouches[0].clientX;
  xShift = touchOnX2 - touchOnX1;
  if (Math.abs(xShift) > window.innerWidth / 4) {
    if (xShift > 0) {
      sliderToLeft();
    } else {
      sliderToRight();
    }
  }

  sliderList.style.left =
    (widthOfSliderItem + sliderItemMarginLeft) * itemPosition + "px";
  sliderList.style.transition = "0.3s";
}

sliderItems.forEach((item) => {
  item.addEventListener("touchstart", (e) => {
    e.preventDefault();
    int = clearInterval(int);
    handleTouchOn(e);
  });

  item.addEventListener("touchmove", (e) => {
    e.preventDefault();
    int = clearInterval(int);
    handleTouchMove(e);
  });

  item.addEventListener("touchend", (e) => {
    handleTouchOff(e);
  });

  item.addEventListener("mouseover", (e) => {
    int = clearInterval(int);
  });

  item.addEventListener("mouseout", (e) => {
    setSliderInterval();
  });
});
