// Cart Page Logic
;(() => {
  // Get cart data from localStorage
  let cart = JSON.parse(localStorage.getItem("samsungCart")) || []

  // Sample recommended products
  const recommendedProducts = [
    {
      id: 13,
      name: "Samsung Galaxy Buds2 Pro",
      price: "Rp 3.499.000",
      priceNum: 3499000,
      image: "https://bumilindo.com/wp-content/uploads/2023/02/Samsung-Galaxy-Buds-2-Pro-Bumilindo-2.jpg",
    },
    {
      id: 14,
      name: "Samsung Galaxy Watch5",
      price: "Rp 4.199.000",
      priceNum: 4199000,
      image:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/103/MTA-149055555/br-m036969-02885_samsung-galaxy-watch-5-44mm-garansi-resmi-sein_full01-e036e566.jpg",
    },
  ]

  // DOM elements
  const emptyCart = document.getElementById("emptyCart")
  const cartItems = document.getElementById("cartItems")
  const cartItemsList = document.getElementById("cartItemsList")
  const itemCount = document.getElementById("itemCount")
  const subtotal = document.getElementById("subtotal")
  const shipping = document.getElementById("shipping")
  const tax = document.getElementById("tax")
  const total = document.getElementById("total")
  const checkoutBtn = document.getElementById("checkoutBtn")
  const clearCartBtn = document.getElementById("clearCart")
  const promoCode = document.getElementById("promoCode")
  const applyPromo = document.getElementById("applyPromo")
  const promoMessage = document.getElementById("promoMessage")
  const recommendedProductsContainer = document.getElementById("recommendedProducts")

  let promoDiscount = 0

  // Initialize
  function init() {
    renderCart()
    renderRecommendedProducts()
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("samsungCart", JSON.stringify(cart))
  }

  // Render cart items
  function renderCart() {
    if (cart.length === 0) {
      emptyCart.classList.remove("hidden")
      cartItems.classList.add("hidden")
      checkoutBtn.disabled = true
    } else {
      emptyCart.classList.add("hidden")
      cartItems.classList.remove("hidden")
      checkoutBtn.disabled = false

      cartItemsList.innerHTML = ""
      cart.forEach((item) => {
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item flex items-center space-x-4"
        cartItem.innerHTML = `
          <div class="flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-contain bg-gray-100 rounded-lg">
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-gray-900 truncate">${item.name}</h4>
            <p class="text-blue-600 font-bold text-lg">${item.price}</p>
            <p class="text-sm text-gray-500">Stok tersedia</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="flex items-center border rounded-lg">
              <button class="decrease-qty px-3 py-2 hover:bg-gray-100 rounded-l-lg" data-id="${item.id}">
                <i class="fas fa-minus text-sm"></i>
              </button>
              <span class="px-4 py-2 border-l border-r min-w-[3rem] text-center">${item.quantity}</span>
              <button class="increase-qty px-3 py-2 hover:bg-gray-100 rounded-r-lg" data-id="${item.id}">
                <i class="fas fa-plus text-sm"></i>
              </button>
            </div>
            <button class="remove-item text-red-500 hover:text-red-700 p-2" data-id="${item.id}" title="Hapus item">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `
        cartItemsList.appendChild(cartItem)
      })

      // Add event listeners
      document.querySelectorAll(".decrease-qty").forEach((btn) => {
        btn.onclick = () => updateQuantity(Number.parseInt(btn.dataset.id), -1)
      })

      document.querySelectorAll(".increase-qty").forEach((btn) => {
        btn.onclick = () => updateQuantity(Number.parseInt(btn.dataset.id), 1)
      })

      document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.onclick = () => removeItem(Number.parseInt(btn.dataset.id))
      })
    }

    updateSummary()
  }

  // Update item quantity
  function updateQuantity(id, change) {
    const item = cart.find((item) => item.id === id)
    if (item) {
      item.quantity += change
      if (item.quantity <= 0) {
        removeItem(id)
      } else {
        saveCart()
        renderCart()
      }
    }
  }

  // Remove item from cart
  function removeItem(id) {
    if (confirm("Hapus item dari keranjang?")) {
      cart = cart.filter((item) => item.id !== id)
      saveCart()
      renderCart()
    }
  }

  // Clear entire cart
  clearCartBtn.onclick = () => {
    if (confirm("Kosongkan seluruh keranjang?")) {
      cart = []
      saveCart()
      renderCart()
    }
  }

  // Update order summary
  function updateSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotalAmount = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0)
    const shippingAmount = cart.length > 0 ? 25000 : 0
    const taxAmount = subtotalAmount * 0.1
    const discountAmount = subtotalAmount * (promoDiscount / 100)
    const totalAmount = subtotalAmount + shippingAmount + taxAmount - discountAmount

    itemCount.textContent = totalItems
    subtotal.textContent = `Rp ${subtotalAmount.toLocaleString("id-ID")}`
    shipping.textContent = `Rp ${shippingAmount.toLocaleString("id-ID")}`
    tax.textContent = `Rp ${taxAmount.toLocaleString("id-ID")}`
    total.textContent = `Rp ${totalAmount.toLocaleString("id-ID")}`
  }

  // Promo code functionality
  applyPromo.onclick = () => {
    const code = promoCode.value.trim().toUpperCase()

    // Sample promo codes
    const promoCodes = {
      SAMSUNG10: 10,
      WELCOME5: 5,
      NEWUSER15: 15,
    }

    if (promoCodes[code]) {
      promoDiscount = promoCodes[code]
      promoMessage.textContent = `Kode promo berhasil diterapkan! Diskon ${promoDiscount}%`
      promoMessage.className = "text-sm mt-2 text-green-600"
      promoMessage.classList.remove("hidden")
      applyPromo.textContent = "Terapkan"
      applyPromo.disabled = false
    } else {
      promoDiscount = 0
      promoMessage.textContent = "Kode promo tidak valid"
      promoMessage.className = "text-sm mt-2 text-red-600"
      promoMessage.classList.remove("hidden")
    }

    updateSummary()
  }

  // Render recommended products
  function renderRecommendedProducts() {
    recommendedProductsContainer.innerHTML = ""
    recommendedProducts.forEach((product) => {
      const productDiv = document.createElement("div")
      productDiv.className = "border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-contain mb-3">
        <h4 class="font-semibold text-sm mb-2 truncate">${product.name}</h4>
        <p class="text-blue-600 font-bold mb-3">${product.price}</p>
        <button class="add-recommended w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm" data-id="${product.id}">
          <i class="fas fa-cart-plus mr-1"></i>Tambah ke Keranjang
        </button>
      `
      recommendedProductsContainer.appendChild(productDiv)
    })

    // Add event listeners for recommended products
    document.querySelectorAll(".add-recommended").forEach((btn) => {
      btn.onclick = () => {
        const productId = Number.parseInt(btn.dataset.id)
        const product = recommendedProducts.find((p) => p.id === productId)
        if (product) {
          addToCart(product)
        }
      }
    })
  }

  // Add recommended product to cart
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        image: product.image,
        quantity: 1,
      })
    }
    saveCart()
    renderCart()

    // Show success message
    const btn = document.querySelector(`[data-id="${product.id}"]`)
    const originalText = btn.innerHTML
    btn.innerHTML = '<i class="fas fa-check mr-1"></i>Ditambahkan!'
    btn.disabled = true
    setTimeout(() => {
      btn.innerHTML = originalText
      btn.disabled = false
    }, 2000)
  }

  // Checkout button
  checkoutBtn.onclick = () => {
    if (cart.length > 0) {
      window.location.href = "payment.html"
    }
  }

  // Initialize the page
  document.addEventListener("DOMContentLoaded", () => {
    init()
  })
})()
