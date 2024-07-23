import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Lexer } from "../evaluator/lexer";
import { Parser } from "../evaluator/parser";
import { Interpreter } from "../evaluator/interpreter";
import { ASTExplorer } from "./AstExplorer";

function App() {
  const [input, setInput] = useState("");
  const [ast, setAst] = useState();
  const [result, setResult] = useState("");
  const [evalResut, setEvalResult] = useState("");

  useEffect(() => {
    try {
      const tokens = new Lexer(input).scanTokens();
      const ast = new Parser(tokens).parse();
      const value = new Interpreter(ast).interpret();
      setAst(ast);
      setResult(value);
    } catch (error) {
      setResult(error.message);
      setAst(undefined);
    }
  }, [input]);

  useEffect(() => {
    try {
      // biome-ignore lint/security/noGlobalEval: Just for demo purposes. Don't do this at home.
      const result = eval(input);
      setEvalResult(result);
    } catch (error) {
      setEvalResult(error.message);
    }
  }, [input]);

  return (
    <div className="container">
      <div className="input">
        <textarea
          placeholder="Enter your expression here"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="output">
        <div className="result-wrapper">
          <h2>Interpreter Result</h2>
          <span className="result">{result}</span>
          <div>
            <h2>Eval result</h2>
            <span className="result">{evalResut}</span>
          </div>
        </div>
        <div className="ast-wrapper">
          <ASTExplorer ast={ast} />
        </div>
      </div>
    </div>
  );
}

export default App;
