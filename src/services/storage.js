const STORAGE_KEY = "vaults";

export function saveVaults(vaults) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vaults));
}

export function loadVaults() {
  try {
    const storedVaults = localStorage.getItem(STORAGE_KEY);

    if (!storedVaults) return null;

    return JSON.parse(storedVaults);
  } catch (err) {
    console.error("Failed to load vaults", err);
    return null;
  }
}
