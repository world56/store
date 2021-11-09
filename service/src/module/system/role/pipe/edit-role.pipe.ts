import {
  HttpStatus,
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsString, IsNumber, Length, validate } from 'class-validator';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';
import type { TypeSystemRole } from '@/interface/system/role';

class EditRoleValidator
  implements
    Omit<
      TypeSystemRole.EditRoleParam,
      keyof TypeCommon.DatabaseMainParameter | 'createTime'
    >
{
  @Length(2, 6)
  @IsString()
  name: string;

  @IsNumber()
  status: ENUM_COMMON.STATUS;

  description: string;
}

/**
 * @name EditRolePipe 新增、编辑角色详情
 */
@Injectable()
export class EditRolePipe implements PipeTransform {
  async transform(
    value: TypeSystemRole.EditRoleParam,
    metadata: ArgumentMetadata,
  ) {
    const format = plainToClass(EditRoleValidator, value);
    const errors = await validate(format);
    if (errors.length) {
      throw new HttpException(errors.toString(), HttpStatus.FAILED_DEPENDENCY);
    }
    return value;
  }
}
