import { useState } from "react";

export default function VaultSearch({ onSearch, sortBy, setSortBy, sortOrder, setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSortSelection(field, order) {
    setSortBy(field)
    setSortOrder(order)
    setIsOpen(false)

  }
  return (
    <section className="rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-900/80 to-neutral-900/40 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search Bar */}
        <label className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search saved credentials"
            className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/60 py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-blue-500 focus:bg-neutral-950 focus:outline-none"
          />
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-300 transition-all ${
              isOpen
                ? "border-blue-500 text-white bg-neutral-900"
                : "border-neutral-800 bg-neutral-900/80 hover:border-neutral-700"
            }`}
          >
            <svg
              className="h-4 w-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18l-8 8v6l-4 4v-8z"
              />
            </svg>
            Sort by <span className="text-blue-400 normal-case"></span>
          </button>
          {/* Floating Dropdown List Popover */}
          {isOpen && (
            <>
              {/* Invisible full-screen backdrop to safely close menu when clicking outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-52 z-20 origin-top-right rounded-2xl border border-neutral-800 bg-neutral-950 p-2 shadow-2xl shadow-black">
                <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase px-3 py-1.5">
                  Date Created
                </p>
                <button
                  onClick={() => handleSortSelection("date", "desc")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl transition ${sortBy === "date" && sortOrder === "desc" ? "bg-blue-600/20 text-blue-400 font-medium" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                >
                  Newest First (Default)
                </button>
                <button
                  onClick={() => handleSortSelection("date", "asc")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl transition ${sortBy === "date" && sortOrder === "asc" ? "bg-blue-600/20 text-blue-400 font-medium" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                >
                  Oldest First
                </button>

                <div className="my-1 border-t border-neutral-900" />

                <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase px-3 py-1.5">
                  Alphabetical
                </p>
                <button
                  onClick={() => handleSortSelection("name", "asc")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl transition ${sortBy === "name" && sortOrder === "asc" ? "bg-blue-600/20 text-blue-400 font-medium" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                >
                  Name (A - Z)
                </button>
                <button
                  onClick={() => handleSortSelection("name", "desc")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl transition ${sortBy === "name" && sortOrder === "desc" ? "bg-blue-600/20 text-blue-400 font-medium" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                >
                  Name (Z - A)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
