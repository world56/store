import { QueryListPipe } from '@/pipe/query-list.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrimaryKeyDTO } from '@/dto/common/common.dto';
import { DepartmentService } from './department.service';
import { DepartmentDTO } from '@/dto/system/department.dto';
import { DepartmentQueryListDTO } from './dto/department-query-list.dto';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CheckFieldsIsRepeatDTO } from '@/dto/common/check-fields-is-repeat.dto';

@ApiTags('系统管理-部门管理')
@Controller('system/department')
export class DepartmentController {
  constructor(private readonly DepartmentService: DepartmentService) {}

  @ApiOperation({ summary: '部门列表' })
  @UsePipes(new QueryListPipe())
  @Get('list')
  getList(@Query() query: DepartmentQueryListDTO) {
    return this.DepartmentService.getList(query);
  }

  @ApiOperation({ summary: '获取所有部门' })
  @Get('all')
  getAllDepartment() {
    return this.DepartmentService.getAll();
  }

  @ApiOperation({ summary: '获取部门详情' })
  @Post('details')
  getDetails(@Body() data: PrimaryKeyDTO) {
    return this.DepartmentService.getDetails(data);
  }

  @ApiOperation({ summary: '新增部门' })
  @Post('insert')
  insert(@Body() body: DepartmentDTO) {
    return this.DepartmentService.intert(body);
  }

  @ApiOperation({ summary: '编辑部门信息' })
  @Post('update')
  update(@Body() body: DepartmentDTO) {
    return this.DepartmentService.update(body);
  }

  @ApiOperation({ summary: '删除部门' })
  @Post('remove')
  remove(@Body() body: PrimaryKeyDTO) {
    return this.DepartmentService.remove(body);
  }

  @ApiOperation({ summary: '检查部门字段是否重复' })
  @Get('check')
  checkRepeat(@Query() query: CheckFieldsIsRepeatDTO) {
    return this.DepartmentService.checkFields(query);
  }
}
