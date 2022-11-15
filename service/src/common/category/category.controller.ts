import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDTO } from '@/dto/common/category.dto';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryListQueryDTO } from './dto/category-list-query.dto';
import { CategoryCheckFieldDTO } from './dto/category-check-field.dto';

@ApiTags('类目枚举管理')
@Controller('category')
export class CategoryController {
  public constructor(private readonly CategoryService: CategoryService) {}

  @ApiOperation({ summary: '类目集合列表' })
  @Get('list')
  getAll(@Query() query: CategoryListQueryDTO) {
    return this.CategoryService.getList(query);
  }

  @ApiOperation({ summary: '获取类目详情' })
  @Post('details')
  details(@Body() data: PrimaryKeyDTO) {
    return this.CategoryService.getDetails(data);
  }

  @ApiOperation({ summary: '新增类目' })
  @Post('insert')
  insert(@Body() data: CategoryDTO) {
    return this.CategoryService.insert(data);
  }

  @ApiOperation({ summary: '编辑类目' })
  @Post('update')
  update(@Body() data: CategoryDTO) {
    return this.CategoryService.update(data);
  }

  @ApiOperation({ summary: '检查类目名称是否重复' })
  @Get('check')
  check(@Query() query: CategoryCheckFieldDTO) {
    return this.CategoryService.checkFields(query);
  }
}
