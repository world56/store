import Context from './context';
import { Card, Tabs } from 'antd';
import { useRequest } from 'ahooks';
import { getSpecAllTemplate } from '@/api/enum';
import SpecParameter from './components/Parameter';
import SpecTemplateList from './components/Template';

const Spec = () => {

  const category = useRequest(getSpecAllTemplate);

  return (
    <Context.Provider value={{ category }}>
      <Card title='产品规格'>
        <Tabs defaultActiveKey="1" items={[
          {
            key: '1',
            label: '规格参数',
            children: <SpecParameter />
          },
          {
            key: '2',
            label: '规格模板',
            children: <SpecTemplateList />
          },
        ]} />
      </Card>
    </Context.Provider>
  );
};

export default Spec;
