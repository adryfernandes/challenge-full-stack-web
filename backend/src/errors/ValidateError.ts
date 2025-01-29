import { HttpStatusCode } from 'axios';

/**
 * Classe customizada para erros 400 ( Bad Request )
 *
 * Seu construtor possui:
 *      message: Mensagem mostrado no erro
 *      trace: Código de erro para restreio ao debuggar
 *      stack: Caminho do erro ( opcional )
 *
 * @example {
 *  "message": "Campo é obrigatório.",
 *  "trace": "EXP9999",
 *  "stack": null
 * }
 */
export class ValidateError extends Error {
  public statusCode = HttpStatusCode.BadRequest;

  constructor(public message: string, public trace: string, public stack?: string) {
    super(message);
  }
}
