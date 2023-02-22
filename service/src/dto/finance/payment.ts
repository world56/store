import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ENUM_FINANCE } from '@/enum/finance';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { FileDTO } from '../common/file.dto';
import { CommonDTO } from '../common/common.dto';

/**
 * @name FinancePaymentDTO 财务应付DTO
 */
export class FinancePaymentDTO extends PickType(CommonDTO, [
  'id',
  'no',
  'remark',
] as const) {
  /**
   * @param type 应付款类型
   */
  @ApiProperty({
    description: '应付款类型',
  })
  @IsEnum(ENUM_FINANCE.FINANCE_PAYABLES_TYPE)
  @IsInt()
  @Type(() => Number)
  type: ENUM_FINANCE.FINANCE_PAYABLES_TYPE;

  /**
   * @param status 付款状态
   */
  @ApiProperty({
    description: '付款状态',
  })
  @IsEnum(ENUM_FINANCE.FINANCIAL_PAYABLES_STATUS)
  @IsInt()
  @Type(() => Number)
  status: ENUM_FINANCE.FINANCIAL_PAYABLES_STATUS;

  /**
   * @param totalAmount 总金额
   */
  @ApiProperty({
    description: '应付总金额',
  })
  @Type(() => Number)
  @IsNumber()
  totalAmount: number;

  /**
   * @param totalAmount 总金额
   */
  @ApiProperty({
    description: '实际付款金额',
  })
  @Type(() => Number)
  @IsNumber()
  actualPayment: number;

  /**
   * @param 付款凭证
   */
  @ApiProperty({ description: '付款凭证' })
  @Type(() => FileDTO)
  @ValidateNested()
  @IsArray()
  vouchers: FileDTO[];
}
