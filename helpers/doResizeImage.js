const Jimp = require("jimp");
const doResizeImage = async (imgPath) => {
  try {
    const image = await Jimp.read(imgPath);
    image.resize(250, 250);
    image.writeAsync(imgPath);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = doResizeImage;
