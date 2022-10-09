import { Comment } from "antd";
import { useRequest } from "ahooks";
// import { useCategorys } from "@/hooks";
import { getLogs } from "@/api/common";
import { toTime } from "@/utils/format";
import StatusColor from "@/layout/Status";
import Container from './components/Container';

import type { TypeLog } from "@/interface/log";
import type { TypeCommon } from "@/interface/common";

interface TypeLogsProps extends TypeCommon.DatabaseMainParameter, Pick<TypeLog.QueryList, 'module'> {
  /**
   * @name onClose 传递该参数则为抽屉打开
   */
  onClose?(): void;
};

// const { ENUM_CATEGORY } = useCategorys;

/**
 * @name Logs 日志
 */
const Logs: React.FC<TypeLogsProps> = ({
  module,
  onClose,
  id: relationId,
}) => {

  // const { ADMIN_USER } = useCategorys([ENUM_CATEGORY.ADMIN_USER]);

  const { data, loading } = useRequest(() => getLogs({ relationId, module }), {
    refreshDeps: [relationId, module]
  });

  const statusStyle: React.CSSProperties = {
    right: 0,
    position: 'absolute',
    top: onClose ? 1 : -2,
    fontSize: onClose ? 13 : 14,
  };

  // console.log('@-ADMIN_USER', ADMIN_USER);

  return (
    <Container
      title='采购日志'
      loading={loading}
      onCancel={onClose}
      visible={Boolean(relationId)}>
      {data?.map(v => <Comment
        key={v._id}
        author={v.creatorId}
        avatar='https://joeschmoe.io/api/v1/random'
        content={v.remark}
        datetime={
          <>
            <span>{toTime(v.createTime)}</span>
            <StatusColor status={v.type} style={statusStyle} />
          </>
        }
      />)}
    </Container>
  );
};

export default Logs;
