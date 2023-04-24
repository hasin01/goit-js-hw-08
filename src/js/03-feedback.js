import throttle from 'lodash.throttle';

const contactFormEl = document.querySelector('.feedback-form');
const userData = {};

const fillContactFormField = () => {
  const userInfoFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (userInfoFromLS === null) {
    return;
  }

  for (const key in userInfoFromLS) {
    contactFormEl.elements[key].value = userInfoFromLS[key];
  }
};

fillContactFormField();

const onContactFormFielChange = event => {
  const { target: contactFieldEl } = event;

  const contactFieldValue = contactFieldEl.value;
  const contactFieldName = contactFieldEl.name;

  userData[contactFieldName] = contactFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

const onContactFormSubmit = event => {
  event.preventDefault();

  console.log(localStorage.getItem('feedback-form-state'));

  contactFormEl.reset();
  localStorage.removeItem('feedback-form-state');
};

contactFormEl.addEventListener('input', throttle(onContactFormFielChange, 500));
contactFormEl.addEventListener('submit', onContactFormSubmit);
