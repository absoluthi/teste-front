const submitForm = (action) => {
  const formButton =  document.getElementById('submit-form-btn');
  formButton.dataset.action = action;
  return formButton.click()
}

module.exports = submitForm;