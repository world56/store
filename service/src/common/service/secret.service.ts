import * as CryptoJS from 'crypto-js';
import { Injectable } from '@nestjs/common';
import { ADMIN_USER_SECRET_KEY } from '@/config/secret';

@Injectable()
export class SecretService {
  private key = CryptoJS.enc.Utf8.parse(ADMIN_USER_SECRET_KEY);

  aesEncrypt(word: string) {
    const encrypted = CryptoJS.AES.encrypt(word, this.key, {
      iv: this.key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  toDecode(word: string) {
    let decrypt = CryptoJS.AES.decrypt(word, this.key, {
      iv: this.key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
  
}
