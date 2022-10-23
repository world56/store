import { useThrottleFn } from "ahooks";
import { DB_PRIMARY_KEY } from "@/config/db";

import type { RuleObject } from "rc-field-form/lib/interface";

export default function useFieldCheck(fn: Function, id?: number) {
  const { run } = useThrottleFn(
    async (rule: RuleObject, name: string | void) => {
      const bol = await fn({ [DB_PRIMARY_KEY]: id, name });
      return bol ? Promise.reject("该字符已被占用，请更换后重试") : bol;
    },
    {},
  );
  return run;
}
