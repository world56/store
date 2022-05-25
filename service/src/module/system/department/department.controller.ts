import { ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common.dto';
import { DepartmentDTO } from '@/dto/department.dto';
import { QueryListPipe } from '@/pipe/query-list.pipe';
import { DepartmentService } from './department.service';
import { DepartmentQueryListDTO } from './dto/department-query-list.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

@ApiTags('部门管理')
@Controller('system/department')
export class DepartmentController {
  constructor(private readonly DepartmentService: DepartmentService) {}

  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: DepartmentQueryListDTO) {
    return this.DepartmentService.getList(query);
  }

  @Get('check')
  checkRepeat(@Query() query: DepartmentDTO) {
    return this.DepartmentService.checkFields(query);
  }

  @Get('all')
  getAllDepartment() {
    return this.DepartmentService.getAll();
  }

  @Post('details')
  getDetails(@Body() data: PrimaryKeyDTO) {
    return this.DepartmentService.getDetails(data);
  }

  @Post('insert')
  insert(@Body() body: DepartmentDTO) {
    return this.DepartmentService.intert(body);
  }

  @Post('update')
  update(@Body() body: DepartmentDTO) {
    return this.DepartmentService.update(body);
  }

  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.DepartmentService.remove(body);
  }
}
