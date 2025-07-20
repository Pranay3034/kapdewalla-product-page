const products = [
      { id: 1, name: "Classic White Tee", price: 499, category: "Men", image: "assets/1.webp" },
      { id: 2, name: "Denim Jacket", price: 1299, category: "Women", image: "assets/2.avif" },
      { id: 3, name: "Leather Belt", price: 699, category: "Accessories", image: "assets/3.jpeg" },
      { id: 4, name: "Floral Dress", price: 999, category: "Women", image: "assets/4.webp" },
      { id: 5, name: "Sports Shoes", price: 1499, category: "Men", image: "assets/5.jpeg" },
      { id: 6, name: "Handbag", price: 1199, category: "Accessories", image: "assets/6.jpeg" },
      { id: 7, name: "Graphic Tee", price: 599, category: "Men", image: "assets/7.jpeg" },
      { id: 8, name: "Sunglasses", price: 899, category: "Accessories", image: "assets/8.webp" }
    ];

    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortPrice = document.getElementById('sortPrice');

    let filteredProducts = [...products];

    function renderProducts(data) {
      productGrid.innerHTML = "";
      data.forEach(product => {
        const col = document.createElement('div');
        col.className = "col-md-3";
        col.innerHTML = `
          <div class="card h-100 shadow-sm border-0" role="button" data-id="${product.id}">
                <img src="${product.image}" class="card-img-top" style="height: 350px; object-fit: cover;" alt="${product.name}">
                <div class="card-body p-2 d-flex flex-column justify-content-between text-dark">
                <div>
                    <h6 class="card-title mb-1">${product.name}</h6>
                    <p class="text-muted small mb-2">${product.category}</p>
                    <div class="d-flex align-items-center mb-2">
                    <strong class="me-2">₹${product.price}</strong>
                    <small class="text-muted text-decoration-line-through me-2">₹${Math.round(product.price * 1.2)}</small>
                    <small class="text-success">20% OFF</small>
                    </div>
                </div>
                <button class="btn btn-warning w-100 d-flex justify-content-center align-items-center gap-2 rounded-pill" onclick="event.stopPropagation(); showProductDetails('${product.name}', '${product.price}', '${product.category}', '${product.image}')">
                    <i class="fa-solid fa-bag-shopping "></i> Shop Now
                </button>
                </div>
            </div>`;
        productGrid.appendChild(col);
      });
    }

    function showModal(productId) {
      const product = products.find(p => p.id == productId);
      document.getElementById('modalProductName').textContent = product.name;
      document.getElementById('modalProductImage').src = product.image;
      document.getElementById('modalProductCategory').textContent = product.category;
      document.getElementById('modalProductPrice').textContent = product.price;
    }

    // Initial render
    renderProducts(filteredProducts);

    // Search
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const results = filteredProducts.filter(p => p.name.toLowerCase().includes(query));
      renderProducts(results);
    });

    // Filter
    categoryFilter.addEventListener("change", () => {
      const category = categoryFilter.value;
      filteredProducts = category === "All" ? products : products.filter(p => p.category === category);
      renderProducts(filteredProducts);
    });

    // Sort
    sortPrice.addEventListener("change", () => {
      const option = sortPrice.value;
      const sorted = [...filteredProducts].sort((a, b) =>
        option === "low-high" ? a.price - b.price : b.price - a.price
      );
      renderProducts(sorted);
    });

    // Modal Event
    productGrid.addEventListener('click', function (e) {
      const card = e.target.closest(".card");
      if (card && card.dataset.id) {
        showModal(card.dataset.id);
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
        }
    });

    document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌗 Dark Mode';
  });

const backToTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
