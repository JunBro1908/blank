import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [originalText, setOriginalText] = useState("");
  const [quizText, setQuizText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [result, setResult] = useState(null);

  const handleTextSubmit = () => {
    const bracketParts = originalText.match(/\((.*?)\)/g) || [];
    const cleanedParts = bracketParts.map((part) => part.replace(/[()]/g, ""));
    setAnswers(cleanedParts);
    setUserInputs(new Array(cleanedParts.length).fill(""));

    let transformedText = originalText.replace(
      /\((.*?)\)/g,
      (_, p1, index) =>
        `<input class='inline-input' type='text' data-index='${index}' />`
    );
    setQuizText(transformedText);
    setResult(null);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value.trim();
    setUserInputs(newInputs);
  };

  const checkAnswers = () => {
    const feedback = answers.map((answer, index) => ({
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
        onChange={(e) => setOriginalText(e.target.value)}
        rows={4}
      />
      <Button onClick={handleTextSubmit}>문제 만들기</Button>
      {quizText && (
        <div className="p-4 border rounded">
          <p className="mb-2">
            {originalText
              .split(/\((.*?)\)/g)
              .map((part, index) =>
                index % 2 === 0 ? (
                  part
                ) : (
                  <Input
                    key={index}
                    className="inline-block w-20 border-b-2 mx-1"
                    value={userInputs[Math.floor(index / 2)] || ""}
                    onChange={(e) =>
                      handleInputChange(Math.floor(index / 2), e.target.value)
                    }
                  />
                )
              )}
          </p>
          <Button onClick={checkAnswers}>정답 확인</Button>
        </div>
      )}
      {result && (
        <div className="p-4 border rounded mt-4">
          <h3 className="text-lg font-semibold">정답 확인</h3>
          {result.map((item, index) => (
            <p
              key={index}
              className={item.correct ? "text-green-600" : "text-red-600"}
            >
              입력: {item.user || "(빈칸)"} / 정답: {item.expected}
            </p>
          ))}
          <Button onClick={() => setQuizText("")}>다시 하기</Button>
        </div>
      )}
    </div>
  );
}

export default App;
