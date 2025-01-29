import { HttpStatusCode } from 'axios';

/**
 * Classe customizada para erros 403 ( Forbidden )
 *
 * @example {
 *  "message": "Ação não autorizada.",
 *  "trace": "EXP9999"
 * }
 */
export class ForbiddenError extends Error {
  public statusCode = HttpStatusCode.Forbidden;

  constructor(public trace: string, public messageResponse?: string, public stack?: string) {
    super(messageResponse);
  }
}
