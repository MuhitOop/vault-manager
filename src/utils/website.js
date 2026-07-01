const websiteInitials = {
  facebook: "FB",
  youtube: "YT",
  github: "GH",
  instagram: "IG",
  linkedin: "LI",
  spotify: "SP",
  netflix: "NF",
  twitter: "TW",
  x: "X",
};

function normalizeUrl(url) {
  if (!url) return "";
  //if it does not start with http:// or https:// , append https://
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

function parseWebsite(url) {
  try {
    const safeUrl = normalizeUrl(url);
    const hostname = new URL(safeUrl).hostname;
    const domain = hostname.replace("www.", "");
    const websiteName = domain.split(".")[0];

    return {
      hostname,
      domain,
      websiteName,
    };
  } catch {
    return null;
  }
}


export function getWebsiteInfo(url) {
  const website = parseWebsite(url);

  if (!website) {
    return {
      domain: "",
      websiteName: "unknown",
      initials: "??",
    };
  }

  return {
    domain: website.domain,
    websiteName:
      website.websiteName.charAt(0).toUpperCase() +
      website.websiteName.slice(1),
    initials:
      websiteInitials[website.websiteName] ??
      website.websiteName.slice(0, 2).toUpperCase(),
  };
}
