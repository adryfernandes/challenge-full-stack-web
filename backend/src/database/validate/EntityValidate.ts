import type { ValidationError } from 'class-validator';
import { validate } from 'class-validator';

export class EntityValidate {
  private validationErrors: ValidationError[] = [];

  constructor(private entity: object) {}

  get errors(): ValidationError[] {
    return this.validationErrors;
  }

  get hasError(): boolean {
    return this.validationErrors.length > 0;
  }

  async validate() {
    this.validationErrors = await validate(this.entity);
  }

  getMessage(): string | undefined {
    if (this.hasError) {
      const firstError = this?.errors[0];
      const constraints = firstError?.constraints;

      if (constraints) {
        const constraintMessages = Object.values(constraints);
        return constraintMessages?.[0];
      }
    }

    return undefined;
  }
}
