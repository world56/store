import { forwardRef } from 'react';
import styles from './index.module.sass';

interface TypeReadOnlyTextProps {
  title: string;
  value: React.Key;
  /**
   * @param replaceValue 如果value值为空 则显示该字段值
   */
  replaceValue: React.Key;
  children: React.ReactNode;
  onClick(): void;
};

type TypeReadOnlyTextComponents = React.ForwardRefRenderFunction<
  HTMLSpanElement,
  Partial<Readonly<TypeReadOnlyTextProps>>
>;

/**
 * @name ReadOnlyText Form文本只读
 */
const ReadOnlyText: TypeReadOnlyTextComponents = ({
  value,
  replaceValue,
  title,
  onClick
}, ref) => (
  <span
    ref={ref}
    title={title}
    onClick={onClick}
    className={onClick ? styles.isBtn : undefined}>
    {value || replaceValue}
  </span>
);

export default forwardRef(ReadOnlyText);
