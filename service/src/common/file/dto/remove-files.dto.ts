import { CommonDTO } from '@/dto/common.dto';
import { PickType } from '@nestjs/swagger';

/**
 * @name RemoveFilesDTO 批量删除文件
 */
export class RemoveFilesDTO extends PickType(CommonDTO, ['ids'] as const) {}
