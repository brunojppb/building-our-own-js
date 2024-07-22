export class Token {
  /**
   * Create a Token
   * @param {"LEFT_PAREN" | "RIGHT_PAREN" | "PLUS" | "MINUS" | "STAR" | "SLASH" | "NUMBER" | "EOF"} kind - Kind of token we are dealing with
   * @param {string} lexeme - Lexeme representing this token
   * @param {string} [literal] - Literal value representation if any
   */
  constructor(kind, lexeme, literal) {
    this.kind = kind;
    this.lexeme = lexeme;
    this.literal = literal;
  }
}
