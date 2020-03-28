/* eslint-disable no-unused-vars */
const encode = (text, shift) => {
  return String.fromCharCode(
    ...text.split('').map(char => {
      if (/[a-zA-z]/.test(char)) {
        return ((char.charCodeAt() - 97 + shift) % 26) + 97;
      }
      return char.charCodeAt();
    })
  );
};

const decode = (text, shift) => {
  return String.fromCharCode(
    ...text.split('').map(char => {
      if (/[a-zA-z]/.test(char)) {
        return ((char.charCodeAt() - 97 + shift) % 26) + 97;
      }
      return char.charCodeAt();
    })
  );
};
