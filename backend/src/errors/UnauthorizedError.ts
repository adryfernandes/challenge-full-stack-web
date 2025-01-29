import { HttpStatusCode } from 'axios';

/**
 * Classe customizada para erros 401 ( unauthorized )
 * Sua mensagem é sempre a mesma
 *
 * @example {
 *  "message": "Ação não autorizada.",
 *  "trace": "EXP9999"
 * }
 */
export class UnauthorizedError extends Error {
  public statusCode = HttpStatusCode.Unauthorized;

  constructor(public trace: string) {
    super('Ação não autorizada.');
  }
}
