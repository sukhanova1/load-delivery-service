function changeDimensions(type) {
  let x; let y; let z; let
    payload;
  switch (type) {
    case 'SPRINTER':
      x = 300;
      y = 250;
      z = 170;
      payload = 1700;
      break;
    case 'SMALL STRAIGHT':
      x = 500;
      y = 250;
      z = 170;
      payload = 2500;
      break;
    case 'LARGE STRAIGHT':
      x = 700;
      y = 350;
      z = 200;
      payload = 4000;
      break;
    default:
  }
  return {
    x, y, z, payload,
  };
}

module.exports = {
  changeDimensions,
};
