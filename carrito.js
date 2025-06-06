const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const clearCartBtn = document.getElementById("clear-cart");
const paymentForm = document.getElementById("payment-form");


let cart = [];


function updateCartUI() {
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    tdTitle.textContent = item.title;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = item.price.toFixed(2) + " bs";

    const tdRemove = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      removeItem(index);
    });
    tdRemove.appendChild(removeBtn);

    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdRemove);

    cartItemsContainer.appendChild(tr);
  });

  totalEl.textContent = total.toFixed(2);
}


function addItem(title, price) {
  cart.push({ title, price });
  updateCartUI();
}


function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}


function clearCart() {
  cart = [];
  updateCartUI();
}


paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }


  if (!paymentForm.reportValidity()) {
    alert("Por favor, completa todos los campos del formulario correctamente.");
    return;
  }


  alert("Pago realizado con éxito. ¡Gracias por tu compra!");

  clearCart();
  paymentForm.reset();
});


addToCartButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const title = btn.dataset.title;
    const price = parseFloat(btn.dataset.price);
    addItem(title, price);
  })
);

clearCartBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }
  if (confirm("¿Quieres vaciar el carrito?")) {
    clearCart();
  }
});


updateCartUI();
