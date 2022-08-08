import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HistoryTable from "../../components/HistoryTable";

const mockData = [
  {
    number: 1,
    result: 10,
    time: 0.01,
  },
  {
    number: 2,
    result: 20,
    time: 0.02,
  },
  {
    number: 3,
    result: 30,
    time: 0.03,
  },
  {
    number: 4,
    result: 40,
    time: 0.04,
  },
];

describe("HistoryTable", () => {
  it("should render rows equal to input size", () => {
    render(<HistoryTable records={mockData} />);

    expect(screen.getAllByRole("row")).toHaveLength(mockData.length + 1); // +1 for header row
  });

  it("should render header row", () => {
    render(<HistoryTable records={mockData} />);

    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
    expect(screen.getByText("Time (ms)")).toBeInTheDocument();
  });

  it("should render rows with correct data", () => {
    render(<HistoryTable records={mockData} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("0.01")).toBeInTheDocument();
  });

  it("should call deleteRecord function", async () => {
    const deleteRow = jest.fn();
    render(<HistoryTable records={mockData} deleteRecord={deleteRow} />);

    const user = userEvent.setup();

    const deleteButton = screen.getAllByRole("button")[0];
    await user.click(deleteButton);

    expect(deleteRow).toHaveBeenCalledTimes(1);
  });
});
