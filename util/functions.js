const ModUtil = require("../models/mod-util.js")
// Useful functions
module.exports = {
  // Return the specific ability score modifier for a determined base //
  modifier (base) {
    let mod = 0
    try {
      ModUtil.findById('5c412c51fb6fc0600be2d60f') // LARGA MAO DISSO E VAI USAR O LOOOOOWWWWDDDBBBB KKKKK
        .exec((err, res) => {
          if (err) console.log("[ERR#FUN0101]: " + err)
          if (!res || res === null) mod = 0
          else {
            mod = res.modifiers.score[base]
          }
        })
    } catch (err) {
      console.log('[ERR#FUN0102]: ' + err)
    }
    return mod
  } // -------------------------------------------------------------- //

}