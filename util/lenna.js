var Jimp = require('jimp');

// open a file called "lenna.png"
Jimp.read('image.jpg', (err, lenna) => {
  console.log('read')
  if (err) throw err;
  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
    lenna.blur(5)
    lenna.print(font, 10, 10, "'Hello world!'");
    lenna
      .resize(300, 300) // resize
      .quality(60) // set JPEG quality
    //.greyscale() // set greyscale
    lenna.write('lena-small-bw.jpg') // save
  })
  console.log('done')
});