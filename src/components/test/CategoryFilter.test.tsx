import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "../CategoryFilter";
import { categories } from "../../types/data.t";

describe("CategoryFilter", () => {
  it("renders all category buttons", () => {
    const mockOnSelect = jest.fn();
    render(<CategoryFilter category="" onSelect={mockOnSelect} />);

    categories.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("applies active class to selected category button", () => {
    const mockOnSelect = jest.fn();
    const selectedCategory = categories[1].value;
    render(
      <CategoryFilter category={selectedCategory} onSelect={mockOnSelect} />
    );

    const activeButton = screen.getByText(categories[1].label);
    expect(activeButton).toHaveClass("bg-blue-600", "text-white");
  });

  it("calls onSelect with correct value when a button is clicked", () => {
    const mockOnSelect = jest.fn();
    render(<CategoryFilter category="" onSelect={mockOnSelect} />);

    const buttonToClick = screen.getByText(categories[2].label);
    fireEvent.click(buttonToClick);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(categories[2].value);
  });

  it("prevents default behavior on button click", () => {
    const mockOnSelect = jest.fn();
    render(<CategoryFilter category="" onSelect={mockOnSelect} />);

    const button = screen.getByText(categories[0].label);

    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");

    button.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
