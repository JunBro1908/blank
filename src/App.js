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

    const bracketParts = originalText.match(/\((.*?)\)/g) || [];
    const cleanedParts = bracketParts.map((part) => part.replace(/[()]/g, ""));
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
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <textarea
        className="w-full p-4 border rounded"
        placeholder="여기에 문장을 입력하세요 (예: 나는 (사과)를 좋아해)"
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
      <Button onClick={handleTextSubmit}>문제 만들기</Button>
      {quizText && (
        <div className="p-4 border rounded">
          <p className="mb-2">
            {originalText.split(/\((.*?)\)/g).map((part, index) =>
              index % 2 === 0 ? (
                part
              ) : (
                <span key={index} className="relative inline-block mx-1">
                  <span className="absolute -top-2 -left-2 bg-gray-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {Math.floor(index / 2) + 1}
                  </span>
                  <Input
                    className="inline-block border-b border-black text-center px-2 py-0.5"
                    style={{
                      width: `${Math.max(part.length * 16, 30)}px`,
                      minWidth: "30px",
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
          <Button onClick={checkAnswers}>정답 확인</Button>
        </div>
      )}
      {result && quizText && (
        <div className="p-4 border rounded mt-4">
          <h3 className="text-lg font-semibold">정답 확인</h3>
          {result.map((item) => (
            <p
              key={item.number}
              className={item.correct ? "text-green-600" : "text-red-600"}
            >
              <span className="font-bold">[{item.number}번]</span> 입력:{" "}
              {item.user || "(빈칸)"} / 정답: {item.expected}
            </p>
          ))}
          <Button
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
  );
}

export default App;
