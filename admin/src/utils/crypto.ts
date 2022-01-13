import JsEncrypt from "jsencrypt";

export function encryption(pubilcKey: string, text: string) {
  const encrypt = new JsEncrypt();
  encrypt.setPublicKey(pubilcKey);
  const ciphertext = encrypt.encrypt(text);
  return ciphertext as string;
}
