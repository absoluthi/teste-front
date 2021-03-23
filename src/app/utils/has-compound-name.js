const hasCompoundName = (name) => {
  let words = name.split(' ');
  let hasNoAbbreviation = true;

  for (let index = 0; index < words.length; index++) {
    const element = words[index];
    if (element.length <= 2) {
      hasNoAbbreviation = false;
    }
  }
  return words.length > 1 && hasNoAbbreviation
}

module.exports = hasCompoundName