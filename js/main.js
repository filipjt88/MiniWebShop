const productList = document.getElementById("product-list");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
}

function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "col-md-3 mb-4 mt-5";
        card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top p-3" style="height: 200px; object-fit: contain;" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price} €</p>
          <small class="card-text">${product.description} €</small>
          <button class="btn btn-outline-success btn-sm form-control mt-4" onclick="addToCart(${product.id})">Add to cart</button>
        </div>
      </div>
    `;
        productList.appendChild(card);
    });
}

renderProducts();
