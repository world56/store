import { Image } from 'antd';
import styles from './index.module.sass';

import { STATIC_RESOURCE } from '@/config/request';

import type { TypeCommon } from '@/interface/common';

interface TypePreviewPictureProps {
  pictures: TypeCommon.File[];
};

/**
 * @name PreviewPicture 预览图片
 */
const PreviewPicture: React.FC<TypePreviewPictureProps> = ({ pictures }) => (
  <div className={styles.images}>
    <Image.PreviewGroup>
      {pictures.map(v => <Image key={v.id} src={`${STATIC_RESOURCE}/${v.path}`} />)}
    </Image.PreviewGroup>
  </div>
);

export default PreviewPicture;
