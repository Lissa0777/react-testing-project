const KEY = "cart:v1";

export const saveCart = (storage, cart) => {
  storage.setItem(KEY, JSON.stringify(cart));
};

export const loadCart = (storage) => {
  const raw = storage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null; // rama por JSON corrupto
  }
};

export const clearCart = (storage) => storage.removeItem(KEY);