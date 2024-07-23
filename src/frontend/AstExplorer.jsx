/* eslint-disable react/prop-types */
import { Binary, Grouping, Literal } from "../evaluator/expression";
import "./ast.css";

export function ASTExplorer({ ast }) {
  return (
    <div>
      <h2 className="header">AST Explorer</h2>
      <ASTNode node={ast} />
    </div>
  );
}

function ASTNode({ node }) {
  if (typeof node === "undefined") {
    return "undefined AST taken as props";
  }

  if (node instanceof Literal) {
    return <div className="node">literal: {node.value}</div>;
  }

  if (node instanceof Binary) {
    return (
      <div className="node">
        Binary
        <ASTNode node={node.left} />
        <div className="node">
          <span className="operator">operator:</span>{" "}
          <span className="lexeme">{node.operator.lexeme}</span>
        </div>
        <ASTNode node={node.right} />
      </div>
    );
  }

  if (node instanceof Grouping) {
    return (
      <div className="node">
        Grouping
        <ASTNode node={node.expression} />
      </div>
    );
  }

  throw new Error(`unsupported AST node: ${node}`);
}
