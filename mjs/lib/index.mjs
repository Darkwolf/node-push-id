import crypto from 'crypto'

export default class PushID {
  static BASE64URL_ALPHABET = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
  static BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  static BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

  static _encodeTimestamp(timestamp, alphabet = PushID.BASE64URL_ALPHABET) {
    let str = ''
    for (let i = 0; i < 8; i++) {
      str = `${alphabet[timestamp % alphabet.length]}${str}`
      timestamp = Math.floor(timestamp / alphabet.length)
    }
    return str
  }

  static _randomNumber() {
    return crypto.randomBytes(4).readUInt32LE() / 0xffffffff
  }

  static _generate(alphabet = PushID.BASE64URL_ALPHABET) {
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

  static generate() {
    return PushID._generate()
  }

  static generateBase62() {
    return PushID._generate(PushID.BASE62_ALPHABET)
  }

  static generateBase58() {
    return PushID._generate(PushID.BASE58_ALPHABET)
  }

  static isPushID(value) {
    return /^[\w-]{20}$/.test(value)
  }

  static isBase62PushID(value) {
    return /^[A-Za-z\d]{20}$/.test(value)
  }

  static isBase58PushID(value) {
    return /^[AveDarkwo1f23456789BCEFGHJKLMNPQRSTUVWXYZbcdghijmnpqstuxyz]{20}$/.test(value)
  }
}
