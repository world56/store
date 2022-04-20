import { ApiTags } from '@nestjs/swagger';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { DepartmentQueryListDTO } from './dto/department-query-list.dto';

@ApiTags('部门管理')
@Controller('department')
export class DepartmentController {
  @UsePipes(new QueryListPipe())
  @Get('/list')
  getList(@Query() query: DepartmentQueryListDTO) {
    return query;
  }
}
