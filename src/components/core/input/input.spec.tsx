import Input from ".";
import { fireEvent, render, screen } from "@testing-library/react";

it("renders input", () => {
  render(<Input />);
});

it("renders text input and changes value", () => {
  let testText = "A test input values";
  let result = "";
  render(
    <Input
      type="text"
      onChange={(e) => {
        result = e.target.value;
      }}
    />
  );

  let input = screen.getByTestId("test-input");

  expect(input).toBeDefined();

  fireEvent.change(input, {
    target: { value: testText },
  });

  expect(result).toEqual(testText);
});
