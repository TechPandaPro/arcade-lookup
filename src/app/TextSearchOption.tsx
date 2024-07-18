import SearchOption from "./SearchOption";

export default function TextSearchOption() {
  return (
    <SearchOption>
      <input
        type="text"
        className="w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100"
      />
    </SearchOption>
  );
}
