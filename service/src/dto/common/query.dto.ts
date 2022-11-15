import {
  PickType,
  PartialType,
  ApiProperty,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonDTO } from './common.dto';
import { Min, IsInt, IsOptional, IsString } from 'class-validator';

/**
 * @name QueryDTO 查询通用DTO
 */
export class QueryDTO extends IntersectionType(
  PartialType(PickType(CommonDTO, ['name'] as const)),
  IntersectionType(
    PartialType(PickType(CommonDTO, ['no'] as const)),
    PickType(CommonDTO, ['id', 'name', 'status', 'userId'] as const),
  ),
) {
  /**
   * @param currentPage 当前页码
   */
  @ApiProperty({
    description: '当前页码',
    required: true,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  currentPage: number;

  /**
   * @param pageSize 每页条数
   */
  @ApiProperty({
    description: '每页条数',
    required: true,
    default: 20,
  })
  @Min(1)
  @Type(() => Number)
  @IsInt()
  pageSize: number;

  /**
   * @name updateTime 更新时间
   */
  @ApiProperty({ description: '更新时间范围' })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ each: true })
  updateTime?: { gte: Date; lt: Date };

  /**
   * @param createTime 时间范围
   */
  @ApiProperty({ description: '时间范围' })
  @Type(() => Number)
  @IsOptional({ message: '1' })
  @IsInt({ each: true, message: '0' })
  createTime?: { gte: Date; lt: Date };

  // /**
  //  * @param no 流水号
  //  */
  // @ApiProperty({
  //   description: '流水号',
  //   required: false,
  // })
  // @IsOptional()
  // @IsString()
  // no?: string;
}
