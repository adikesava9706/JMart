import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigator(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
  <div class="w-full max-w-sm min-w-[200px]">
  <div class="relative flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
    </svg>
 
    <input
    class="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    placeholder="Search Products..." 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    />
    
    <button
      class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
      onClick={handleSearch}
    >
      Search
    </button> 
  </div>
</div>
    </div>
  );
}

export default SearchBar;