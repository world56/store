import { isValidObjectId, Schema } from 'mongoose';
import { DB_PRIMARY_KEY } from '@/config/db';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import type { TypeCommon } from '@/interface/common';

@Injectable()
export class QueryPrimaryKeyPipe implements PipeTransform {
  private defaultPrimaryKey: string = DB_PRIMARY_KEY;

  public constructor(PrimaryKeyField?: string) {
    if (PrimaryKeyField) {
      this.defaultPrimaryKey = PrimaryKeyField;
    }
  }

  transform(
    value: Partial<TypeCommon.DatabaseMainParameter> = {},
    metadata: ArgumentMetadata,
  ) {
    // const mainID = value[this.defaultPrimaryKey];
    // if (!isValidObjectId(mainID)) {
    //   return Object.fromEntries(
    //     Object.entries(value).filter(([k]) => k !== this.defaultPrimaryKey),
    //   );
    // }
    if (value[this.defaultPrimaryKey]) {
      value[this.defaultPrimaryKey] = new Schema.Types.ObjectId(
        value[this.defaultPrimaryKey],
      );
    }
    return value;
  }
}
