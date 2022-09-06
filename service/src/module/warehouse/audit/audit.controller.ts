import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';

@ApiTags('入库审核')
@Controller('audit')
export class AuditController {
  public constructor(private readonly AuditService: AuditService) {}

  @Get('list')
  getList() {}
}
