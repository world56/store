import { Radio } from "antd";

/**
 * @name WarehousingType  入库类型
 */
const WarehousingType = () => {
  return (
    <Radio.Group defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  );
};

export default WarehousingType;
