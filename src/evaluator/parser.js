import { Token } from "./token";
import { Binary, Grouping, Literal } from "./expression";

/**
 * @typedef {import('./token.js').Token} Token
 */

/**
 * Here is the little grammar we will implement
 *
 * *********************************************************
 * expression → term ;
 * term       → factor ( ( "-" | "+" ) factor )* ;
 * factor     → power ( ( "/" | "*" ) power )* ;
 * primary    → NUMBER | "(" expression ")" ;
 * *******************************************/
export class Parser {
  /**
   * @type {Array<Token>}
   */
  #tokens = [];
  #current = 0;

  constructor(tokens) {
    this.#tokens = tokens;
  }

  parse() {
    try {
      return this.expression();
    } catch (e) {
      console.error("Could not parse tokens", e);
      return null;
    }
  }

  expression() {
    return this.term();
  }

  term() {
    let expression = this.factor();

    while (this.match("MINUS", "PLUS")) {
      const operator = this.previous();
      const right = this.factor();
      expression = new Binary(expression, operator, right);
    }

    return expression;
  }

  factor() {
    let expression = this.primary();

    while (this.match("SLASH", "STAR")) {
      const operatator = this.previous();
      const right = this.primary();
      expression = new Binary(expression, operatator, right);
    }

    return expression;
  }

  primary() {
    if (this.match("NUMBER")) {
      return new Literal(this.previous().literal);
    }

    if (this.match("LEFT_PAREN")) {
      const expression = this.expression();
      this.consume("RIGHT_PAREN", "Expect ')' after expression");
      return new Grouping(expression);
    }

    throw new Error(
      `unsupported primary expression: literal=${
        this.previous()?.literal
      } lexeme=${this.previous()?.lexeme}
        current=${this.#current}`,
    );
  }

  /**
   * Force eating the given token type.
   * Throw otherwise, with the mismatching arguments
   */
  consume(type, message) {
    if (this.check(type)) {
      return this.advance();
    }

    throw new Error(
      `${message} current=${this.#current} peek=${this.peek().lexeme}`,
    );
  }

  /**
   * If the given list of token types match the next token
   * we can consume and advance to the next token
   */
  match(...types) {
    for (let i = 0; i < types.length; i++) {
      if (this.check(types[i])) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  advance() {
    if (!this.isAtEnd()) {
      this.#current++;
    }

    return this.previous();
  }

  check(type) {
    if (this.isAtEnd()) {
      return false;
    }

    return this.peek().kind == type;
  }

  peek() {
    return this.#tokens[this.#current];
  }
  isAtEnd() {
    return this.peek().kind === "EOF";
  }

  previous() {
    return this.#tokens[this.#current - 1];
  }
}
