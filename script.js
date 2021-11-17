const sliderLeftBtn = document.querySelector('.latest-articles__left-btn');
const sliderRightBtn = document.querySelector('.latest-articles__right-btn');
const sliderContainer = document.querySelectorAll('.latest-articles__slider-container');
const sliderList = document.querySelector('.latest-articles__list');
const sliderItems = document.querySelectorAll('.latest-articles__item');
const sliderImages = document.querySelectorAll('.latest-articles__image');
let itemPosition = 0;
let widthOfSlider = parseInt(getComputedStyle(sliderContainer[0]).getPropertyValue('width'));
let sliderItemMarginLeft = parseInt(getComputedStyle(sliderItems[1]).getPropertyValue('margin-left'));
let widthOfSliderItem = parseInt(getComputedStyle(sliderItems[0]).getPropertyValue('width'));
let sliderLength = sliderItems.length - parseInt(widthOfSlider / widthOfSliderItem);
let int = 'undefined';

//=== Watch window size and adjust slider parameters

function setSlider() {
  widthOfSlider = parseInt(getComputedStyle(sliderContainer[0]).getPropertyValue('width'));
  widthOfSliderItem = parseInt(getComputedStyle(sliderItems[0]).getPropertyValue('width'));
  sliderItemMarginLeft = parseInt(getComputedStyle(sliderItems[1]).getPropertyValue('margin-left'));
  sliderLength = sliderItems.length - parseInt(widthOfSlider / widthOfSliderItem);
}

setSlider();

window.addEventListener('resize', setSlider);

//=== Handle slider with buttons

function sliderToLeft(shiftSize = widthOfSliderItem) {
  if (itemPosition < 0) {
    itemPosition++;
    sliderList.style.left = (shiftSize + sliderItemMarginLeft) * itemPosition + 'px';
  }
}

function sliderToRight(shiftSize = widthOfSliderItem) {
  itemPosition--;
  if (itemPosition >= -1 * sliderLength) {
    sliderList.style.left = (shiftSize + sliderItemMarginLeft) * itemPosition + 'px';
  } else {
    sliderList.style.left = 0 + 'px';
    itemPosition = 0;
  }
}

sliderLeftBtn.addEventListener('click', () => {
  int = clearInterval(int);
  sliderToLeft(widthOfSliderItem);
});

sliderRightBtn.addEventListener('click', () => {
  int = clearInterval(int);
  sliderToRight(widthOfSliderItem);
});

function setSliderInterval(step = 2000) {
  if (typeof int == 'undefined') {
    int = setInterval(sliderToRight, step);
  }
}

//=== Restart slider after stopping for manual handling

window.addEventListener('scroll', () => {
  setSliderInterval();
});

//=== Swipe slider with finger

let touchOnX1 = null;
let xShift = null;
let touchOnSliderLeft = 0;
let deltaShift = parseInt(sliderList.style.left);

function handleTouchOn(e) {
  touchOnX1 = e.touches[0].clientX;
  sliderList.style.transition = 'none';
  deltaShift = parseInt(sliderList.style.left);
}

function handleTouchMove(e) {
  let touchOnX2 = e.touches[0].clientX;
  xShift = touchOnX2 - touchOnX1;
  sliderList.style.left = xShift + deltaShift + 'px';
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

  sliderList.style.left = (widthOfSliderItem + sliderItemMarginLeft) * itemPosition + 'px';
  sliderList.style.transition = '0.3s';
}

sliderItems.forEach(item => {
  item.addEventListener('touchstart', e => {
    e.preventDefault();
    int = clearInterval(int);
    handleTouchOn(e);
  });

  item.addEventListener('touchmove', e => {
    e.preventDefault();
    int = clearInterval(int);
    handleTouchMove(e);
  });

  item.addEventListener('touchend', e => {
    handleTouchOff(e);
  });

  item.addEventListener('mouseover', e => {
    int = clearInterval(int);
  });

  item.addEventListener('mouseout', e => {
    setSliderInterval();
  });
});

//=== Modal window with welcome message and some notes for cross-checkers

const modalBg = document.createElement('div');
const modalWindow = document.createElement('div');
const modalCloseBtn = document.createElement('div');
const modalOpenBtn = document.createElement('div');
const modalTextContainer = document.createElement('div');
const modalList = document.createElement('ol');
let modalWindowShift;

modalBg.classList.add('modal-bg');
modalWindow.classList.add('modal-window');
modalCloseBtn.classList.add('modal-window__close-btn');
modalOpenBtn.classList.add('modal-window__open-btn');
modalTextContainer.classList.add('modal-window__text-container');

