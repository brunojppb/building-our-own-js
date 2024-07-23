/* eslint-disable react/prop-types */
import { Binary, Grouping, Literal } from "../evaluator/expression";

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
    return <div style={{ paddingLeft: "16px" }}>literal: {node.value}</div>;
  }

  if (node instanceof Binary) {
    return (
      <div style={{ paddingLeft: "16px" }}>
        <ASTNode node={node.left} />
        <div style={{ paddingLeft: "16px" }}>{node.operator.lexeme}</div>
        <ASTNode node={node.right} />
      </div>
    );
  }

  if (node instanceof Grouping) {
    return (
      <div style={{ paddingLeft: "16px" }}>
        <ASTNode node={node.expression} />
      </div>
    );
  }

  throw new Error(`unsupported AST node: ${node}`);
}
