import { filterListToTree } from '../utils';
import { Form, Cascader, Tooltip } from 'antd';

import type { EditPermissionProps } from './EditPermission';
import type { TypeSystemPermission } from '@/interface/system/permission';

interface FormItemLocationProps extends Pick<EditPermissionProps, 'id'> {
  /** @param treeData 权限树 */
  treeData?: TypeSystemPermission.InfoTree[];
};

/**
 * @name FormItemLocation 表单-权限所属层级
 */
const FormItemLocation: React.FC<FormItemLocationProps> = ({ id, treeData }) => {

  function diffLocation<T extends Pick<TypeSystemPermission.Info, 'code' | 'name'>>
    (prev: T, next: T) {
    return prev.code !== next.code || prev.name !== next.name;
  };

  return (
    <Form.Item shouldUpdate={diffLocation} noStyle>
      {(form) => {
        const { code, name } = form.getFieldsValue(['code', 'name']);
        const list = filterListToTree(treeData, { code, name, id });
        return <Tooltip placement="top" title='所属层级为空，默认指向一级（最外层）'>
          <Form.Item name="location" label="所属层级">
            <Cascader
              allowClear
              changeOnSelect
              options={list}
              disabled={!code}
              expandTrigger='hover'
              placeholder='请选择所属层级（不选默认一级）'/>
          </Form.Item>
        </Tooltip>
      }}
    </Form.Item>
  );
};

export default FormItemLocation;
