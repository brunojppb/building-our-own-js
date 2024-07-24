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
        <div className="interpreter-result">
          <h2>Interpreter Result</h2>
          <div className="result">{result}</div>
        </div>
        <div className="eval">
          <h2>Eval result (sanity check)</h2>
          <div className="result">{evalResut}</div>
        </div>
      </div>

      <div className="links">
        <img
          src="/QR.png"
          alt="QR Code to https://building-our-own-js.pages.dev/"
        />
        <p>
          Built with <span alt="heart">❤️</span> by{" "}
          <a href="https://github.com/brunojppb">Bruno Paulino</a> for the{" "}
          <a href="https://www.thegeekconf.com/">GeekConf</a>
          <br />
          Source available at{" "}
          <a href="https://github.com/brunojppb/building-our-own-js">here</a>.
        </p>
      </div>
      <div className="ast">
        <ASTExplorer ast={ast} />
      </div>
    </div>
  );
}

export default App;
