import { useState } from "react";
import { getWebsiteInfo } from "../utils/website";

export default function VaultCard({ vault }) {
  const [showPass, setShowPass] = useState(false);

  function handleTogglePassword() {
    setShowPass((prev) => !prev);
  }

  const website = getWebsiteInfo(vault.url);

  const domainName = website.domain;
  const websiteName = website.websiteName;
  const initialName = website.initials;

  return (
    <article className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-500/20">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            style={{
              color: vault.faviconColor,
              backgroundColor: `${vault.faviconColor}15`,
            }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800  text-sm font-semibold uppercase "
          >
            {initialName}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{websiteName}</h3>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {vault.category}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-neutral-400">{domainName}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            Username
          </dt>
          <dd className="text-neutral-50">{vault.userName}</dd>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            Password
          </dt>
          <dd className="flex items-center gap-2 text-neutral-50">
            {showPass ? vault.password : <span>••••••••</span>}
            <button
              onClick={handleTogglePassword}
              className="text-xs font-semibold text-blue-400"
            >
              {showPass ? "Hide" : "Reveal"}
            </button>
          </dd>
        </div>
      </dl>
    </article>
  );
}
