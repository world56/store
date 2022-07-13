import FooterButton from './FooterButton'
import { useNavigate } from 'react-router-dom';

import type { TypeFooterButtonProps } from './FooterButton';

interface TypeGoBackProps extends Pick<TypeFooterButtonProps, 'onSumbit'> { };

/**
 * @name GoBack 返回上一页
 */
const GoBack: React.FC<TypeGoBackProps> = ({ onSumbit }) => {

  const navigate = useNavigate();

  return (
    <FooterButton
      align='center'
      onCancelText='返回'
      onSumbit={onSumbit}
      onCancel={() => navigate(-1)} />
  );
};

export default GoBack;
