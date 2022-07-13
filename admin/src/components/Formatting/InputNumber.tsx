import { InputNumber as AntdInputNumber } from 'antd';

import type { InputNumberProps } from 'antd/lib/input-number';

interface typeInputNumberProps extends InputNumberProps<number> {
  /** @param money 金额模式 仅支持两位小数 */
  money?: boolean;
};

function filterFinite(str: string) {
  return str ? Array.prototype.filter.call(str, (num) => isFinite(num)).join('') : '';
};

/**
 * @name InputNumber 针对金额（两位小数）特别处理
 */
const InputNumber: React.FC<typeInputNumberProps> = ({
  money,
  ...restProps
}) => {

  function parser(val: React.Key = '') {
    const [l, r] = val.toString().split('.')
    const start = Number(filterFinite(l)) || 0;
    if (money) {
      const end = filterFinite(r);
      return Number([start, end.length <= 2 ? end : end.slice(0, 2)].join('.'));
    }
    return start;
  };

  return (
    <AntdInputNumber parser={parser} {...restProps} />
  );
};

export default InputNumber;
