import { memo } from 'react';
import Status from "@/layout/Status";
import { getLogs } from "@/api/common";
import Refresh from './components/Refresh';
import Message from './components/Message';
import Container from './components/Container';
import { useCategorys, useGetDetails } from "@/hooks";

import type { TypeLog } from "@/interface/log";
import type { TypeCommon } from "@/interface/common";

export interface TypeLogsProps
  extends
  Partial<TypeCommon.DatabaseMainParameter>,
  Partial<Pick<TypeLog.QueryList, 'module'>> {
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
  onClose,
  id: relationId,
}) => {

  const category = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const { value, loading, run } = useGetDetails(async () => (
    getLogs({ relationId: relationId!, module: module! })
  ), [relationId, module]);

  return (
    <Container
      title='采购日志'
      loading={loading}
      onCancel={onClose}
      visible={Boolean(relationId)}>
      {value?.length ? value?.map(v => <Message
        key={v._id}
        time={v.createTime}
        user={category.ADMIN_USER?.OBJ?.[v.creatorId]}
        status={<Status status={v.type} matching={category.PURCHASE_PROCESS_STATUS.OBJ} />}>
        {v.remark}
      </Message>
      ) : <Refresh onClick={run} />}
    </Container>
  );
};

export default memo(Logs);
