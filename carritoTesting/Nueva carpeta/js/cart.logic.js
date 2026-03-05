// Estado del carrito: { items: { [productId]: { id, name, price, qty } } }

export const createCart = () => ({ items: {} });

export const addToCart = (cart, product) => {
  if (!product?.id) return cart; // rama defensiva
  const prev = cart.items[product.id];
  const nextQty = (prev?.qty ?? 0) + 1;

  return {
    ...cart,
    items: {
      ...cart.items,
      [product.id]: { id: product.id, name: product.name, price: product.price, qty: nextQty },
    },
  };
};

export const removeFromCart = (cart, productId) => {
  if (!cart.items[productId]) return cart; // rama
  const { [productId]: _, ...rest } = cart.items;
  return { ...cart, items: rest };
};

export const setQty = (cart, productId, qty) => {
  const item = cart.items[productId];
  if (!item) return cart; // rama
  if (!Number.isInteger(qty) || qty < 1) return removeFromCart(cart, productId); // rama (validación)
  return { ...cart, items: { ...cart.items, [productId]: { ...item, qty } } };
};

export const getItemsArray = (cart) =>
  Object.values(cart.items).map((it) => ({ ...it, total: it.price * it.qty }));

export const getSubtotal = (cart) =>
  getItemsArray(cart).reduce((acc, it) => acc + it.total, 0);

export const getTotalCount = (cart) =>
  Object.values(cart.items).reduce((acc, it) => acc + it.qty, 0);