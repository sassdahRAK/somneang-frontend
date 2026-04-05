const DEFAULT_ACCOUNT = {
  name: "Tena",
  email: "sneu1nervngkrt@gmail.com",
  favoriteSongs: 3,
  playlists: 4,
  listeningHours: 120,
  avatarUrl: "",
};

const DEFAULT_SETTINGS = {
  notifications: true,
  autoplay: true,
  privateSession: false,
};

const ACCOUNT_KEYS = [
  "accountData",
  "account",
  "user",
  "userData",
  "profile",
  "currentUser",
];

function parseStoredValue(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return rawValue;
  }
}

function pickText(source, keys, fallback) {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

function pickNumber(source, keys, fallback) {
  for (const key of keys) {
    const value = source?.[key];
    const numberValue = Number(value);
    if (!Number.isNaN(numberValue) && Number.isFinite(numberValue)) {
      return numberValue;
    }
  }
  return fallback;
}

function getFromLocalStorage(keys) {
  if (typeof window === "undefined") {
    return null;
  }

  for (const key of keys) {
    const value = parseStoredValue(window.localStorage.getItem(key));
    if (value !== null && value !== undefined) {
      return value;
    }
  }

  return null;
}

function normalizeCollectionLength(rawValue) {
  if (Array.isArray(rawValue)) {
    return rawValue.length;
  }

  if (rawValue && typeof rawValue === "object") {
    if (Array.isArray(rawValue.items)) {
      return rawValue.items.length;
    }
    if (Array.isArray(rawValue.data)) {
      return rawValue.data.length;
    }
  }

  const asNumber = Number(rawValue);
  if (!Number.isNaN(asNumber) && Number.isFinite(asNumber)) {
    return asNumber;
  }

  return null;
}

function getDynamicFavoriteSongs(fallback) {
  const rawValue = getFromLocalStorage([
    "favoriteSongs",
    "favorites",
    "likedSongs",
    "favoriteTracks",
    "userFavorites",
  ]);
  const parsedLength = normalizeCollectionLength(rawValue);
  return parsedLength ?? fallback;
}

function getDynamicPlaylists(fallback) {
  const rawValue = getFromLocalStorage([
    "playlists",
    "playlistData",
    "userPlaylists",
    "myPlaylists",
  ]);
  const parsedLength = normalizeCollectionLength(rawValue);
  return parsedLength ?? fallback;
}

function getDynamicListeningHours(fallback) {
  const explicitHours = getFromLocalStorage([
    "listeningHours",
    "totalListeningHours",
    "hoursListened",
  ]);
  const explicitNumber = normalizeCollectionLength(explicitHours);
  if (explicitNumber !== null) {
    return explicitNumber;
  }

  // Fallback: estimate hours from listening history length.
  const listeningHistory = getFromLocalStorage([
    "listeningHistory",
    "playHistory",
    "recentlyPlayed",
  ]);
  const historyLength = normalizeCollectionLength(listeningHistory);
  if (historyLength !== null) {
    return Math.round(historyLength / 5);
  }

  return fallback;
}

export default class AccountStorage {
  static ensureDefaultAccount() {
    if (typeof window === "undefined") {
      return DEFAULT_ACCOUNT;
    }

    const seededAccount = { ...DEFAULT_ACCOUNT };
    window.localStorage.setItem("accountData", JSON.stringify(seededAccount));
    return seededAccount;
  }

  static readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  static loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = dataUrl;
    });
  }

  static async createAvatarDataUrl(file) {
    if (!file || !file.type.startsWith("image/")) {
      throw new Error("Please select an image file");
    }

    const originalDataUrl = await AccountStorage.readFileAsDataUrl(file);
    const image = await AccountStorage.loadImage(originalDataUrl);

    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      return originalDataUrl;
    }

    const shortestSide = Math.min(image.width, image.height);
    const sourceX = (image.width - shortestSide) / 2;
    const sourceY = (image.height - shortestSide) / 2;

    context.drawImage(
      image,
      sourceX,
      sourceY,
      shortestSide,
      shortestSide,
      0,
      0,
      size,
      size,
    );

    return canvas.toDataURL("image/jpeg", 0.86);
  }

  static getAccount() {
    if (typeof window === "undefined") {
      return DEFAULT_ACCOUNT;
    }

    let storedAccount = null;
    for (const key of ACCOUNT_KEYS) {
      const value = parseStoredValue(window.localStorage.getItem(key));
      if (value) {
        storedAccount = value;
        break;
      }
    }

    if (!storedAccount || typeof storedAccount !== "object") {
      return AccountStorage.ensureDefaultAccount();
    }

    const nestedStats =
      storedAccount.stats && typeof storedAccount.stats === "object"
        ? storedAccount.stats
        : {};

    const favoriteSongs = pickNumber(
      { ...nestedStats, ...storedAccount },
      ["favoriteSongs", "favorites", "favoriteCount", "likedSongs"],
      DEFAULT_ACCOUNT.favoriteSongs,
    );

    const playlists = pickNumber(
      { ...nestedStats, ...storedAccount },
      ["playlists", "playlistCount"],
      DEFAULT_ACCOUNT.playlists,
    );

    const listeningHours = pickNumber(
      { ...nestedStats, ...storedAccount },
      ["listeningHours", "hours", "totalHours", "listenHours"],
      DEFAULT_ACCOUNT.listeningHours,
    );

    return {
      name: pickText(
        storedAccount,
        ["name", "username", "fullName", "displayName"],
        DEFAULT_ACCOUNT.name,
      ),
      email: pickText(
        storedAccount,
        ["email", "mail", "userEmail"],
        DEFAULT_ACCOUNT.email,
      ),
      favoriteSongs: getDynamicFavoriteSongs(favoriteSongs),
      playlists: getDynamicPlaylists(playlists),
      listeningHours: getDynamicListeningHours(listeningHours),
      avatarUrl: pickText(
        storedAccount,
        ["avatarUrl", "avatar", "image", "photoUrl"],
        DEFAULT_ACCOUNT.avatarUrl,
      ),
    };
  }

  static saveAccount(nextData) {
    if (typeof window === "undefined") {
      return;
    }

    const current = parseStoredValue(
      window.localStorage.getItem("accountData"),
    );
    const merged =
      current && typeof current === "object"
        ? { ...current, ...nextData }
        : nextData;
    window.localStorage.setItem("accountData", JSON.stringify(merged));
  }

  static getSettings() {
    if (typeof window === "undefined") {
      return DEFAULT_SETTINGS;
    }

    try {
      const parsed = JSON.parse(
        window.localStorage.getItem("accountSettings") || "null",
      );
      if (!parsed || typeof parsed !== "object") {
        return DEFAULT_SETTINGS;
      }

      return {
        notifications: Boolean(parsed.notifications),
        autoplay: Boolean(parsed.autoplay),
        privateSession: Boolean(parsed.privateSession),
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  static saveSettings(nextSettings) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      "accountSettings",
      JSON.stringify(nextSettings),
    );
  }

  static clearAllOnLogout() {
    if (typeof window === "undefined") {
      return;
    }

    for (const key of ACCOUNT_KEYS) {
      window.localStorage.removeItem(key);
    }
    window.localStorage.removeItem("accountSettings");
  }
}
