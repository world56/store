import styles from './index.module.sass';

interface TypeBadgeProps {
  color?: string;
};

/**
 * @name Badge 颜色原点
 */
const Badge: React.FC<TypeBadgeProps> = ({ color: background }) => (
  <span className={styles.badge} style={{ background }} />
);

export default Badge;
