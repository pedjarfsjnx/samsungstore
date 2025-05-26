// Payment Page Logic
;(() => {
  // Get cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("samsungCart")) || []
  let currentStep = 1
  let shippingData = {}
  let paymentData = {}

  // Initialize
  function init() {
    if (cart.length === 0) {
      alert("Keranjang kosong! Redirecting to home...")
      window.location.href = "index.html"
      return
    }

    showStep(1)
    renderPaymentContent()
  }

  // Show specific step
  function showStep(step) {
    // Update step indicators
    Object.keys({ 1: "step1", 2: "step2", 3: "step3" }).forEach((stepNum) => {
      const indicator = document.getElementById(`step${stepNum}`)
      indicator.classList.remove("active", "completed")

      if (Number.parseInt(stepNum) === step) {
        indicator.classList.add("active")
      } else if (Number.parseInt(stepNum) < step) {
        indicator.classList.add("completed")
      }
    })

    currentStep = step
    renderPaymentContent()
  }

  // Render payment content based on current step
  function renderPaymentContent() {
    const contentDiv = document.getElementById("paymentContent")

    switch (currentStep) {
      case 1:
        contentDiv.innerHTML = renderShippingStep()
        setupShippingForm()
        break
      case 2:
        contentDiv.innerHTML = renderPaymentStep()
        setupPaymentForm()
        break
      case 3:
        contentDiv.innerHTML = renderConfirmationStep()
        setupConfirmationStep()
        break
    }

    updateOrderSummary()
  }

  // Render shipping step
  function renderShippingStep() {
    return `
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Informasi Pengiriman</h2>
            <form id="shippingForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input type="text" id="fullName" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                  <input type="tel" id="phone" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea id="address" rows="3" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <input type="text" id="city" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <select id="province" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Pilih Provinsi</option>
                    <option value="jakarta">DKI Jakarta</option>
                    <option value="jabar">Jawa Barat</option>
                    <option value="jateng">Jawa Tengah</option>
                    <option value="jatim">Jawa Timur</option>
                    <option value="banten">Banten</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                  <input type="text" id="postalCode" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
              </div>
              <div class="flex justify-end pt-4">
                <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Lanjut ke Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>
            <div id="orderSummary" class="space-y-3">
              <!-- Order items will be populated here -->
            </div>
            <hr class="my-4">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span id="summarySubtotal">Rp 0</span>
              </div>
              <div class="flex justify-between">
                <span>Ongkos Kirim</span>
                <span id="summaryShipping">Rp 25.000</span>
              </div>
              <div class="flex justify-between">
                <span>Pajak (10%)</span>
                <span id="summaryTax">Rp 0</span>
              </div>
              <hr>
              <div class="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span id="summaryTotal">Rp 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  // Render payment step
  function renderPaymentStep() {
    return `
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Metode Pembayaran</h2>
            
            <div class="space-y-4">
              <div class="border rounded-lg p-4">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="paymentMethod" value="credit_card" class="mr-3" checked>
                  <i class="fas fa-credit-card text-xl mr-3 text-blue-600"></i>
                  <div>
                    <div class="font-medium">Kartu Kredit/Debit</div>
                    <div class="text-sm text-gray-500">Visa, Mastercard, JCB</div>
                  </div>
                </label>
                
                <div id="creditCardForm" class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Kartu</label>
                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Kadaluarsa</label>
                      <input type="text" id="expiryDate" placeholder="MM/YY" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" id="cvv" placeholder="123" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Pemegang Kartu</label>
                    <input type="text" id="cardHolder" placeholder="Nama sesuai kartu" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                </div>
              </div>

              <div class="border rounded-lg p-4">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="paymentMethod" value="bank_transfer" class="mr-3">
                  <i class="fas fa-university text-xl mr-3 text-green-600"></i>
                  <div>
                    <div class="font-medium">Transfer Bank</div>
                    <div class="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</div>
                  </div>
                </label>
              </div>

              <div class="border rounded-lg p-4">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="paymentMethod" value="e_wallet" class="mr-3">
                  <i class="fas fa-mobile-alt text-xl mr-3 text-purple-600"></i>
                  <div>
                    <div class="font-medium">E-Wallet</div>
                    <div class="text-sm text-gray-500">GoPay, OVO, DANA, ShopeePay</div>
                  </div>
                </label>
              </div>
            </div>

            <div class="flex justify-between pt-6">
              <button id="backToShipping" class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
                Kembali
              </button>
              <button id="proceedToConfirm" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Lanjut ke Konfirmasi
              </button>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>
            <div id="orderSummary" class="space-y-3">
              <!-- Order items will be populated here -->
            </div>
            <hr class="my-4">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span id="summarySubtotal">Rp 0</span>
              </div>
              <div class="flex justify-between">
                <span>Ongkos Kirim</span>
                <span id="summaryShipping">Rp 25.000</span>
              </div>
              <div class="flex justify-between">
                <span>Pajak (10%)</span>
                <span id="summaryTax">Rp 0</span>
              </div>
              <hr>
              <div class="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span id="summaryTotal">Rp 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  // Render confirmation step
  function renderConfirmationStep() {
    const provinceText = document.getElementById("province")?.selectedOptions[0]?.textContent || shippingData.province

    let paymentText = ""
    switch (paymentData.method) {
      case "credit_card":
        paymentText = `
          <div class="space-y-2">
            <div><strong>Metode:</strong> Kartu Kredit/Debit</div>
            <div><strong>Nomor Kartu:</strong> **** **** **** ${paymentData.cardNumber?.slice(-4) || "****"}</div>
            <div><strong>Pemegang:</strong> ${paymentData.cardHolder || "N/A"}</div>
          </div>
        `
        break
      case "bank_transfer":
        paymentText = `
          <div class="space-y-2">
            <div><strong>Metode:</strong> Transfer Bank</div>
            <div class="text-sm text-gray-600">Instruksi transfer akan dikirim setelah konfirmasi</div>
          </div>
        `
        break
      case "e_wallet":
        paymentText = `
          <div class="space-y-2">
            <div><strong>Metode:</strong> E-Wallet</div>
            <div class="text-sm text-gray-600">Pilih e-wallet di halaman berikutnya</div>
          </div>
        `
        break
    }

    const orderDetailsHTML = cart
      .map(
        (item) => `
      <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
        <div class="flex items-center space-x-3">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain">
          <div>
            <div class="font-medium">${item.name}</div>
            <div class="text-sm text-gray-500">Qty: ${item.quantity}</div>
          </div>
        </div>
        <div class="font-semibold">${item.price}</div>
      </div>
    `,
      )
      .join("")

    const subtotal = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0)
    const shipping = 25000
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    return `
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-6">Konfirmasi Pesanan</h2>
        
        <div class="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 class="font-semibold mb-3">Informasi Pengiriman</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="space-y-2">
                <div><strong>Nama:</strong> ${shippingData.fullName}</div>
                <div><strong>Telepon:</strong> ${shippingData.phone}</div>
                <div><strong>Email:</strong> ${shippingData.email}</div>
                <div><strong>Alamat:</strong> ${shippingData.address}</div>
                <div><strong>Kota:</strong> ${shippingData.city}, ${provinceText} ${shippingData.postalCode}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-3">Metode Pembayaran</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              ${paymentText}
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="font-semibold mb-3">Detail Pesanan</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            ${orderDetailsHTML}
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 pt-6 border-t">
          <button id="backToPayment" class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
            Kembali
          </button>
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-600">Rp ${total.toLocaleString("id-ID")}</div>
            <button id="placeOrder" class="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 mt-2">
              <i class="fas fa-check mr-2"></i>Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    `
  }

  // Update order summary
  function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0)
    const shipping = 25000
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const summaryContainer = document.getElementById("orderSummary")
    if (summaryContainer) {
      summaryContainer.innerHTML = cart
        .map(
          (item) => `
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-contain">
            <div>
              <div class="text-sm font-medium">${item.name}</div>
              <div class="text-xs text-gray-500">Qty: ${item.quantity}</div>
            </div>
          </div>
          <div class="text-sm font-semibold">${item.price}</div>
        </div>
      `,
        )
        .join("")
    }

    const summarySubtotal = document.getElementById("summarySubtotal")
    const summaryShipping = document.getElementById("summaryShipping")
    const summaryTax = document.getElementById("summaryTax")
    const summaryTotal = document.getElementById("summaryTotal")

    if (summarySubtotal) summarySubtotal.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`
    if (summaryShipping) summaryShipping.textContent = `Rp ${shipping.toLocaleString("id-ID")}`
    if (summaryTax) summaryTax.textContent = `Rp ${tax.toLocaleString("id-ID")}`
    if (summaryTotal) summaryTotal.textContent = `Rp ${total.toLocaleString("id-ID")}`
  }

  // Setup shipping form
  function setupShippingForm() {
    const form = document.getElementById("shippingForm")
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault()

        shippingData = {
          fullName: document.getElementById("fullName").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          province: document.getElementById("province").value,
          postalCode: document.getElementById("postalCode").value,
        }

        showStep(2)
      }
    }
  }

  // Setup payment form
  function setupPaymentForm() {
    const backBtn = document.getElementById("backToShipping")
    const proceedBtn = document.getElementById("proceedToConfirm")

    if (backBtn) {
      backBtn.onclick = () => showStep(1)
    }

    if (proceedBtn) {
      proceedBtn.onclick = () => {
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value

        paymentData = {
          method: selectedPayment,
        }

        if (selectedPayment === "credit_card") {
          paymentData.cardNumber = document.getElementById("cardNumber")?.value
          paymentData.expiryDate = document.getElementById("expiryDate")?.value
          paymentData.cvv = document.getElementById("cvv")?.value
          paymentData.cardHolder = document.getElementById("cardHolder")?.value

          if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardHolder) {
            alert("Mohon lengkapi informasi kartu kredit")
            return
          }
        }

        showStep(3)
      }
    }

    // Setup payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]')
    const creditCardForm = document.getElementById("creditCardForm")

    paymentMethods.forEach((method) => {
      method.onchange = () => {
        if (creditCardForm) {
          if (method.value === "credit_card") {
            creditCardForm.style.display = "block"
          } else {
            creditCardForm.style.display = "none"
          }
        }
      }
    })

    // Card number formatting
    const cardNumberInput = document.getElementById("cardNumber")
    if (cardNumberInput) {
      cardNumberInput.oninput = (e) => {
        const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
        let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
        if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19)
        e.target.value = formattedValue
      }
    }

    // Expiry date formatting
    const expiryDateInput = document.getElementById("expiryDate")
    if (expiryDateInput) {
      expiryDateInput.oninput = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length >= 2) {
          value = value.substring(0, 2) + "/" + value.substring(2, 4)
        }
        e.target.value = value
      }
    }

    // CVV formatting
    const cvvInput = document.getElementById("cvv")
    if (cvvInput) {
      cvvInput.oninput = (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3)
      }
    }
  }

  // Setup confirmation step
  function setupConfirmationStep() {
    const backBtn = document.getElementById("backToPayment")
    const placeOrderBtn = document.getElementById("placeOrder")

    if (backBtn) {
      backBtn.onclick = () => showStep(2)
    }

    if (placeOrderBtn) {
      placeOrderBtn.onclick = () => {
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0)
        const shipping = 25000
        const tax = subtotal * 0.1
        const total = subtotal + shipping + tax

        // Create transaction object
        const transaction = {
          shipping: shippingData,
          payment: paymentData,
          items: cart,
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total,
        }

        // Save transaction
        const savedTransaction = DataManager.addTransaction(transaction)

        // Generate transaction ID
        const transactionId = "TRX-" + savedTransaction.id.toString().slice(-6)
        document.getElementById("transactionId").textContent = transactionId

        // Show success modal
        document.getElementById("successModal").classList.remove("hidden")

        // Clear cart
        localStorage.removeItem("samsungCart")
      }
    }

    // Back to home
    const backToHomeBtn = document.getElementById("backToHome")
    if (backToHomeBtn) {
      backToHomeBtn.onclick = () => {
        window.location.href = "index.html"
      }
    }
  }

  // Initialize the page
  document.addEventListener("DOMContentLoaded", () => {
    // Mock DataManager for demonstration purposes
    const DataManager = {
      transactions: [],
      addTransaction: function (transaction) {
        transaction.id = this.transactions.length + 1
        this.transactions.push(transaction)
        return transaction
      },
    }
    init()
  })
})()
