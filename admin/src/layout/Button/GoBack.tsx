import FooterButton from './FooterButton'
import { useNavigate } from 'react-router-dom';

import type { TypeFooterButtonProps } from './FooterButton';

interface TypeGoBackProps
  extends
  Pick<TypeFooterButtonProps, 'onSumbit'>,
  Partial<Record<'top' | 'bottom', number>> { }


/**
 * @name GoBack 返回上一页
 */
const GoBack: React.FC<TypeGoBackProps> = ({ onSumbit, top, bottom }) => {

  const navigate = useNavigate();

  return (
    <FooterButton
      align='center'
      onCancelText='返回'
      onSumbit={onSumbit}
      onCancel={() => navigate(-1)}
      style={{ marginTop: top, marginBottom: bottom }} />
  );
};

export default GoBack;
