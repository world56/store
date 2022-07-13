import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class WarehousingService {
  public constructor(private readonly PrismaService: PrismaService) {}

  getList() {
    return [];
  }
}
