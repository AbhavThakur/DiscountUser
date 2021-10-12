var code = Math.floor(
  Math.pow(10, 12 - 1) +
    Math.random() * (Math.pow(10, 12) - Math.pow(10, 12 - 1) - 1),
);
var cardno = code
  .toString()
  .replace(/(\d{4})/g, '$1 ')
  .replace(/(^\s+|\s+$)/, '');

export default cardno;
