import dayjs from 'dayjs';
import { useMemo } from 'react';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { DatePicker as AntdDatePicker } from 'antd';

import type { Dayjs } from 'dayjs';
import type { RangeValue } from 'rc-picker/lib/interface';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';

dayjs.extend(weekday);
dayjs.extend(localeData);

type TypeTimeScope = Array<number | undefined> | undefined;

interface DatePickerScopeProps<T = TypeTimeScope> extends Omit<RangePickerSharedProps<Dayjs>, 'value' | 'onChange'> {
  value?: T;
  onChange?(param: T): void;
};

/**
 * @name DatePicker 自定义时间范围
 * @description 直接返回时间戳
 */
const DatePicker: React.FC<DatePickerScopeProps> = ({
  value,
  onChange,
  ...props
}) => {

  const values = useMemo(() => {
    if (value) {
      const [start, end] = value;
      return [dayjs(start), dayjs(end)] as RangeValue<Dayjs>;
    }
    return undefined;
  }, [value]);

  function onRangePicker(time: RangeValue<Dayjs>) {
    if (time?.length) {
      const start = new Date(`${time[0]?.format('YYYY-MM-DD')} 00:00:00`).valueOf();
      const end = new Date(`${time[1]?.format('YYYY-MM-DD')} 23:59:59`).valueOf();
      onChange?.([start, end]);
    } else {
      onChange?.(undefined);
    }
  };

  return <AntdDatePicker.RangePicker {...props} value={values} onChange={onRangePicker} />;
};

export { DatePicker };
