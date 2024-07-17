// https://flowbite.com/icons/

interface SearchButtonProps {
  onButtonClick: () => void;
}

export default function SearchButton({ onButtonClick }: SearchButtonProps) {
  return (
    <button onClick={onButtonClick}>
      <svg
        className="w-4 h-4 text-gray-800 dark:text-white inline-block ml-2 cursor-pointer hover:invert-[.1] active:invert-[.2]" /* transition-[filter] duration-100 */
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
      </svg>
    </button>
  );
}
