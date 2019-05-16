const toggleMenu = () => {
  // Toggle the "menu--open" class on your menu refence.
  let isOpen = menu.classList.toggle('menu--open');
  animate(isOpen);
};

const animate = (isOpen) => {
  if (isOpen) {
    TweenMax.staggerTo('.menu--open', 1.5, { width: 350, display: 'block', ease: Bounce.easeOut });
    TweenMax.staggerTo('.menu ul li', 1.5, { opacity: 1, delay: 0.6 });
  } else {
    TweenMax.staggerTo('.menu ul li', .2, { opacity: 0 });
    TweenMax.staggerTo('.menu', 1.5, { width: 0, display: 'none', delay: 1.5 });
  }
}

// Start Here: Create a reference to the ".menu" class
const menu = document.querySelector('.menu');
// create a reference to the ".menu-button" class
const menuButton = document.querySelector('.menu-button');
// Using your menuButton reference, add a click handler that calls toggleMenu
menuButton.addEventListener('click', toggleMenu);
