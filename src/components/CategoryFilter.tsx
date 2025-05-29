import { categories } from "../types/data.t";
import { CategoryFilterProps } from "../types/movie";

export default function CategoryFilter({
  onSelect,
  category,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={(e) => {
            e.preventDefault();
            onSelect(cat.value);
          }}
          className={`px-3 py-1 rounded transition ${
            category === cat.value
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
