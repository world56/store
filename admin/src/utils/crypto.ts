import { publicEncrypt } from "crypto";

export function encryption(pubilcKey: string, paw: string) {
  return publicEncrypt(pubilcKey, Buffer.from(paw)).toString("base64");
}
