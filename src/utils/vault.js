export function filterVaults(vaults, searchQuery) {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return vaults;

  return vaults.filter((vault) => {
    return (
      vault.userName.toLowerCase().includes(query) ||
      vault.url.toLowerCase().includes(query)
    );
  });
}

export function sortVaults(vaults, sortBy, sortOrder) {
  return [...vaults].sort((a, b) => {
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
      const dateA = a.createdAt || 0;
      const dateB = b.createdAt || 0;
      if (sortOrder === "asc") return dateA - dateB;
      return dateB - dateA;
    }
  });
}
