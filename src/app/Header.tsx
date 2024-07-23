// TODO: consider component name

interface HeaderProps {
  currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
  return (
    <header>
      <h1 className="text-xl font-medium text-center mt-3">Arcade Lookup</h1>
      <ol className="flex justify-center gap-4 mb-3 border-b-2 border-b-gray-400">
        <li className="text-center text-gray-300 relative after:content[''] after:absolute after:top-1/2 after:translate-x-[calc(0.5rem-1px)] after:-translate-y-1/2 after:w-px after:h-4/5 after:bg-gray-400">
          {currentPath === "/" ? (
            "Sessions"
          ) : (
            <a href="/" className="text-blue-400 underline">
              Sessions
            </a>
          )}
        </li>
        <li className="text-center text-gray-300">
          {currentPath === "/graph" ? (
            "Stats"
          ) : (
            <a href="/graph" className="text-blue-400 underline">
              Stats
            </a>
          )}
        </li>
      </ol>
    </header>
  );
}
