var Jimp = require('jimp')

// open a file called "lenna.png"
Jimp.read('image.jpg', (err, lenna) => {
  console.log('read')
  if (err) throw err
  Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
    //lenna.blur(5)
    lenna.print(font, 25, 20, "Maviel Welkhein")
    .print(font, 680, 20, 'Level: 00')
      .quality(100)
      //.greyscale() // set greyscale
    lenna.write('lena-01.jpg') // save
  })
  console.log('done')
})