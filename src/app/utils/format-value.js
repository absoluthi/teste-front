const formatValue = (value, format) => {
  let formattedValue
  if (format == "cpf") {
    value = value.replace(/\D/g,"")
    value = value.replace(/(\d{3})(\d)/,"$1.$2")
    value = value.replace(/(\d{3})(\d)/,"$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  }
  if (format == "phone") {
    value = value.replace(/\D/g,"")
    value = value.replace(/^(\d\d)(\d)/g,"($1) $2")
    
    if (value.length < 13) {
      value = value.replace(/(\d{4})(\d)/,"$1-$2")
    }else {
      value = value.replace(/(\d{5})(\d)/,"$1-$2")
    }
  }else if (format == 'number') {
    value = value.replace('.', '').replace('.', '').replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
  }

  formattedValue = value;

  return formattedValue;
}

module.exports = formatValue;