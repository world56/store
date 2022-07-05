import { registerDecorator, ValidatorConstraint } from 'class-validator';

import type {
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class ConvertToMoney implements ValidatorConstraintInterface {
  validate(userName: string, args: ValidationArguments) {
    return true
  }
}

export function Money(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: ConvertToMoney.name,
      target: ConvertToMoney.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ConvertToMoney,
    });
  };
}
