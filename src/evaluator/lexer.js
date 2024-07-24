import { Token } from "./token";

/**
 * @typedef {import('./token.js').Token} Token
 */

export class Lexer {
  /**
   * @type {string}
   */
  #source;
  /**
   * @type {Array<Token>}
   */
  #tokens = [];
  #start = 0;
  #current = 0;

  constructor(source) {
    this.#source = source;
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.#start = this.#current;
      this.scanToken();
    }

    // We reached the end of the file
    const eof = new Token("EOF", "");

    this.#tokens.push(eof);
    return this.#tokens;
  }

  scanToken() {
    const char = this.advance();

    switch (char) {
      case "(":
        this.addToken("LEFT_PAREN");
        break;
      case ")":
        this.addToken("RIGHT_PAREN");
        break;
      case "+":
        this.addToken("PLUS");
        break;
      case "-":
        this.addToken("MINUS");
        break;
      case "*":
        this.addToken("STAR");
        break;
      case "/":
        this.addToken("SLASH");
        break;
      default:
        if (this.isDigit(char)) {
          this.number();
        }
    }
  }

  number() {
    while (this.isDigit(this.peek())) {
      this.advance();
    }

    // consume floating point values
    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      // consume the dot
      this.advance();
      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }

    // at this point, we've got the entire number (either integer or float)
    // ready to be fully consumed and added as a token
    this.addTokenWithValue(
      "NUMBER",
      Number(this.#source.substring(this.#start, this.#current))
    );
  }

  // Look ahead one after the current, without consuming
  peekNext() {
    if (this.#current + 1 >= this.#source.length) {
      return "\0";
    }

    return this.#source.charAt(this.#current + 1);
  }

  // Look ahead the current token without consuming it
  peek() {
    if (this.isAtEnd()) {
      return "\0";
    }
    return this.#source.charAt(this.#current);
  }

  isDigit(char) {
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
  }

  advance() {
    return this.#source[this.#current++];
  }

  isAtEnd() {
    return this.#current >= this.#source.length;
  }

  addToken(tokenType) {
    this.addTokenWithValue(tokenType, undefined);
  }

  addTokenWithValue(tokenType, literalValue) {
    const text = this.#source.substring(this.#start, this.#current);
    const token = new Token(tokenType, text, literalValue);
    this.#tokens.push(token);
  }
}
