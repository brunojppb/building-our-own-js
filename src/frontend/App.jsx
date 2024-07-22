import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Lexer } from "../evaluator/lexer";
import { Parser } from "../evaluator/parser";
import { Interpreter } from "../evaluator/interpreter";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    try {
      const tokens = new Lexer(input).scanTokens();
      const ast = new Parser(tokens).parse();
      const value = new Interpreter(ast).interpret();
      setResult(value);
    } catch (error) {
      setResult(error.message);
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
        <h2>Result</h2>
        <span className="result">{result}</span>
      </div>
    </div>
  );
}

export default App;
