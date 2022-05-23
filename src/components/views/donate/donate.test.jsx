import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Donate from "./donate";

it("renderiza un h1", () => {
  render(<Donate />, { wrapper: MemoryRouter });

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
it("renderiza un a", () => {
  render(<Donate />, { wrapper: MemoryRouter });

  expect(screen.getByRole("link")).toBeInTheDocument();
});
