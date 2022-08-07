import { Tooltip } from 'antd';
import { NavLink, type NavLinkProps } from "react-router-dom";

/**
 * @name Link 跳转页面
 * @desc 扩展 React-Router-DOM的title功能
 */
const Link: React.FC<NavLinkProps> = ({ title = '点击查看详情', ...props }) => (
  <Tooltip title={title}>
    <NavLink {...props} />
  </Tooltip>
);

export default Link;
