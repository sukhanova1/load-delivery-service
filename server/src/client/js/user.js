const btnProfile = document.querySelector('#profile');
const btnTrucks = document.querySelector('#trucks');
const btnLoad = document.querySelector('#load');

const btnUserName = document.querySelector('#user-name');
const btnUserPhoto = document.querySelectorAll('.user-photo');

const pageTitle = document.querySelector('#page-title');

btnUserName.addEventListener('click', goToProfile, false);
btnProfile.addEventListener('click', getProfileInfo, false);

// btnTrucks.addEventListener('click', getUserTrucks, false);
// btnLoad.addEventListener('click', getUserAssignedLoad, false);

btnUserPhoto.forEach((btn) => btn.addEventListener('click', changeProfilePhoto, false));

function goToProfile(e) {
  getProfileInfo(e);
  document.querySelector('.profile').classList.remove('hidden');
  e.currentTarget.classList.remove('item_active');
  btnProfile.classList.add('item_active');
}

function getProfileInfo(e) {
  renderChanges(e);
  document.querySelector('.profile').classList.remove('hidden');
  
  fetch('http://127.0.0.1:8080/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${JSON.parse(localStorage.getItem('userToken'))}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const { user } = data;
      const jsondate = user.created_date.toLocaleString('en-GB');
      const date = jsondate.split('T')[0];
      
      document.querySelector('.profile__name').innerHTML = user.email;
      document.querySelector('.profile__role-value').innerHTML = user.role;
      document.querySelector('.profile__date-value').innerHTML = date;   
      
      document.querySelector('#change-pass-btn').addEventListener('click', displayChangePassForm);
      document.querySelector('#delete-acc-btn').addEventListener('click', displayDeleteBox);
    })
    .catch((err) => console.log(err));
}

function renderChanges(e) {
  e.preventDefault();
  
  document.querySelectorAll('.main__content-item').forEach((item) => {
    item.classList.add('hidden');
  });
  
  document.querySelectorAll('.nav__item').forEach((item) => {
    item.classList.remove('item_active');
  });
  
  e.currentTarget.classList.add('item_active');
  pageTitle.innerHTML = e.currentTarget.getAttribute('title');
}

function displayChangePassForm() {
  const box = document.querySelector('.change-pass__box');
  box.classList.remove('hidden');
  
  const btnClose = document.querySelectorAll('.close-mark')[0];
  btnClose.addEventListener('click', () => {
    box.classList.add('hidden');
  });
  
  const errMessage = document.querySelector('.change-pass__err-message');
  const form = document.querySelector('#change-pass-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = form;
    
    if (oldPassword.value.trim() === '' || newPassword.value.trim() === '') {
      errMessage.classList.remove('hidden');
      errMessage.innerHTML = '&#42;Please fill in all fields';
      return;
    }
    
    if (newPassword.value.length < 6) {
      errMessage.classList.remove('hidden');
      errMessage.innerHTML = '&#42;New password must be at least 6 characters';
      return;
    }

    changePass(oldPassword.value, newPassword.value, errMessage);
  }, false);
}

function changePass(oldPass, newPass, errMessage) {
  fetch('http://127.0.0.1:8080/api/users/me/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${JSON.parse(localStorage.getItem('userToken'))}`,
    },
    body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
  })
    .then((res) => {
      if (res.status === 400) {
        errMessage.classList.remove('hidden');
        errMessage.innerHTML = '&#42;Invalid old password';
      }
      if (res.status === 200) {
        document.querySelector('.change-pass__form').classList.add('hidden');
        document.querySelector('.change-pass__success').classList.remove('hidden');
        const btnOk = document.querySelectorAll('.btn-ok')[0];
        btnOk.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelector('.change-pass__box').classList.add('hidden');
        }, false);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function displayDeleteBox() {
  const box = document.querySelector('.delete');
  box.classList.remove('hidden');
  
  document.querySelector('.delete__btn-no').addEventListener('click', () => {
    box.classList.add('hidden');
  });
  
  document.querySelector('.delete__btn-yes').addEventListener('click', deleteAccount);
}

function deleteAccount() {
  fetch('http://127.0.0.1:8080/api/users/me', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${JSON.parse(localStorage.getItem('userToken'))}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        document.querySelector('.delete__message-box').classList.add('hidden');
        document.querySelector('.delete__success').classList.remove('hidden');
        
        const btnOk = document.querySelectorAll('.btn-ok')[1];
        btnOk.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.clear();
          window.location.href = './main.html';
        }, false);
      }
    })
    .catch((err) => console.log(err));
}

function getUserTrucks(e) {
  renderChanges(e);
}

function changeProfilePhoto() {
  
}
