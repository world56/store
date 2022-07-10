import { Card, Form } from "antd";
import { useCallback, useMemo } from "react";
import Search from "@/components/Search";
import { useStore } from "@/hooks";

/**
 * @name Warehousing 入库
 */
const Warehousing = () => {

  const { category } = useStore();

  const [form] = Form.useForm();

  const initializa = useCallback(() => {

  }, []);


  const query = useMemo(() => [
    {
      name: 'type',
      label: '入库类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: category?.WAREHOUSING_TYPE?.LIST
    }
  ], [category]);


  return (
    <Card title='产品待入库'>
      <Search form={form} columns={query} onSearch={initializa} />
    </Card>
  );
};

export default Warehousing;
