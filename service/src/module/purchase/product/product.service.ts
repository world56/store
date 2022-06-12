import { Injectable } from '@nestjs/common';
import { PurchaseProductDTO } from '@/dto/purchase-product.dto';

@Injectable()
export class ProductService {
  getList() {
    return {
      count: 0,
      list: [],
    };
  }

  insert(dto: PurchaseProductDTO) {}
}