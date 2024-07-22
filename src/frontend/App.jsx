import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Lexer } from "../evaluator/lexer";

function App() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const tokens = new Lexer(input).scanTokens();
    console.log("tokens", tokens);
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
