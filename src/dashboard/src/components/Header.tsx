import { useState } from 'react';

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  const [search, setSearch] = useState('');

  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6 gap-4 flex-shrink-0">
      <h1 className="text-base font-semibold text-white mr-auto">{title}</h1>
      <input
        type="search"
        placeholder="Search domains..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-300 placeholder-gray-500 w-56 focus:outline-none focus:border-gray-500"
      />
      <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center text-sm font-bold text-white">
        A
      </div>
    </header>
  );
}
