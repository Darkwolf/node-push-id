const crypto = require('crypto')

class PushID {}
PushID.BASE64URL_ALPHABET = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
PushID.BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
PushID.BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
PushID._encodeTimestamp = (timestamp, alphabet = PushID.BASE64URL_ALPHABET) => {
  let str = ''
  for (let i = 0; i < 8; i++) {
    str = `${alphabet[timestamp % alphabet.length]}${str}`
    timestamp = Math.floor(timestamp / alphabet.length)
  }
  return str
}
PushID._randomNumber = () => crypto.randomBytes(4).readUInt32LE() / 0xffffffff
PushID._generate = (alphabet = PushID.BASE64URL_ALPHABET) => {
  const charIndexesKey = `_base${alphabet.length}CharIndexes`
  let charIndexes = PushID[charIndexesKey]
  if (!charIndexes) {
    PushID[charIndexesKey] = []
    charIndexes = PushID[charIndexesKey]
  }
  const timestamp = Date.now()
  const duplicate = PushID._timestamp === timestamp
  PushID._timestamp = timestamp
  let str = PushID._encodeTimestamp(timestamp, alphabet)
  if (duplicate) {
    let i
    for (i = 11; i >= 0 && charIndexes[i] === alphabet.length - 1; i--) {
      charIndexes[i] = 0
    }
    if (i < 0) {
      i = 11
    }
    charIndexes[i]++
  } else {
    for (let i = 0; i < 12; i++) {
      charIndexes[i] = Math.floor(PushID._randomNumber() * alphabet.length)
    }
  }
  return charIndexes.reduce((str, charIndex) => `${str}${alphabet[charIndex]}`, str)
}
PushID.generate = () => PushID._generate()
PushID.generateBase62 = () => PushID._generate(PushID.BASE62_ALPHABET)
PushID.generateBase58 = () => PushID._generate(PushID.BASE58_ALPHABET)
PushID.isPushID = value => /^[\w-]{20}$/.test(value)
PushID.isBase62PushID = value => /^[A-Za-z\d]{20}$/.test(value)
PushID.isBase58PushID = value => /^[AveDarkwo1f23456789BCEFGHJKLMNPQRSTUVWXYZbcdghijmnpqstuxyz]{20}$/.test(value)

module.exports = PushID
