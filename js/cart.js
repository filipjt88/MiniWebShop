let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "col-md-3";
        div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${item.image}" class="card-img-top p-3" style="height: 200px; object-fit: contain;" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.price} €</p>
          <button class="btn btn-outline-danger form-control" onclick="removeFromCart(${index})">Remove product</button>
        </div>
      </div>
    `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
renderCart();
