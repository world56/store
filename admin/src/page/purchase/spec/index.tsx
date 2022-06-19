import Context from './context';
import { Card, Tabs } from 'antd';
import { useRequest } from 'ahooks';
import { getSpecAllTemplate } from '@/api/enum';
import SpecTemplate from './components/Template';
import SpecParameter from './components/Parameter';

const Spec = () => {

  const category = useRequest(getSpecAllTemplate);

  return (
    <Context.Provider value={{ category }}>
      <Card title='产品规格'>
        <Tabs defaultActiveKey="1" >
          <Tabs.TabPane tab="规格参数" key="1">
            <SpecParameter />
          </Tabs.TabPane>
          <Tabs.TabPane tab="规格模板" key="2">
            <SpecTemplate />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Context.Provider>
  );
};

export default Spec;
