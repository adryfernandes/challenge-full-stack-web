import type {
  ExceptionError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidateError,
} from '@/errors';

export type ControlledErrors =
  | ValidateError
  | NotFoundError
  | UnauthorizedError
  | ExceptionError
  | ForbiddenError;
