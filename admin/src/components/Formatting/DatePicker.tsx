import dayjs from 'dayjs';
import { useMemo } from 'react';
import 'antd/es/date-picker/style/index.css';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

import type { Dayjs } from 'dayjs';
import type { RangeValue } from 'rc-picker/lib/interface';
import type { RangePickerSharedProps, } from 'rc-picker/lib/RangePicker';

const DatePickerComponent = generatePicker<Dayjs>(dayjsGenerateConfig);

// 暂时这么解决 后期等升级React18 antd5
const RangePickerToDayJS = DatePickerComponent.RangePicker as unknown as React.FC<Pick<RangePickerSharedProps<Dayjs>, 'value' | 'onChange'>>;

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
      onChange?.([time[0]!.valueOf(), time[1]!.valueOf()]);
    } else {
      onChange?.(undefined);
    }
  };

  return <RangePickerToDayJS {...props} value={values} onChange={onRangePicker} />;
};

export { DatePicker };
