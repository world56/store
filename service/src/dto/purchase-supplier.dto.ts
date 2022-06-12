import { Type } from 'class-transformer';
import { CommonDTO } from './common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsInt,
  IsArray,
  IsString,
  IsOptional,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { FileDTO } from './file.dto';

/**
 * @name PurchaseSupplierContactsDTO 供应商联系方式
 */
export class PurchaseSupplierContactsDTO extends PickType(CommonDTO, [
  'id',
  'name',
  'remark',
]) {
  /**
   * @param phone 联系电话
   */
  @ApiProperty({
    description: '联系电话',
  })
  @IsString()
  phone: string;
}

/**
 * @name PurchaseSupplier 供应商
 */
export class PurchaseSupplierDTO extends PickType(CommonDTO, [
  'id',
  'name',
  'status',
  'remark',
]) {
  /**
   * @param phone 公司电话
   */
  @ApiProperty({ description: '公司电话' })
  @MaxLength(11, { message: '中国大陆地区座机、移动电话号码限长11位' })
  @IsString()
  phone: string;

  /**
   * @param address 公司电话
   */
  @ApiProperty({ description: '公司地址' })
  @IsString()
  address: string;

  /**
   * @param category 供应商类型
   */
  @ApiProperty({ description: '供应商类型' })
  @Type(() => Number)
  @IsInt({ each: true })
  category: number[];

  /**
   * @param contacts 联系方式
   */
  @ApiProperty({ description: '联系方式' })
  @ValidateNested({ each: true })
  @Type(() => PurchaseSupplierContactsDTO)
  @IsArray()
  contacts: PurchaseSupplierContactsDTO[];

  /**
   * @param files 📎 附件
   */
  @ApiProperty({ description: '附件' })
  @ValidateNested({ each: true })
  @Type(() => FileDTO)
  @IsArray()
  @IsOptional()
  files?: FileDTO[];
}
