module.exports = (len) => {
  const stuff = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  let id = '';

  for (let i = 0; i < len; i += 1) {
    id += stuff.charAt(Math.floor(Math.random() * stuff.length));
  }

  return id;
}
