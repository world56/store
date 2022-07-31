import { useParams } from "react-router-dom";
import BasicInfo from "./components/BasicInfo";

import type { TypeCommon } from "@/interface/common";

interface TypeWarehousingPurchaseRouteParam extends Partial<TypeCommon.DatabaseMainParameter<string>> { }

/**
 * @name WarehousingPurchase 采购入库
 */
const WarehousingPurchase = () => {

  const { id } = useParams<TypeWarehousingPurchaseRouteParam>();
  console.log(id);

  return (
    <>
      <BasicInfo />
    </>
  );
};

export default WarehousingPurchase;
