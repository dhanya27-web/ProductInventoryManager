"use strict";
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        quantity: 5,
        inStock: true,
        tags: ["Electronics", "Computer"]
    },
    {
        id: 2,
        name: "Mouse",
        price: 500,
        quantity: 0,
        inStock: false,
        tags: ["Electronics", "Accessory"]
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1200,
        quantity: 10,
        inStock: true,
        tags: ["Electronics"]
    },
    {
        id: 4,
        name: "Monitor",
        price: 12000,
        quantity: 3,
        inStock: true,
        tags: ["Computer"]
    }
];
// Get HTML elements
const productForm = document.getElementById("productForm");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const quantityInput = document.getElementById("productQuantity");
const tagsInput = document.getElementById("productTags");
const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("productList");
const totalProducts = document.getElementById("totalProducts");
const inStockCount = document.getElementById("inStockCount");
// Function to display products
function displayProducts(searchText = "") {
    productList.replaceChildren();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product";
        const heading = document.createElement("h3");
        heading.textContent = product.name;
        const price = document.createElement("p");
        price.textContent = `Price: ₹${product.price.toLocaleString("en-IN")}`;
        const quantity = document.createElement("p");
        quantity.textContent = `Quantity: ${product.quantity}`;
        const status = document.createElement("p");
        status.className = product.inStock
            ? "available"
            : "unavailable";
        status.textContent = product.inStock
            ? "In Stock"
            : "Out of Stock";
        const tags = document.createElement("p");
        tags.textContent = `Tags: ${product.tags?.join(", ") || "None"}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            products = products.filter(item => item.id !== product.id);
            displayProducts(searchInput.value);
        });
        card.append(heading, price, quantity, status, tags, deleteButton);
        productList.appendChild(card);
    });
    totalProducts.textContent = String(products.length);
    inStockCount.textContent = String(products.filter(product => product.inStock).length);
    if (filteredProducts.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No products found.";
        productList.appendChild(message);
    }
}
// Function to add a new product
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (!name || !priceInput.value || !quantityInput.value ||
        !Number.isFinite(price) || price <= 0 ||
        !Number.isSafeInteger(quantity) || quantity < 0) {
        alert("Enter a valid name, price, and quantity.");
        return;
    }
    const tags = tagsInput.value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name: name,
        price: price,
        quantity: quantity,
        inStock: quantity > 0,
        tags: tags
    };
    products.push(newProduct);
    productForm.reset();
    displayProducts(searchInput.value);
});
// Search products
searchInput.addEventListener("input", () => {
    displayProducts(searchInput.value);
});
// Initial display
displayProducts();
