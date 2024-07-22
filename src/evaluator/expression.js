export class Binary {
  constructor(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export class Grouping {
  constructor(expression) {
    this.expression = expression;
  }
}

export class Literal {
  constructor(value) {
    this.value = value;
  }
}
