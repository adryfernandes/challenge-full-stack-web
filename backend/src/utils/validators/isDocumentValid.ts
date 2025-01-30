import { isValid } from '@fnando/cpf';
import type { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsDocumentValid implements ValidatorConstraintInterface {
  validate(value: string) {
    return isValid(value);
  }

  defaultMessage() {
    return 'The document provided is invalid.';
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDocumentValid,
    });
  };
}
