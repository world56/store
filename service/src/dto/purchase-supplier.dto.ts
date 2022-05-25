import { Type } from 'class-transformer';
import { CommonDTO } from './common.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsInt,
  IsArray,
  IsString,
  IsOptional,
  ValidateNested,
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
   * @param address 联系地址
   */
  @ApiProperty({
    description: '联系地址',
  })
  @IsString()
  address: string;

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
   * @param type 供应商类型
   */
  @ApiProperty({ description: '供应商类型' })
  @Type(() => Number)
  @IsInt({ each: true })
  type: number[];

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
  @IsOptional()
  @Type(() => FileDTO)
  @IsArray()
  files: FileDTO[];
}
