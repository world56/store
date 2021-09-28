import type { Model, Document } from 'mongoose';

export namespace TypeDatabase {
  export type TypeMongoose<T> = Model<T & Document>;
}
 