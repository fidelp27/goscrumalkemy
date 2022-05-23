import Register from "./register";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

it("fetch options", async () => {
  render(<Register />, { wrapper: MemoryRouter });

  expect(
    screen.getByRole("option", { name: "Selecciona un rol" })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("option", { name: "Europa" })
  ).toBeInTheDocument();
});