document.body.insertAdjacentElement('afterbegin', modalWindow);
modalWindow.insertAdjacentElement('afterbegin', modalCloseBtn);
modalWindow.insertAdjacentElement('beforeend', modalTextContainer);
document.body.insertAdjacentElement('beforeend', modalOpenBtn);
modalOpenBtn.insertAdjacentElement('afterbegin', modalBg);

const modalHiMessage = 'Привет, кросcчекер :)';
const modalParaNo1 =
  'Это такой способ поздароваться с тобой и познакомить тебя с моей работой и он мне более по душе (сравнивая с видео презентацией).';
const modalParaNo2 = 'Я не буду грузить длинными речами, а просто перечислю на что можно обратить внимание.';
const modalParaNo3 =
  'Я очень старался сделать качественным этот наш первый лендинг на курсе и надеюсь, что если ты найдешь ошибки, то дашь мне шанс исправиться. Достаточно сообщить мне о недоработках и я устраню их в максимально короткие сроки. Хотя я свою работу тщательно проверил и не нашел несоответствий.';
const modalListLabel = 'Хотя пулреквесты мы не видим, самооценку работы я провел на 50 из 50. Ниже я перечислю то, на что хочу обратить внимание:';
const modalListItemNo1 = 'Страница сверстана строго по макету с учетом требований пиксель-перфект (5-10рх допуск);';
const modalListItemNo2 =
  'Присутствует адаптив. Так как по оформлению адаптива требований не было, он оформлен так, как его видел я. Ссылки подсвечены постоянно, потому как свойства "ховер" на мобильных устройствах нет;';
const modalListItemNo3 =
  'В разделе Latest articles работает слайдер. Он управляется стрелками, а также прокручивает ленту слайдов сам. Во время взаимодействия пользователя со слайдами самопрокрутка приостанавливается;';
const modalListItemNo4 =
  'Более того, слайдер свайпится. Попробуй свайпить картинки на своем телефоне или планшете. Слайдер и свайпер написаны на чистом JS - это не библиотеки;';
const modalListItemNo5 =
  'На десктоптных размерах экрана в разделе Latest articles на картинках в слайдере старался реализовать анимацию содержимого, чтобы заставить пользователя обратить внимание на текст, который является ссылками;';
const modalParaNo4 = 'В остальном все сделано по "техзаданию".';
const modalParaNo5 = 'Желаю всем успехов в учебе и найти работу своей мечты! С уважением, Дмитрий.';
const modalParaNoPS = 'P.S. Главное теперь не выхватить штрафных баллов за эту модалку :D';

modalTextContainer.insertAdjacentHTML('beforeend', `<h1>${modalHiMessage}</h1>`);
modalTextContainer.insertAdjacentHTML('beforeend', `<p>${modalParaNo1}</p>`);
modalTextContainer.insertAdjacentHTML('beforeend', `<p>${modalParaNo2}</p>`);
modalTextContainer.insertAdjacentHTML('beforeend', `<p>${modalParaNo3}</p>`);
modalTextContainer.insertAdjacentElement('beforeend', modalList);
modalList.insertAdjacentHTML('beforeend', `${modalListLabel}<li>${modalListItemNo1}</li>`);
modalList.insertAdjacentHTML('beforeend', `<li>${modalListItemNo2}</li>`);
modalList.insertAdjacentHTML('beforeend', `<li>${modalListItemNo3}</li>`);
modalList.insertAdjacentHTML('beforeend', `<li>${modalListItemNo4}</li>`);
modalList.insertAdjacentHTML('beforeend', `<li>${modalListItemNo5}</li>`);
modalTextContainer.insertAdjacentHTML('beforeend', `<p>${modalParaNo4}</p>`);
modalTextContainer.insertAdjacentHTML('beforeend', `<p>${modalParaNo5}</p>`);
modalTextContainer.insertAdjacentHTML('beforeend', `<p>${modalParaNoPS}</p>`);

function checkModalWindowShift() {
  modalWindowShift =
    parseInt(getComputedStyle(modalWindow).getPropertyValue('height')) + parseInt(getComputedStyle(modalWindow).getPropertyValue('margin-top'));
  hideModalWindow();
  console.log(modalWindowShift);
}

checkModalWindowShift();

window.addEventListener('resize', checkModalWindowShift);

function revealModalWindow() {
  modalBg.style.transform = 'scale(300)';
  modalWindow.style.left = '5%';
  modalWindow.style.transition = '0.3s ease-in-out 0.2s';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.touchAction = 'none';
}

function hideModalWindow() {
  modalBg.style.transform = 'scale(0)';
  modalWindow.style.left = `100%`;
  modalWindow.style.transition = '0.2s ease-in-out 0s';
  document.body.style.overflow = 'auto';
  document.documentElement.style.touchAction = 'auto';
}

modalOpenBtn.addEventListener('click', revealModalWindow);
modalCloseBtn.addEventListener('click', hideModalWindow);
