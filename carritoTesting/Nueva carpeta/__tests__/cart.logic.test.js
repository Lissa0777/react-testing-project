import { createCart, addToCart, removeFromCart, setQty, getSubtotal, getTotalCount } from "../js/cart.logic.js";
import { saveCart, loadCart } from "../js/storage.js";

const prodA = { id: "p1", name: "A", price: 1000 };
const prodB = { id: "p2", name: "B", price: 2000 };

describe("cart.logic (lógica de negocio)", () => {
  test("createCart inicia vacío", () => {
    const cart = createCart();
    expect(cart.items).toEqual({});
  });

  test("addToCart agrega un producto y suma cantidad si se repite (no duplica fila)", () => {
    let cart = createCart();
    cart = addToCart(cart, prodA);
    cart = addToCart(cart, prodA);

    expect(cart.items["p1"].qty).toBe(2);
    expect(Object.keys(cart.items)).toHaveLength(1);
  });

  test("addToCart ignora producto inválido (branch defensivo)", () => {
    const cart = createCart();
    const same = addToCart(cart, null);
    expect(same).toBe(cart);
  });

  test("removeFromCart elimina completamente un ítem", () => {
    let cart = createCart();
    cart = addToCart(cart, prodA);
    cart = addToCart(cart, prodB);

    cart = removeFromCart(cart, "p1");
    expect(cart.items["p1"]).toBeUndefined();
    expect(cart.items["p2"]).toBeDefined();
  });

  test("removeFromCart con id inexistente no cambia el carrito (branch)", () => {
    const cart = createCart();
    const same = removeFromCart(cart, "nope");
    expect(same).toBe(cart);
  });

  test("setQty actualiza cantidad", () => {
    let cart = createCart();
    cart = addToCart(cart, prodA); // qty 1
    cart = setQty(cart, "p1", 5);
    expect(cart.items["p1"].qty).toBe(5);
  });

  test("setQty con qty < 1 elimina el item (branch)", () => {
    let cart = createCart();
    cart = addToCart(cart, prodA);
    cart = setQty(cart, "p1", 0);
    expect(cart.items["p1"]).toBeUndefined();
  });

  test("getSubtotal suma price * qty", () => {
    let cart = createCart();
    cart = addToCart(cart, prodA); // 1000
    cart = addToCart(cart, prodA); // 2000
    cart = addToCart(cart, prodB); // +2000 => 4000
    expect(getSubtotal(cart)).toBe(4000);
  });

  test("getTotalCount suma qty de todos los items", () => {
    let cart = createCart();
    cart = addToCart(cart, prodA);
    cart = addToCart(cart, prodA);
    cart = addToCart(cart, prodB);
    expect(getTotalCount(cart)).toBe(3);
  });
});

describe("storage (LocalStorage wrapper)", () => {
  test("saveCart y loadCart guardan y recuperan JSON", () => {
    const fakeStorage = (() => {
      const store = new Map();
      return {
        setItem: (k, v) => store.set(k, v),
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        removeItem: (k) => store.delete(k),
      };
    })();

    const cart = { items: { p1: { id: "p1", name: "A", price: 1000, qty: 2 } } };
    saveCart(fakeStorage, cart);

    const loaded = loadCart(fakeStorage);
    expect(loaded).toEqual(cart);
  });

  test("loadCart retorna null si el JSON está corrupto (branch try/catch)", () => {
    const fakeStorage = { getItem: () => "{no-json" };
    const loaded = loadCart(fakeStorage);
    expect(loaded).toBeNull();
  });
});