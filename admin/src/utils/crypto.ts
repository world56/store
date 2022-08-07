import JsEncrypt from "jsencrypt";

/**
 * @name encryption 加密
 */
export function encryption(pubilcKey: string, text: string) {
  const encrypt = new JsEncrypt();
  encrypt.setPublicKey(pubilcKey);
  const ciphertext = encrypt.encrypt(text);
  return ciphertext as string;
}
