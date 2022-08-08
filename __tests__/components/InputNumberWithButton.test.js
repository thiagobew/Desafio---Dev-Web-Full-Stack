import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputNumberWithButton from "../../components/InputNumberWithButton";

describe("InputNumberWithButton", () => {
  it("should render input and button", () => {
    render(<InputNumberWithButton />);

    expect(screen.getByPlaceholderText("Type an integer")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick function", async () => {
    const onClick = jest.fn();
    render(<InputNumberWithButton onClick={onClick} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalled();
  });

  it("should change input", async () => {
    const MockComponent = () => {
      const [testValue, setTestValue] = useState("");

      return (
        <InputNumberWithButton
          onClick={() => {}}
          onChange={(e) => setTestValue(e.target.value)}
          value={testValue}
        />
      );
    };

    render(<MockComponent />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Type an integer");

    await user.type(input, "1");
    expect(input).toHaveValue(1);
  });
});
