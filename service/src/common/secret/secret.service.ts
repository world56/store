import { createHash } from 'crypto';
import * as NodeRSA from 'node-rsa';
import { Injectable } from '@nestjs/common';
import { USER_FIND_KEY } from '@/config/secret';

@Injectable()
export class SecretService {
  createRSA() {
    const RSA = new NodeRSA({ b: 512 }); // 1024慢的批爆
    RSA.setOptions({ encryptionScheme: 'pkcs1' });
    const publicKey = RSA.exportKey('pkcs8-public-pem');
    const privateKey = RSA.exportKey('pkcs8-private-pem');
    return { publicKey, privateKey };
  }

  decrypt(text: string, key: string) {
    const RSA = new NodeRSA(key, 'pkcs8-private-pem');
    RSA.setOptions({ encryptionScheme: 'pkcs1' });
    const endText = RSA.decrypt(text, 'utf8');
    return endText;
  }

  md5(text: string, salty: string = USER_FIND_KEY) {
    return createHash('md5').update(`${text}:${salty}`).digest('hex');
  }
}
