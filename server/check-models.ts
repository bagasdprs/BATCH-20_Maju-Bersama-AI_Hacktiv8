import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

const checkModels = async () => {
  console.log("--- DEBUG INFO ---");

  if (!API_KEY) {
    console.error("❌ API Key KOSONG/UNDEFINED. Cek nama variabel di .env!");
    return;
  }

  console.log(`🔑 Key terdeteksi: ${API_KEY.substring(0, 4)}...`);
  console.log(`📏 Panjang Key: ${API_KEY.length} karakter`);

  // Cek spasi
  if (API_KEY.trim() !== API_KEY) {
    console.error("⚠️  BAHAYA: Ada SPASI di awal atau akhir Key kamu! Hapus spasinya di .env");
  } else {
    console.log("✅ Format Key bersih (tidak ada spasi).");
  }
  console.log("------------------");

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    console.log("\n🔍 Mencoba connect ke Google...");
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      console.log("✅ KONEKSI SUKSES! API Key Valid.");
      console.log("Model yang tersedia:");
      data.models.forEach((m: any) => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          // Highlight model yang kita cari
          const tanda = m.name.includes("gemini-1.5-flash") ? "👈 (PILIH INI)" : "";
          console.log(`- ${m.name.replace("models/", "")} ${tanda}`);
        }
      });
    } else {
      console.log("❌ Masih Gagal:", data.error.message);
    }
  } catch (error) {
    console.error("Error connection:", error);
  }
};

checkModels();
