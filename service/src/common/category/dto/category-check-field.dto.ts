import { PartialType } from '@nestjs/swagger';
import { CategoryDTO } from '@/dto/common/category.dto';

/**
 * @name CategoryCheckFieldDTO 检查字段是否重复
 */
export class CategoryCheckFieldDTO extends PartialType(CategoryDTO) {}
