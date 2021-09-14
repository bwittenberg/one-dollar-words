import React from "react";
import { render, screen } from "@testing-library/react";
import App, { getWordValue } from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("should get value of word", () => {
  const value = getWordValue("owen");
  expect(value).toMatchInlineSnapshot();
});
