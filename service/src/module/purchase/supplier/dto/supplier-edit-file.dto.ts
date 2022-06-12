import { Type } from 'class-transformer';
import { FileDTO } from '@/dto/file.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PurchaseSupplierDTO } from '@/dto/purchase-supplier.dto';
import { ValidateNested } from 'class-validator';

/**
 * @name SupplierAddFileDTO 编辑、上传文件
 */
export class SupplierAddFileDTO extends PickType(PurchaseSupplierDTO, [
  'id',
] as const) {
  /**
   * @name file 文件信息
   */
  @ApiProperty({ description: '文件信息' })
  @ValidateNested()
  @Type(() => FileDTO)
  file: FileDTO;
}
