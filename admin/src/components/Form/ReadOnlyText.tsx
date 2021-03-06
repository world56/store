import { forwardRef } from 'react';
import styles from './index.module.sass';

interface TypeReadOnlyTextProps {
  title: string;
  value: React.Key;
  children: React.ReactChild;
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
  title,
  onClick
}, ref) => (
  <span
    ref={ref}
    title={title}
    onClick={onClick}
    className={onClick ? styles.isBtn : undefined}>
    {value}
  </span>
);

export default forwardRef(ReadOnlyText);
