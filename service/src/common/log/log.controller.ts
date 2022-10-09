import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';
import { InsertLogDTO } from './dto/insert-log.dto';
import { QueryLogListDTO } from './dto/query-log-list.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@ApiTags('日志模块')
@Controller('log')
export class LogController {
  public constructor(private readonly LogService: LogService) {}

  @Get('list')
  getList(@Query() query: QueryLogListDTO) {
    return this.LogService.getLogs(query);
  }

  @Post('insert')
  insert(@Body() body: InsertLogDTO) {
    return this.LogService.insert(body);
  }
}
