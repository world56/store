import { Form } from 'antd';
import Search from '../Search';
import { memo, useMemo } from 'react';
import { getLogs } from "@/api/common";
import AddLog from './components/AddLog';
import Refresh from './components/Refresh';
import Message from './components/Message';
import { Status } from "@/components/Status";
import Container from './components/Container';
import { useCategorys, useGetDetails } from "@/hooks";

import { LOG_MODULE_TO_CATEGORY } from './utils';

import type { TypeLog } from "@/interface/log";
import type { TypeCommon } from "@/interface/common";


export interface TypeLogsProps extends Partial<TypeCommon.DatabaseMainParameter>, Partial<Pick<TypeLog.Query, 'module'>> {
  /**
   * @param spacing 是否使用间距
   * @description 每条记录都会单独隔开
   */
  spacing?: boolean;
  /**
   * @param search 显示筛选组件
   */
  search?: boolean;
  /**
   * @name onClose 传递该参数则为抽屉打开（有关闭按钮 肯定是弹窗撒）
   */
  onClose?(): void;
};

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Logs 日志
 */
const Logs: React.FC<TypeLogsProps> = ({
  module,
  search,
  spacing,
  onClose,
  id: relationId,
}) => {

  const { ADMIN_USER, ...category } = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const CATEGORY_NAME = LOG_MODULE_TO_CATEGORY[module!]
  const STATUS = category?.[CATEGORY_NAME];

  const [form] = Form.useForm<TypeLog.Query>();

  const query = useMemo(() => [
    {
      name: 'type',
      label: '日志类型',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: STATUS?.LIST
    },
    {
      name: 'creatorId',
      label: '添 加 人',
      type: Search.ENUM.COMP_TYPE.SELECT,
      list: ADMIN_USER?.LIST
    }
  ], [ADMIN_USER, STATUS]);

  const { value, loading, run } = useGetDetails(async () => {
    const values = await form.validateFields();
    values.module = module!;
    values.relationId = relationId!;
    return getLogs(values);
  }, [relationId, module, form]);

  const showSearch = search ? undefined : { display: 'none' };

  return (
    <Container
      title='日志'
      spacing={spacing}
      loading={loading}
      onCancel={onClose}
      visible={Boolean(relationId)}>
      <Search form={form} columns={query} onSearch={run} style={showSearch}>
        <AddLog type={CATEGORY_NAME} module={module} id={relationId} onClose={run} />
      </Search>
      {value?.length ? value?.map(v => <Message
        key={v._id}
        time={v.createTime}
        user={ADMIN_USER?.OBJ?.[v.creatorId]}
        status={<Status status={v.type} matching={STATUS?.OBJ} />}>
        {v.remark}
      </Message>
      ) : <Refresh onClick={search ? undefined : run} />}
    </Container>
  );
};

export default memo(Logs);
