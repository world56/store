import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

import { CommonDTO } from '../common/common.dto';

/**
 * @name FinanceAccount 供应商付款账户DTO
 */
export class FinanceAccountDTO extends PartialType(
  PickType(CommonDTO, ['id', 'remark']),
) {
  /**
   * @param accountName 收款人名称
   */
  @ApiProperty({
    required: true,
    description: '收款人名称',
  })
  @IsString()
  @MaxLength(10)
  accountName: string;

  /**
   * @param accountNumber 收款人账户
   */
  @ApiProperty({
    required: true,
    description: '收款人账户',
  })
  @IsString()
  accountNumber: string;

  /**
   * @param organizationId 账户类型
   */
  @ApiProperty({
    required: true,
    description: '账户类型',
  })
  @IsInt()
  @Type(() => Number)
  organizationId: number;

  /**
   * @param supplierId 供应商ID
   */
  @ApiProperty({
    required: true,
    description: '供应商ID',
  })
  @IsInt()
  @Type(() => Number)
  supplierId: number;
}
