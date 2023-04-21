// import { io } from 'socket.io-client';

const loginLink = document.querySelectorAll('.log-in-link');
const createAccLink = document.querySelector('#create-acc-link');
const forgotPassLink = document.querySelector('#forgot-pass-link');

const signUpForm = document.querySelector('#sign-up-form');
const loginForm = document.querySelector('#log-in-form');
const forgotPassForm = document.querySelector('#forgot-pass-form');
const successForm = document.querySelector('#success-form');
const resetForm = document.querySelector('#reset-form');

const errorMessage = document.querySelectorAll('.form__input-err-message');
// const socket = io('http://127.0.0.1:8080');

loginLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    signUpForm.classList.add('hidden');
    successForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    window.location.reload();
  });
});

createAccLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  signUpForm.classList.remove('hidden');
});

forgotPassLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  forgotPassForm.classList.remove('hidden');
});

signUpForm.addEventListener('submit', signup, false);
loginForm.addEventListener('submit', login);
forgotPassForm.addEventListener('submit', forgotPass, false);

function signup(event) {
  event.preventDefault();
  
  const { email, password, role } = signUpForm;
  const secondPass = document.querySelector('.second-pass-input').value;
  
  if (email.value.trim() === '' || password.value.trim() === '' || secondPass.trim() === '') {
    errorMessage[0].classList.remove('hidden');
    errorMessage[0].innerHTML = '&#42;Please fill in all fields';
    return;
  }
  
  if (secondPass !== password.value) {
    errorMessage[0].classList.remove('hidden');
    errorMessage[0].innerHTML = '&#42;Passwords do not match';
    return;
  }
  
  if (password.value.length < 6) {
    errorMessage[0].classList.remove('hidden');
    errorMessage[0].innerHTML = '&#42;Password must be at least 6 characters';
    return;
  }
  
  const payload = {
    email: email.value,
    password: password.value,
    role: role.value,
  };
  
  fetch('http://127.0.0.1:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.status === 200) {
        signUpForm.classList.add('hidden');
        successForm.classList.remove('hidden');
      }
      if (res.status === 400) {
        errorMessage[0].classList.remove('hidden');
        errorMessage[0].innerHTML = `&#42;User ${payload.email} already exists.`;
      }
    })
    .catch((err) => console.log(err));
}

function login(event) {
  event.preventDefault();
  const { email, password } = loginForm;
  
  if (email.value.trim() === '' || password.value.trim() === '') {
    errorMessage[1].classList.remove('hidden');
    errorMessage[1].innerHTML = '&#42;Please fill in all fields';
    return;
  }
  
  fetch('http://127.0.0.1:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((res) => {
      if (res.status === 400) {
        errorMessage[1].classList.remove('hidden');
        errorMessage[1].innerHTML = '&#42;Not authorised. Invalid email or password value';
      }
      return res.json();
    })
    .then((data) => {
      const user = getTokenData(data.jwt_token);
      if (user.role === 'DRIVER') {
        window.location.href = './homeDriver.html';
      }
      if (user.role === 'SHIPPER') {
        window.location.href = './homeShipper.html';
      }
      localStorage.setItem('userName', JSON.stringify(user.email));
      localStorage.setItem('userToken', JSON.stringify(data.jwt_token));
    })
    .catch((err) => console.log(err));
}

function getTokenData(token) {
  const base64URL = token.split('.')[1];
  const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64)
    .split('')
    .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
    .join(''));
  return JSON.parse(jsonPayload);
}

function forgotPass(event) {
  event.preventDefault();
  
  const { email } = forgotPassForm;

  if (email.value.trim() === '') {
    errorMessage[2].classList.remove('hidden');
    errorMessage[2].innerHTML = '&#42;Please fill in all fields';
    return;
  }
  
  fetch('http://127.0.0.1:8080/api/auth/forgot_password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value }),
  })
    .then((res) => {
      if (res.status === 400) {
        errorMessage[2].classList.remove('hidden');
        errorMessage[2].innerHTML = '&#42;User with given email does not exist';
      }
      if (res.status === 200) {
        forgotPassForm.classList.add('hidden');
        resetForm.classList.remove('hidden');
      }
    })
    .catch((err) => console.log(err));
}
