import Item from './Item';
import styles from './index.styl';

interface TypeCardProps extends React.FC {
  Item: typeof Item;
}

/**
 * @name Card 卡片布局
 */
const Card: TypeCardProps = ({
  children
}) => {
  return (
    <div className={styles.layout}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />

    </div>
  );
};

Card.Item = Item;

export default Card;
