import { Tooltip } from 'antd';

import { TypeCommon } from "@/interface/common";

type TypeDefaultData = Pick<TypeCommon.DTO, 'name' | 'remark'>

interface TypeTooltipDetailsProps<T extends TypeDefaultData = TypeDefaultData> {
  data?: T;
  defaultValue?: React.Key;
};

/**
 * @name Details 扩展信息
 * @description Tooltip会自动显示remark的备注信息
 */
const Details: React.FC<TypeTooltipDetailsProps> = ({ data, defaultValue = '-' }) => (
  <Tooltip title={data?.remark} destroyTooltipOnHide={{ keepParent: false }}>
    {data?.name || defaultValue}
  </Tooltip>
);

export default Details;
