import { createContext } from "react";

import type { TypeSpec } from "@/interface/purchase/spec";

type TypeData<T> = {
  run?(): void;
  loading?: boolean;
  data?: T[];
};

interface TypeCreateContextProps {
  category?: TypeData<TypeSpec.DTO>;
}

export default createContext<TypeCreateContextProps>({});
