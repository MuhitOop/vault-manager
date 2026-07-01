import { useState } from "react";
import { defaultVaults } from "../data/vault";
import VaultCard from "./VaultCard";
import VaultForm from "./VaultForm";
import VaultSearch from "./VaultSearch";

export default function VaultBoard() {
  const [vaults, setVaults] = useState(defaultVaults);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");


  const handleAddBookMark = (newVault) => {
    setVaults((prev) => [...prev, { ...newVault, createdAt: Date.now() }]);
  };

  const filteredVaults = vaults.filter((vault) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      vault.userName.toLowerCase().includes(query) ||
      vault.url.toLowerCase().includes(query)
    );
  });

  const sortedAndFilteredVaults = [...filteredVaults].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = new URL(
        a.url.startsWith("http") ? a.url : `https://${a.url}`,
      ).hostname.toLowerCase();
      const nameB = new URL(
        b.url.startsWith("http") ? b.url : `https://${b.url}`,
      ).hostname.toLowerCase();
      if (sortOrder === "asc") return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    } else {
      if (sortOrder === "asc") return a.createdAt - b.createdAt;
      return b.createdAt - a.createdAt;
    }
  });

  return (
    <>
      <VaultForm addBookMark={handleAddBookMark} />

      <main className="p-8">
        <div className="max-w-7xl mx-auto space-y-10 px-4">
          <VaultSearch
            onSearch={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          {/* 4. Grid Display & Conditional Rendering Logic */}
          <div>
            {sortedAndFilteredVaults.length > 0 ? (
              // IF results are found: Render the filtered Grid
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {sortedAndFilteredVaults.map((vault) => (
                  <VaultCard key={vault.id} vault={vault} />
                ))}
              </div>
            ) : (
              // IF no results match: Render the customized "Not Found" state
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-900/20 py-16 px-4 text-center backdrop-blur">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-red-500/10 text-red-400 mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-200">
                  No matching credentials found
                </h3>
                <p className="mt-2 text-sm text-neutral-500 max-w-sm">
                  We couldn't find anything matching "{searchQuery}". Check your
                  spelling or clear the search field to see all items.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
