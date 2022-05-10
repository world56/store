import {
  PickType,
  ApiProperty,
  PartialType,
  IntersectionType,
} from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommonDTO, PrimaryKeyDTO } from './common.dto';

/**
 * @name FileDTO 静态资源
 */
export class FileDTO extends PickType(CommonDTO, ['name']) {
  /**
   * @param userId 上传文件的用户名称
   */
  @IsNumber()
  userId: number;

  /**
   * @param type 文件类型
   */
  @IsString()
  type: string;

  /**
   * @param url 服务器本机文件路径
   */
  @ApiProperty({
    description: '服务器文件路径',
  })
  @IsString()
  url: string;
}
