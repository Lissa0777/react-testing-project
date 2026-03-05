import { PRODUCTS } from "./products.js";
import { createCart, addToCart, removeFromCart, setQty, getItemsArray, getSubtotal, getTotalCount } from "./cart.logic.js";
import { saveCart, loadCart, clearCart as clearCartStorage } from "./storage.js";

const $ = (sel) => document.querySelector(sel);

const productsGrid = $("#productsGrid");
const cartList = $("#cartList");
const cartEmpty = $("#cartEmpty");
const subtotalEl = $("#subtotal");
const countEl = $("#cartCount");
const clearBtn = $("#clearCartBtn");

let cart = loadCart(window.localStorage) ?? createCart();

const moneyCOP = (n) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const renderProducts = () => {
  productsGrid.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}">
      <div class="p">
        <div class="meta">
          <div>
            <strong>${p.name}</strong>
            <div class="muted">${p.desc ?? ""}</div>
          </div>
          <strong>${moneyCOP(p.price)}</strong>
        </div>
        <div style="margin-top:10px;display:flex;justify-content:flex-end">
          <button class="btn btn--primary" data-add="${p.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
};

const renderCart = () => {
  const items = getItemsArray(cart);
  cartEmpty.style.display = items.length ? "none" : "block";
  cartList.innerHTML = items.map(it => `
    <li class="item">
      <div>
        <div class="row"><strong>${it.name}</strong><span class="muted">${moneyCOP(it.price)}</span></div>
        <div class="row" style="margin-top:8px">
          <div class="qty">
            <button class="btn icon-btn" data-dec="${it.id}" aria-label="Disminuir">−</button>
            <span><strong>${it.qty}</strong></span>
            <button class="btn icon-btn" data-inc="${it.id}" aria-label="Aumentar">+</button>
          </div>
          <strong>${moneyCOP(it.total)}</strong>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;align-items:flex-start">
        <button class="btn btn--danger" data-del="${it.id}" aria-label="Eliminar">✕</button>
      </div>
    </li>
  `).join("");

  subtotalEl.textContent = moneyCOP(getSubtotal(cart));
  countEl.textContent = String(getTotalCount(cart));
};

const persistAndRender = () => {
  saveCart(window.localStorage, cart);
  renderCart();
};

productsGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const id = btn.dataset.add;
  const product = PRODUCTS.find(p => p.id === id);
  cart = addToCart(cart, product);
  persistAndRender();
});

cartList.addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");

  if (del) { cart = removeFromCart(cart, del.dataset.del); return persistAndRender(); }
  if (inc) {
    const id = inc.dataset.inc;
    const current = cart.items[id]?.qty ?? 0;
    cart = setQty(cart, id, current + 1);
    return persistAndRender();
  }
  if (dec) {
    const id = dec.dataset.dec;
    const current = cart.items[id]?.qty ?? 0;
    cart = setQty(cart, id, current - 1);
    return persistAndRender();
  }
});

clearBtn.addEventListener("click", () => {
  cart = createCart();
  clearCartStorage(window.localStorage);
  renderCart();
});

renderProducts();
renderCart();