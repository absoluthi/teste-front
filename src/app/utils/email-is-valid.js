const emailIsValid = (email) => {
  return email.indexOf(' ') == -1 && /(^\w.*@\w+\.\w)/.test(email)
}

module.exports = emailIsValid