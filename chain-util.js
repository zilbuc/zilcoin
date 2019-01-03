 //importing class, that takes 1 argument - a string, representing cryptography method
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // used by bitcoin as well
const SHA256 = require('crypto-js/sha256'); //returns an array of strings;
const uuidV1 = require('uuid/v1');

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1;
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }
}

module.exports = ChainUtil;
