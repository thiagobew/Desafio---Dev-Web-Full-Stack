import { useState } from "react";
import InputNumberWithButton from "../components/InputNumberWithButton";

export default function Home() {
  const [kValue, setKValue] = useState("");
  const [answer, setAnswer] = useState(undefined);
  const [statusMessage, setStatusMessage] = useState(null);

  const checkInputAndClearMessages = () => {
    setAnswer(undefined);
    setStatusMessage("Waiting for the answer...");

    if (kValue === "") {
      setStatusMessage("You provided an empty input!");
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    if (!checkInputAndClearMessages()) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/${kValue}`,
      { method: "GET" }
    );

    if (response.status === 200) {
      const { result, time } = await response.json();

      setAnswer({ result, time });
      setStatusMessage(null);
    } else {
      const { error } = await response.json();

      setStatusMessage(error);
    }
  };

  return (
    <div className="w-4/5 self-center pt-5 flex flex-col">
      <InputNumberWithButton
        onClick={handleClick}
        onChange={(e) => setKValue(e.target.value)}
        value={kValue}
      />
      {statusMessage && (
        <p className="self-center text-gray-700 font-semibold pt-3">
          {statusMessage}
        </p>
      )}
      {answer && (
        <div className="flex flex-col pt-3">
          <p className="self-center text-gray-600">Result: {answer.result}</p>
          <p className="self-center text-gray-600">
            Calculated in {answer.time} milliseconds
          </p>
        </div>
      )}
    </div>
  );
}
