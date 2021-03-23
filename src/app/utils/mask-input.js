const maskInput = (inputId, type) => {
  let inputValue = document.getElementById(inputId).value;
  if (type == "cpf") {
    inputValue = inputValue.replace(/\D/g,"")
    inputValue = inputValue.replace(/(\d{3})(\d)/,"$1.$2")
    inputValue = inputValue.replace(/(\d{3})(\d)/,"$1.$2")
    inputValue = inputValue.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  }
  if (type == "phone") {
    inputValue = inputValue.replace(/\D/g,"")
    inputValue = inputValue.replace(/^(\d\d)(\d)/g,"($1) $2")
    
    if (inputValue.length < 13) {
      inputValue = inputValue.replace(/(\d{4})(\d)/,"$1-$2")
    }else {
      inputValue = inputValue.replace(/(\d{5})(\d)/,"$1-$2")
    }
  }
  return document.getElementById(inputId).value = inputValue;
}

module.exports = maskInput;