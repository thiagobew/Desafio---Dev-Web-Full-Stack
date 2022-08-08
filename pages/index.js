import { useState, useEffect } from "react";
import InputNumberWithButton from "../components/InputNumberWithButton";
import HistoryTable from "../components/HistoryTable";

export default function Home() {
  const [kValue, setKValue] = useState("");
  const [answer, setAnswer] = useState(undefined);
  const [inputMessage, setInputMessage] = useState(null);
  const [dbMessage, setDbMessage] = useState("Loading history...");
  const [records, setRecords] = useState(undefined);

  useEffect(() => {
    async function fetchRecords() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/history/findRecords`
      );
      const records = await response.json();
      if (records.error) {
        setDbMessage(records.error);
        return;
      }

      if (records.length !== 0) {
        setRecords(records);
      } else {
        setDbMessage("No history found.");
      }
    }
    fetchRecords();
  }, []);

  const handleSave = async (result, time) => {
    setInputMessage("Saving results to database...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/history/createRecord`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: Number(kValue), result, time }),
      }
    );
    const record = await response.json();
    setInputMessage(null);

    if (record.error) {
      setDbMessage(record.error);
      return;
    }

    records ? setRecords([record, ...records]) : setRecords([record]);
  };

  const checkInputAndClearMessages = () => {
    setAnswer(undefined);
    setInputMessage("Waiting for the answer...");

    if (kValue === "") {
      setInputMessage("You provided an empty input!");
      return false;
    }

    if (kValue.includes(".") || kValue.includes(",")) {
      setInputMessage("You did not provide an integer!");
      return false;
    }

    return true;
  };

  const handleClick = async () => {
    if (!checkInputAndClearMessages()) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/${kValue}`,
      { method: "GET" }
    );

    if (response.status === 200) {
      const { result, time } = await response.json();

      setAnswer({ result, time });
      handleSave(result, time);
    } else {
      const { error } = await response.json();

      setInputMessage(error);
    }
  };

  const deleteRow = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/history/${id}`,
      { method: "DELETE" }
    );
    const record = await response.json();
    if (record.error) {
      setDbMessage(record.error);
      return;
    }

    const newRecords = records.filter((record) => record.id !== id);

    newRecords.length > 0 ? setRecords(newRecords) : setRecords(null),
      setDbMessage("No history found.");
  };

  return (
    <div className="justify-center items-center flex flex-col">
      <div className="pt-2 text-center w-1/2 text-gray-600">
        <h1>
          This application computes, for a given integer{" "}
          <span className="font-semibold italic">k</span>, how many positive
          integers <span className="font-semibold italic">n</span> smaller than{" "}
          <span className="font-semibold italic">k</span> are there, for{" "}
          <span className="font-semibold italic">n</span> and{" "}
          <span className="font-semibold italic">n + 1</span> with the same
          number of positive divisors.
        </h1>
      </div>
      <div className="w-4/5 self-center pt-5 flex flex-col h-44">
        <InputNumberWithButton
          onClick={handleClick}
          onChange={(e) => setKValue(e.target.value)}
          value={kValue}
        />
        {inputMessage && (
          <p className="self-center text-gray-700 font-semibold pt-3">
            {inputMessage}
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

      <div className="flex flex-col items-center text-gray-600 font-semibold w-full">
        <h1 className="text-lg">History</h1>
        {records ? (
          <HistoryTable records={records} deleteRecord={deleteRow} />
        ) : (
          dbMessage
        )}
      </div>
    </div>
  );
}
