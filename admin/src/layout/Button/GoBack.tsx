import FooterButton from './FooterButton'
import { useNavigate } from 'react-router-dom';

import type { TypeFooterButtonProps } from './FooterButton';

interface TypeGoBackProps
  extends
  Pick<TypeFooterButtonProps, 'onSubmit' | 'onSubmitTips'>,
  Partial<Record<'top' | 'bottom', number>> { }

/**
 * @name GoBack 返回上一页
 * @description 新增了返回功能
 */
const GoBack: React.FC<TypeGoBackProps> = ({ onSubmit, top, bottom, onSubmitTips }) => {

  const navigate = useNavigate();

  return (
    <FooterButton
      align='center'
      onCancelText='返回'
      onSubmit={onSubmit}
      onSubmitTips={onSubmitTips}
      onCancel={() => navigate(-1)}
      style={{ marginTop: top, marginBottom: bottom }} />
  );
};

export default GoBack;
