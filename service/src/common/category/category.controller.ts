import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDTO } from '@/dto/common/category.dto';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryListQueryDTO } from './dto/category-list-query.dto';
import { CategoryCheckFieldDTO } from './dto/category-check-field.dto';

@ApiTags('类目类型管理')
@Controller('category')
export class CategoryController {
  public constructor(private readonly CategoryService: CategoryService) {}

  @Get('list')
  getAll(@Query() query: CategoryListQueryDTO) {
    return this.CategoryService.getList(query);
  }

  @Get('check')
  check(@Query() query: CategoryCheckFieldDTO) {
    return this.CategoryService.checkFields(query);
  }

  @Post('insert')
  insert(@Body() data: CategoryDTO) {
    return this.CategoryService.insert(data);
  }

  @Post('details')
  details(@Body() data: PrimaryKeyDTO) {
    return this.CategoryService.getDetails(data);
  }

  @Post('update')
  update(@Body() data: CategoryDTO) {
    return this.CategoryService.update(data);
  }
}
