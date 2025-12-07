// Sample Product Data
const products = [
  { id: 1, name: "Smart ", price: 1999, img: "images/watch.webp" },
  { id: 2, name: "Wireless Earbuds", price: 999, img: "images/budds.webp" },
  { id: 3, name: "Backpack", price: 799, img: "images/bag.jpg" },
  { id: 4, name: "Casual Shoes", price: 1499, img: "images/shoe.jpg" }
];

let cart = [];
function addToCart(product) {
  cart.push(product);
  alert(product.name + " added to cart!");
  updateCart();
}

// Display Products
const productList = document.getElementById("productList");
products.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("product");
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
  `;
  productList.appendChild(card);
});

// Add to Cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

// Update Cart
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(div);
    total += item.price;
  });

  totalPrice.innerHTML = `<h3>Total: ₹${total}</h3>`;
}
