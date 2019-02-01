/* eslint-disable space-before-function-paren */
// Global variables
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const score = low(new FileSync('./jsonfiles/_appendix/abilityscore.json', 'utf8'))

// Functions
module.exports = {

  rollfourdsix() {
    // variables
    let min = Math.ceil(1)
    let max = Math.floor(6)
    var menor = 6
    var maior = 0
    let total = 0
    let dice = [
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min
    ]
    for (let j = 0; j < 2; j++) {
      total = 0
      for (let i = 0; i < 4; i++) {
        total = total + dice[i]
        if (dice[i] < menor) menor = dice[i]
      }
      if (total > maior) maior = total
    }
    return total
  },

  // Return the specific ability score modifier for a determined base //
  modifier(base) {
    let mod = 0
    try {
      mod = score.get('modifiers').value()[base]
    } catch (err) {
      console.log('[ERR#FUN0101]: ' + err)
    }
    return mod
  } // -------------------------------------------------------------- //
}