import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AuditService {
  public constructor(private readonly PrismaService: PrismaService) {}
}
