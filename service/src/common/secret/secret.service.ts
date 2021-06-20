import { Injectable } from '@nestjs/common';
import { USER_FIND_KEY } from '@/config/secret';
import { generateKeyPairSync, privateDecrypt, createHash } from 'crypto';

import * as SecretType from '@/interface/secret';

@Injectable()
export class SecretService {
  private key?: SecretType.KeyToRSA;

  get secret() {
    return this.key;
  }

  async createRSA() {
    const key = generateKeyPairSync('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });
    this.key = key;
    return this.key;
  }

  decrypt(text: string, key: string) {
    const bufferData = Buffer.from(text, 'base64');
    return privateDecrypt(key, bufferData).toString();
  }

  md5(text: string, salty: string = USER_FIND_KEY) {
    return createHash('md5').update(`${text}:${salty}`).digest('hex');
  }
}
