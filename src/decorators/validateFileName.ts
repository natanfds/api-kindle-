import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { validateFileName } from '../utils';

export function ValidateFileName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'validateFileName',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validateFileName(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Invalid file name';
        },
      },
    });
  };
}