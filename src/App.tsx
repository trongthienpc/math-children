import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import congratulation from "./assets/congratulation.mp3";
import fireMp3 from "./assets/fire.mp3";
import "./App.css";

function App() {
  // const [color, setColor] = useState("");

  const [answer, setAnswer] = useState<number[]>([]);
  const [active, setActive] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<number | undefined>(undefined);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [numOne, setNumOne] = useState<number>(0);
  const [numTwo, setNumTwo] = useState<number>(0);
  const [mark, setMark] = useState(0);
  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: any, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(500 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);
  const generators = () => {
    const one = numberRandom();
    setNumOne(one);
    const two = numberRandom();
    setNumTwo(two);
    const resultNumber = one + two;
    console.log(resultNumber);
    setResult(resultNumber);
    setAnswer(
      [resultNumber, resultNumber - 2, resultNumber + 2].sort(
        () => 0.5 - Math.random()
      )
    );
  };
  useEffect(() => {
    generators();
  }, []);

  enum Result {
    Correct,
    Wrong,
  }

  const numberRandom = () => {
    return Math.floor(Math.random() * 100);
  };
  const handleAnswer = (answer: number) => {
    console.log(answer);
    // answer is true
    if (answer === result) {
      setIsCorrect(true);
      setMark(mark + 1);
      fire();
      generators();
      let audioPlayer = new Audio(congratulation);
      audioPlayer.play();
    } else {
      let audioPlayer = new Audio(fireMp3);
      audioPlayer.play();
      setIsCorrect(false);
      setMark(mark - 1);
      setActive(answer);
    }
    // answer is false
  };

  return (
    <div className="App">
      <div className="col math">
        <label htmlFor="" className="number">
          {numOne}
        </label>
        <label htmlFor="" className="operator">
          +
        </label>
        <label htmlFor="" className="number">
          {numTwo}
        </label>
        <label htmlFor="" className="operator">
          =
        </label>
        <label htmlFor="" className="number">
          ?
        </label>
      </div>
      <div className="answer">
        {answer.map((answer, index) => (
          <button
            key={index}
            style={
              active === answer
                ? {
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }
                : {}
            }
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <div>
        <label htmlFor="" className="result">
          Your mark: {mark}
        </label>
      </div>
      <div className="confetti">
        <ReactCanvasConfetti
          refConfetti={getInstance}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default App;
