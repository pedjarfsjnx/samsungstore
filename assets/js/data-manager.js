// Data Management System
const DataManager = {
  // Initialize default data if not exists
  init() {
    if (!localStorage.getItem("samsungProducts")) {
      this.initProducts()
    }
    if (!localStorage.getItem("samsungArticles")) {
      this.initArticles()
    }
    if (!localStorage.getItem("samsungTransactions")) {
      localStorage.setItem("samsungTransactions", JSON.stringify([]))
    }
    if (!localStorage.getItem("samsungTransactionHistory")) {
      localStorage.setItem("samsungTransactionHistory", JSON.stringify([]))
    }
  },

  initProducts() {
    const products = [
      {
        id: 1,
        name: "Samsung Galaxy S24 Ultra",
        price: "Rp 18.999.000",
        priceNum: 18999000,
        category: "flagship",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/ph/2401/gallery/ph-galaxy-s24-s928-sm-s928bzkqphl-thumb-539303455?$GNB_CARD_FULL_M_PNG_PNG$",
        description: "Smartphone flagship terbaru dengan S Pen dan kamera 200MP",
        specs: {
          Display: "6.8 inch Dynamic AMOLED 2X",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "12GB",
          Storage: "256GB",
          Camera: "200MP + 50MP + 12MP + 10MP",
          Battery: "5000mAh",
        },
        stock: 50,
        status: "active",
      },
      {
        id: 2,
        name: "Samsung Galaxy S24+",
        price: "Rp 14.999.000",
        priceNum: 14999000,
        category: "flagship",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/ie/2401/gallery/ie-galaxy-s24--491404-sm-s926bzvgeub-539465389?$624_624_PNG$",
        description: "Performa flagship dengan layar 6.7 inch yang memukau",
        specs: {
          Display: "6.7 inch Dynamic AMOLED 2X",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "12GB",
          Storage: "256GB",
          Camera: "50MP + 12MP + 10MP",
          Battery: "4900mAh",
        },
        stock: 75,
        status: "active",
      },
      {
        id: 3,
        name: "Samsung Galaxy A55",
        price: "Rp 5.999.000",
        priceNum: 5999000,
        category: "mid-range",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/id/sm-a556elbdxid/gallery/id-galaxy-a55-5g-sm-a556-sm-a556elbdxid-thumb-540158198",
        description: "Smartphone mid-range dengan performa optimal dan desain premium",
        specs: {
          Display: "6.6 inch Super AMOLED",
          Processor: "Exynos 1480",
          RAM: "8GB",
          Storage: "128GB",
          Camera: "50MP + 12MP + 5MP",
          Battery: "5000mAh",
        },
        stock: 100,
        status: "active",
      },
      {
        id: 4,
        name: "Samsung Galaxy A35",
        price: "Rp 4.499.000",
        priceNum: 4499000,
        category: "mid-range",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/id/sm-a356elvgxid/gallery/id-galaxy-a35-5g-sm-a356-sm-a356elvgxid-540157803?$684_547_PNG$",
        description: "Smartphone dengan kamera canggih dan baterai tahan lama",
        specs: {
          Display: "6.6 inch Super AMOLED",
          Processor: "Exynos 1380",
          RAM: "8GB",
          Storage: "128GB",
          Camera: "50MP + 8MP + 5MP",
          Battery: "5000mAh",
        },
        stock: 120,
        status: "active",
      },
      {
        id: 5,
        name: "Samsung Galaxy A15",
        price: "Rp 2.499.000",
        priceNum: 2499000,
        category: "budget",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/id/sm-a156ezkixid/gallery/id-galaxy-a15-5g-sm-a156-sm-a156ezkixid-thumb-539496247",
        description: "Smartphone entry-level dengan fitur lengkap dan harga terjangkau",
        specs: {
          Display: "6.5 inch Super AMOLED",
          Processor: "MediaTek Dimensity 6100+",
          RAM: "6GB",
          Storage: "128GB",
          Camera: "50MP + 5MP + 2MP",
          Battery: "5000mAh",
        },
        stock: 200,
        status: "active",
      },
    ]
    localStorage.setItem("samsungProducts", JSON.stringify(products))
  },

  initArticles() {
    const articles = [
      {
        id: 1,
        title: "Review Samsung Galaxy S24 Ultra: Flagship Terdepan 2024",
        excerpt: "Ulasan lengkap smartphone flagship terbaru Samsung dengan fitur AI canggih",
        content:
          "Samsung Galaxy S24 Ultra hadir sebagai smartphone flagship terdepan di tahun 2024. Dengan layar Dynamic AMOLED 2X berukuran 6.8 inci, smartphone ini menawarkan pengalaman visual yang luar biasa. Prosesor Snapdragon 8 Gen 3 yang tertanam memberikan performa maksimal untuk segala kebutuhan, mulai dari gaming hingga produktivitas. Kamera utama 200MP menghasilkan foto dengan detail yang sangat tajam, sementara S Pen yang disematkan memungkinkan pengguna untuk lebih produktif dalam bekerja. Baterai 5000mAh dengan fast charging 45W memastikan smartphone ini dapat digunakan seharian penuh.",
        image:
          "https://dorangadget.com/wp-content/uploads/2024/01/Review-Samsung-Galaxy-S24-Ultra-1.jpg",
        author: "Tim Review Samsung",
        date: "2024-01-15",
        category: "Review",
        status: "published",
      },
      {
        id: 2,
        title: "Tips Fotografi Mobile dengan Samsung Galaxy",
        excerpt: "Panduan lengkap mengoptimalkan kamera Samsung untuk hasil foto terbaik",
        content:
          "Kamera Samsung Galaxy telah menjadi salah satu yang terdepan di industri smartphone. Untuk mendapatkan hasil foto terbaik, ada beberapa tips yang bisa diterapkan. Pertama, manfaatkan mode Pro untuk kontrol manual yang lebih detail. Kedua, gunakan fitur Night Mode untuk foto low-light yang menakjubkan. Ketiga, eksplorasi berbagai mode seperti Portrait, Panorama, dan Food untuk hasil yang optimal sesuai subjek. Keempat, manfaatkan AI Scene Optimizer yang secara otomatis menyesuaikan setting kamera berdasarkan subjek yang difoto. Terakhir, jangan lupa untuk membersihkan lensa secara rutin agar hasil foto selalu jernih.",
        image:
          "https://asset-2.tstatic.net/bangka/foto/bank/images/Cara-Setting-Kamera-Samsung-Agar-Jernih-Saat-Ambil-Foto-dan-Video-Kamu-Wajib-Tahu.jpg",
        author: "Photography Expert",
        date: "2024-01-10",
        category: "Tips",
        status: "published",
      },
      {
        id: 3,
        title: "Samsung One UI 6.1: Fitur Baru yang Wajib Dicoba",
        excerpt: "Eksplorasi fitur-fitur terbaru di One UI 6.1 yang membuat pengalaman Android semakin baik",
        content:
          "Samsung One UI 6.1 menghadirkan berbagai fitur baru yang meningkatkan pengalaman pengguna Android. Fitur Circle to Search memungkinkan pencarian visual dengan mudah hanya dengan menggambar lingkaran di layar. Live Translate memberikan terjemahan real-time untuk panggilan telepon dalam berbagai bahasa. Chat Assist membantu menulis pesan dengan tone yang tepat menggunakan AI. Wallpaper Engine yang baru memungkinkan personalisasi yang lebih mendalam. Battery optimization yang ditingkatkan memberikan daya tahan baterai yang lebih lama. Semua fitur ini dirancang untuk memberikan pengalaman yang lebih intuitif dan produktif bagi pengguna Samsung Galaxy.",
        image:
          "https://indogamers.com/_next/image?url=https%3A%2F%2Fassets.indogamers.com%2Fmedia%2Fimages%2F2024%2F09%2F11%2Fdesain_tanpa_judul_24.webp&w=3840&q=75",
        author: "Samsung Indonesia",
        date: "2024-01-05",
        category: "Update",
        status: "published",
      },
    ]
    localStorage.setItem("samsungArticles", JSON.stringify(articles))
  },

  getProducts() {
    return JSON.parse(localStorage.getItem("samsungProducts")) || []
  },

  getArticles() {
    return JSON.parse(localStorage.getItem("samsungArticles")) || []
  },

  getTransactions() {
    return JSON.parse(localStorage.getItem("samsungTransactions")) || []
  },

  addTransaction(transaction) {
    const transactions = this.getTransactions()
    transaction.id = Date.now()
    transaction.status = "pending"
    transaction.date = new Date().toISOString()
    transactions.push(transaction)
    localStorage.setItem("samsungTransactions", JSON.stringify(transactions))
    return transaction
  },
}
