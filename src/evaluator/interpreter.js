import { Binary, Grouping, Literal } from "./expression";

export class Interpreter {
  constructor(ast) {
    this.ast = ast;
  }

  interpret() {
    return this.evaluate(this.ast);
  }

  evaluate(expression) {
    if (expression instanceof Literal) {
      return this.evaluateLiteral(expression);
    } else if (expression instanceof Grouping) {
      return this.evaluateGrouping(expression);
    } else if (expression instanceof Binary) {
      return this.evaluateBinary(expression);
    } else {
      throw new Error(`Expression type not implemented yet: ${expression}`);
    }
  }

  evaluateBinary(binary) {
    const left = this.evaluate(binary.left);
    const right = this.evaluate(binary.right);

    switch (binary.operator.kind) {
      case "MINUS":
        return Number(left) - Number(right);
      case "SLASH":
        return Number(left) / Number(right);
      case "STAR":
        return Number(left) * Number(right);

      case "PLUS":
        // Homework idea:
        // if we were handling strings here, the plus operator
        // could be overloaded as string concatenation.
        return Number(left) + Number(right);
    }

    throw new Error("Panic! This should be unreachable!");
  }

  evaluateGrouping(grouping) {
    return this.evaluate(grouping.expression);
  }

  evaluateLiteral(literal) {
    return literal.value;
  }
}
