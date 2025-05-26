// Cart Management
const CartManager = {
  getCart() {
    return JSON.parse(localStorage.getItem("samsungCart")) || []
  },

  addToCart(product, quantity = 1) {
    const cart = this.getCart()
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        image: product.image,
        quantity: quantity,
      })
    }

    localStorage.setItem("samsungCart", JSON.stringify(cart))
    this.updateCartUI()
    return true
  },

  updateCartUI() {
    const cart = this.getCart()
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartCountEl = document.getElementById("cartCount")

    if (cartCountEl) {
      if (cartCount > 0) {
        cartCountEl.textContent = cartCount
        cartCountEl.classList.remove("hidden")
      } else {
        cartCountEl.classList.add("hidden")
      }
    }
  },

  removeFromCart(productId) {
    const cart = this.getCart()
    const filteredCart = cart.filter((item) => item.id !== productId)
    localStorage.setItem("samsungCart", JSON.stringify(filteredCart))
    this.updateCartUI()
  },

  updateQuantity(productId, quantity) {
    const cart = this.getCart()
    const item = cart.find((item) => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.removeFromCart(productId)
      } else {
        localStorage.setItem("samsungCart", JSON.stringify(cart))
        this.updateCartUI()
      }
    }
  },

  clearCart() {
    localStorage.removeItem("samsungCart")
    this.updateCartUI()
  },
}
