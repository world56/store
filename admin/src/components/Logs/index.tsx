import { memo } from 'react';
import { Comment } from "antd";
import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import { useCategorys } from "@/hooks";
import { getLogs } from "@/api/common";
import { toTime } from "@/utils/format";
import Container from './components/Container';

import type { TypeLog } from "@/interface/log";
import type { TypeCommon } from "@/interface/common";

interface TypeLogsProps extends Partial<TypeCommon.DatabaseMainParameter>, Pick<TypeLog.QueryList, 'module'> {
  /**
   * @name onClose 传递该参数则为抽屉打开
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

  const { ADMIN_USER } = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const { data, loading } = useRequest(async () => relationId ? getLogs({ relationId, module }) : [], {
    refreshDeps: [relationId, module]
  });

  const statusStyle: React.CSSProperties = {
    right: 0,
    position: 'absolute',
    top: onClose ? 1 : -2,
    fontSize: onClose ? 13 : 14,
  };

  return (
    <Container
      title='采购日志'
      loading={loading}
      onCancel={onClose}
      visible={Boolean(relationId)}>
      {data?.map(v => {
        const user = ADMIN_USER?.OBJ?.[v.creatorId];
        return <Comment
          key={v._id}
          author={user?.name}
          avatar={user?.avatar}
          content={v.remark}
          datetime={
            <>
              <span>{toTime(v.createTime)}</span>
              <Status status={v.type} style={statusStyle} matching={Status.type.WAREHOUSING_STATUS} />
            </>
          }
        />
      })}
    </Container>
  );
};

export default memo(Logs);
