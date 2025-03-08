let cart = [];
let user = null;

const products = [
    {
        name: 'iPhone 14',
        price: 1200,
        image: 'images/iphone14.jpg'
    },
    {
        name: 'Samsung Galaxy S23',
        price: 1100,
        image: 'images/s23.jpg'
    },
    {
        name: 'Google Pixel 7',
        price: 900,
        image: 'images/googlePixel7.webp'
    }
];

function showSection(section) {
    document.querySelectorAll('section').forEach((el) => {
        el.classList.add('d-none');
    });
    document.getElementById(section).classList.remove('d-none');
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4');
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Cena: €${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Dodaj u korpu</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(name, price) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Povećaj količinu proizvoda u korpi
function increaseQuantity(name) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity += 1;
    }
    updateCart();
}


function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.classList.add('d-flex', 'justify-content-between', 'mb-2');
        itemRow.innerHTML = `
            <span>${item.name} (${item.quantity}) - €${item.price * item.quantity}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">X</button>
        `;
        cartItems.appendChild(itemRow);
        total += item.price * item.quantity;
    });

    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;

        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.classList.add('d-flex', 'justify-content-between', 'mb-2');
            itemRow.innerHTML = `
            <span>${item.name} (${item.quantity}) - €${item.price * item.quantity}</span>
            <button class="btn btn-warning btn-sm" onclick="increaseQuantity('${item.name}')">+</button>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">X</button>
        `;
            cartItems.appendChild(itemRow);
            total += item.price * item.quantity;
        });

        const totalRow = document.createElement('div');
        totalRow.classList.add('d-flex', 'justify-content-between', 'mt-3');
        totalRow.innerHTML = `
        <strong>Ukupno: €${total}</strong>
    `;
        cartItems.appendChild(totalRow);
    }


    const totalRow = document.createElement('div');
    totalRow.classList.add('d-flex', 'justify-content-between', 'mt-3');
    totalRow.innerHTML = `
        <strong>Ukupno: €${total}</strong>
    `;
    cartItems.appendChild(totalRow);
}

function checkout() {
    if (user) {
        alert(`Hvala na kupovini, ${user.firstName} ${user.lastName}! Ukupna cena je ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}€.`);
        cart = [];
        updateCart();
    } else {
        alert('Morate biti prijavljeni da biste kupili proizvode.');
    }
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    if (email && password) {
        user = { email, firstName: email.split('@')[0], lastName: 'Korisnik', address: 'Adresa korisnika' };
        alert('Uspešna registracija! Dobrodošli!');
        showSection('products');
    } else {
        alert('Unesite validne podatke.');
    }
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (email && password) {
        user = { email, firstName: email.split('@')[0], lastName: 'Korisnik', address: 'Adresa korisnika' };
        alert('Uspešno ste se prijavili!');
        showSection('products');
    } else {
        alert('Pogrešni podaci!');
    }
}

// Inicijalizacija proizvoda prilikom učitavanja stranice
window.onload = () => {
    renderProducts();
};
