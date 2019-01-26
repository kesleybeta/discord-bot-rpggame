const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const score = low(new FileSync('./jsonfiles/abilityscore.json', 'utf8'))
// Useful functions
module.exports = {
  // Return the specific ability score modifier for a determined base //
  modifier (base) {
    let mod = 0
    try {
      mod = score.get('modifiers').value()[base]
    } catch (err) {
      console.log('[ERR#FUN0102]: ' + err)
    }
    return mod
  } // -------------------------------------------------------------- //

}