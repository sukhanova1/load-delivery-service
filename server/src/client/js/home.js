const bntBurgerMenu = document.querySelector('#burger-menu');
const btnLogout = document.querySelectorAll('.logout');

renderPage();

bntBurgerMenu.addEventListener('click', toggleMenu);
btnLogout.forEach((btn) => btn.addEventListener('click', logout, false));

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('sidebar-small');
  document.querySelector('.header').classList.toggle('header-large');
  document.querySelector('.main').classList.toggle('main-large');
  document.querySelector('.user-photo').classList.toggle('hidden');
  document.querySelector('.nav__footer').classList.remove('item_hover');
  
  const text = document.querySelectorAll('.nav__link-text');
  text.forEach((el) => el.classList.toggle('hidden'));
  
  const items = document.querySelectorAll('.nav__item');
  items.forEach((item) => item.classList.remove('item_hover'));
}

function logout(e) {
  e.preventDefault();
  localStorage.removeItem('userToken');
  localStorage.removeItem('userName');
  window.location.href = './main.html';
}

function renderPage() {
  const navTruck = document.querySelector('#trucks');
  
  navTruck.classList.add('item_active');
  document.querySelector('#page-title').innerHTML = navTruck.getAttribute('title');
  // import function getUserTrucks();
  
  const userName = JSON.parse(localStorage.getItem('userName'));

  document.querySelectorAll('.user-name').forEach((el) => {
    el.innerHTML = userName;
  });
}
