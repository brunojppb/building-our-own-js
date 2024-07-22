import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Lexer } from "../evaluator/lexer";
import { Parser } from "../evaluator/parser";

function App() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const tokens = new Lexer(input).scanTokens();
    console.log("tokens", tokens);
    const ast = new Parser(tokens).parse();
    console.log("AST", ast);
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
      </div>
    </div>
  );
}

export default App;
