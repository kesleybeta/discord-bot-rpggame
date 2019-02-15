/* eslint-disable space-before-function-paren */
// Global variables
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const score = low(new FileSync('./jsonfiles/_appendix/abilityscore.json', 'utf8'))
const classFeatures = low(new FileSync('./jsonfiles/char/charclasses.json', 'utf8'))
const racesTraits = low(new FileSync('./jsonfiles/char/charraces.json', 'utf8'))
// Functions
module.exports = {
  // Roll four 6-sided dice and record the total of the highest three //
  rollfourdsix() {
    // variables
    let min = 1
    let max = Math.floor(6)
    let total = 0
    let menor = 6
    let maior = 0
    let dice = []
    // Code lines
    for (let j = 0; j < 2; j++) {
      dice = [
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min
      ]
      total = 0
      menor = 6
      for (let i = 0; i < 4; i++) {
        total = total + dice[i]
        if (dice[i] < menor) menor = dice[i]
      }
      total = total - menor
      if (total > maior) maior = total
    }
    return maior
  }, // ------------------------------------------------------------- //

  // Return the specific ability score modifier for a determined base //
  modifier(base) {
    let mod = 0
    try {
      mod = score.get('modifiers').value()[base]
    } catch (err) {
      console.log('[ERR#FUN0201]: ' + err)
    }
    return mod
  }, // ------------------------------------------------------------- //

  // Return sum of a 'quantity' of 'numOfSides' sided dices //
  roll(quantity, numOfSides) {
    // variables
    let min = 1
    let max = 0
    let sum = 0
    // Code lines
    if (isNaN(quantity)) quantity = 1 // eslint-disable-line no-param-reassign
    if (isNaN(numOfSides)) numOfSides = Math.floor(Math.random() * (6 - 4 + 1)) + 4 // eslint-disable-line no-param-reassign
    if (quantity < 1) quantity = 1 // eslint-disable-line no-param-reassign
    if (!numOfSides) numOfSides = Math.floor(Math.random() * (6 - 4 + 1)) + 4 // eslint-disable-line no-param-reassign

    max = Math.floor(numOfSides)
    for (let i = 1; i <= quantity; i++) sum = sum + Math.floor(Math.random() * (max - min + 1)) + min

    return sum
  }, // --------------------------------------------------- //

  getFeature(specificClass, level) {
    console.log('getting: %s feature, level %s', specificClass, level)
    let featureArray = []
    if (!level) level = "1" // eslint-disable-line no-param-reassign
    if (!isNaN(level)) level = String(level) // eslint-disable-line no-param-reassign
    try {
      featureArray.push(classFeatures.get(specificClass + '.table.' + level + '.features').value())
    } catch (err) {
      console.log('[ERR#FUN0401]: ' + err)
    }
    return featureArray
  }, // --------------------------------------------------- //

  randomName(race, gender) {
    // Error handling
    if (!gender) gender = 'm' // eslint-disable-line no-param-reassign

    // Variables
    let nameMax = 0
    let familyMax = 0
    let name = ""
    // Code lines
    if (gender === 'm') nameMax = racesTraits.get(race + '.names.male').size()
      .value() - 1
    if (gender === 'f') nameMax = racesTraits.get(race + '.names.female').size()
      .value() - 1
    familyMax = racesTraits.get(race + '.names.family').size()
      .value() - 1

    nameMax = Math.floor(Math.random() * (nameMax - 0 + 1)) + 0
    familyMax = Math.floor(Math.random() * (familyMax - 0 + 1)) + 0

    if (gender === 'm') name = racesTraits.get(race + '.names.male[' + nameMax + ']').value()
    if (gender === 'f') name = racesTraits.get(race + '.names.female[' + nameMax + ']').value()
    if (familyMax !== 0) name = name.concat(' ', racesTraits.get(race + '.names.family[' + familyMax + ']').value())

    return name
  },
  flattenDeep(arr1) {
    // eslint-disable-next-line no-ternary
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  }
}