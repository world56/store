import { PickType } from '@nestjs/swagger';
import { CommonDTO } from '@/dto/common/common.dto';

/**
 * @name RemoveFilesDTO 批量删除文件
 */
export class RemoveFilesDTO extends PickType(CommonDTO, ['ids'] as const) {}
