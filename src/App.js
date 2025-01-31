import "./App.css";
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [originalText, setOriginalText] = useState("");
  const [quizText, setQuizText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [result, setResult] = useState(null);

  const handleTextSubmit = () => {
    if (!originalText.trim()) {
      setQuizText("");
      setAnswers([]);
      setUserInputs([]);
      setResult(null);
      return;
    }

    const bracketParts = originalText.match(/\/(.*?)\//g) || [];
    const cleanedParts = bracketParts.map((part) => part.replace(/[//]/g, ""));
    setAnswers(cleanedParts);
    setUserInputs(new Array(cleanedParts.length).fill(""));

    setQuizText(originalText);
    setResult(null);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  const checkAnswers = () => {
    const feedback = answers.map((answer, index) => ({
      number: index + 1,
      expected: answer,
      user: userInputs[index] || "",
      correct: answer.trim() === (userInputs[index] || "").trim(),
    }));
    setResult(feedback);
  };

  return (
    <div className="quiz-container">
      <textarea
        className="textarea-input"
        placeholder="여기에 문장을 입력하세요 (예: 나는 /막내/를 좋아해)"
        value={originalText}
        onChange={(e) => {
          setOriginalText(e.target.value);
          if (!e.target.value.trim()) {
            setQuizText("");
            setAnswers([]);
            setUserInputs([]);
            setResult(null);
          }
        }}
        rows={4}
      />
      <Button className="button" onClick={handleTextSubmit}>
        문제 만들기
      </Button>
      <div className="quiz-area">
        {quizText && (
          <div className="quiz-box">
            <p className="quiz-text">
              {originalText.split(/\/(.*?)\//g).map((part, index) =>
                index % 2 === 0 ? (
                  part
                ) : (
                  <span key={index} className="blank-wrapper">
                    <span className="blank-number">
                      {Math.floor(index / 2) + 1}
                    </span>
                    <Input
                      className="blank-input"
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        textAlign: "center",
                        padding: "0.125rem 0.5rem",
                        height: "1.25rem",
                        width: `${Math.max(part.length * 16, 30)}px`,
                      }}
                      value={userInputs[Math.floor(index / 2)] || ""}
                      onChange={(e) =>
                        handleInputChange(Math.floor(index / 2), e.target.value)
                      }
                    />
                  </span>
                )
              )}
            </p>
            <Button className="button" onClick={checkAnswers}>
              정답 확인
            </Button>
          </div>
        )}
        {result && quizText && (
          <div className="result-box">
            <h3 className="result-text">정답 확인</h3>
            {result.map((item) => (
              <p
                key={item.number}
                className={item.correct ? "correct" : "incorrect"}
              >
                <span className="font-bold">[{item.number}번]</span> 입력:{" "}
                {item.user || "(빈칸)"} / 정답: {item.expected}
              </p>
            ))}
            <Button
              className="button"
              onClick={() => {
                setUserInputs(new Array(answers.length).fill("")); // 입력값 초기화
                setResult(null); // 정답 결과 초기화
              }}
            >
              다시 하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
