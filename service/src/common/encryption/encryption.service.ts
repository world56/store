import { createHash } from 'crypto';
import * as NodeRSA from 'node-rsa';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { TypeAuth } from '@/interface/auth';

interface TypeEnvEncryptionVariables {
  USER_FIND_KEY: string;
}

@Injectable()
export class EncryptionService {
  constructor(
    private readonly ConfigService: ConfigService<TypeEnvEncryptionVariables>,
  ) {}

  AuthKey: TypeAuth.KeyToRSA;

  createRSA() {
    const RSA = new NodeRSA({ b: 512 }); // 三方库的1024慢的批爆
    RSA.setOptions({ encryptionScheme: 'pkcs1' });
    const publicKey = RSA.exportKey('pkcs8-public-pem');
    const privateKey = RSA.exportKey('pkcs8-private-pem');
    this.AuthKey = { publicKey, privateKey };
    return this.AuthKey;
  }

  decrypt(text: string) {
    const RSA = new NodeRSA(this.AuthKey.privateKey, 'pkcs8-private-pem');
    RSA.setOptions({ encryptionScheme: 'pkcs1' });
    const endText = RSA.decrypt(text, 'utf8');
    return endText;
  }

  md5(text: string, salty: string = this.ConfigService.get('USER_FIND_KEY')) {
    return createHash('md5').update(`${text}:${salty}`).digest('hex');
  }
}
