import { Type } from 'class-transformer';
import { CommonDTO } from './common.dto';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { PickType, ApiProperty } from '@nestjs/swagger';

/**
 * @name FileDTO 静态资源
 */
export class FileDTO extends PickType(CommonDTO, ['name', 'id']) {
  /**
   * @param userId 上传文件的用户名称
   */
  @ApiProperty({
    description: '上传文件的用户名',
  })
  @IsNumber()
  userId: number;

  /**
   * @param type 文件类型
   */
  @ApiProperty({
    description: '文件类型 服务器自动获取',
  })
  @Type(() => Number)
  @IsInt()
  type: number;

  /**
   * @param url 服务器本机文件路径
   */
  @ApiProperty({
    description: '服务器文件路径',
  })
  @IsString()
  path: string;
}
