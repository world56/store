import AddLog from "./Add";
import { Comment } from "antd";
// import { toTime } from "@/utils";
import { useRequest } from "ahooks";
import { Drawer } from "@/layout/PopUp";
import styles from './index.module.sass';
// import StatusColor from "@/layout/StatusColor";
// import { getPurchaseOrderLogs } from "@/api/purchase";

// import { ORDER_STATUS_COLOR } from "../utils";

import type { TypeCommon } from "@/interface/common";

interface TypeLogsProps extends TypeCommon.DatabaseMainParameter {
  onClose(): void;
};

/**
 * @name Logs 日志 （暂不启用）
 */
const Logs: React.FC<TypeLogsProps> = ({ id, onClose }) => {

  const { loading } = useRequest(async () => {
    // return id ? getPurchaseOrderLogs({ id }) : [];
  }, { refreshDeps: [id] });

  function onCancel() {
    onClose();
  };

  return (
    <Drawer
      title='采购日志'
      loading={loading}
      visible={Boolean(id)}
      onCancel={onCancel}
      className={styles.logs}>
      <Comment
        author='张学友'
        avatar='https://joeschmoe.io/api/v1/random'
        content='remarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremark'
        datetime={
          <>
            <span>2020-12-12 01:01:01</span>
            {/* <StatusColor status={1} className={styles.status} /> */}
          </>
        }
      />

      <Comment
        author='里黑帅'
        avatar='https://joeschmoe.io/api/v1/random'
        content='审核通过'
        datetime={
          <>
            <span>2020-12-12 01:01:01</span>
            {/* <StatusColor status={1} className={styles.status} /> */}
          </>
        }
      />
      {/* <AddLog /> */}
    </Drawer>
  );
};

export default Logs;
