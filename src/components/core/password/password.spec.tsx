import Password from ".";
import { fireEvent, render, screen } from "@testing-library/react";

it("renders input", () => {
  render(<Password />);
});

it("renders text input and changes value", () => {
  let testText = "A test input values";
  let result = "";
  render(
    <Password
      onChange={(e) => {
        result = e.target.value;
      }}
    />
  );

  let input = screen.getByTestId("test-password");

  expect(input).toBeDefined();

  fireEvent.change(input, {
    target: { value: testText },
  });

  expect(result).toEqual(testText);
});
