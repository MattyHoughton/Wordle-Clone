import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const App: React.FC = () => {
  const wordLength = 5; // Word length is fixed to 5 letters
  const [guess, setGuess] = useState(""); // State to hold the current guess
  const [result, setResult] = useState<string[] | null>(null); // State to hold the result of the guess

  // Function to make a guess and get the result from the backend
  const makeGuess = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/guess", {
        guess,
      }); // Use the full backend URL
      setResult(response.data.result);
    } catch (error) {
      console.error("Error making guess:", error);
    }
  };

  return (
    <div className="app">
      <h1>Wordle Clone</h1>
      <p>Word length: {wordLength}</p> {/* Display the word length */}
      <input
        type="text"
        value={guess}
        onChange={(e) => {
          const input = e.target.value;
          if (input.length <= wordLength) {
            // Allow input only if it's within the word length
            setGuess(input);
          }
        }}
        maxLength={wordLength} // Set max length of input to word length
      />
      <button onClick={makeGuess} disabled={guess.length !== wordLength}>
        {" "}
        {/* Enable button only if guess is of correct length */}
        Guess
      </button>
      {result && (
        <div>
          <h2>Result</h2>
          <ul>
            {result.map((r, index) => (
              <li
                key={index}
                className={
                  r === "correct" ? "result-correct" : "result-incorrect"
                }
              >
                {r}
              </li> // Display the result of each letter
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
