import { HttpStatusCode } from 'axios';

/**
 * Classe customizada para erros 404 ( Not Found )
 *  *
 * Seu construtor possui:
 *      message: Mensagem mostrado no erro
 *      trace: Código de erro para restreio ao debuggar
 *      stack: Caminho do erro ( opcional )
 *
 * @example {
 *  "message": "Item não encontrado.",
 *  "trace": "EXP9999",
 *  "stack": null
 * }
 */
export class NotFoundError extends Error {
  public statusCode = HttpStatusCode.NotFound;

  constructor(public message: string, public trace: string, public stack?: string) {
    super(message);
  }
}
