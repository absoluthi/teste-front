const giveNickName = (name)=> {
  const nameParts = name.split(' ');
  let initials = '';
  for (let index = 0; index < nameParts.length; index++) {
    const element = nameParts[index];
    if (element.substr(0, 1) != undefined)
      initials += element.substr(0, 1).toUpperCase();
  }
  return initials
}

module.exports = giveNickName;