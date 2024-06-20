import validator from "validator"; // Mengimpor modul validator dari library validator

class FormValidator {
  // Konstruktor untuk kelas FormValidator
  constructor(validations) {
    // Menyimpan aturan validasi yang diberikan ke dalam properti kelas
    this.validations = validations;
  }

  // Metode untuk memvalidasi state (keadaan) dari form
  validate(state) {
    // Memulai validasi dengan menganggap semua field valid
    let validation = this.valid();

    // Iterasi melalui setiap aturan validasi
    this.validations.forEach((rule) => {
      // Jika field belum ditandai sebagai tidak valid oleh aturan sebelumnya
      if (!validation[rule.field].isInvalid) {
        // Mengambil nilai field, argumen opsional, dan metode validasi dari aturan
        const field_value = state[rule.field].toString(); // Mengubah nilai field menjadi string
        const args = rule.args || []; // Mengambil argumen tambahan atau array kosong jika tidak ada
        const validation_method =
          typeof rule.method === "string" // Mengecek apakah metode validasi adalah string
            ? validator[rule.method] // Jika string, ambil metode dari validator
            : rule.method; // Jika bukan, gunakan metode yang diberikan secara langsung

        // Memanggil metode validasi dengan nilai field saat ini, argumen tambahan, dan state
        // Jika hasilnya tidak sesuai dengan properti rule.validWhen, tandai field sebagai tidak valid
        if (validation_method(field_value, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message }; // Set status tidak valid dan pesan error
          validation.isValid = false; // Set form sebagai tidak valid
        }
      }
    });

    // Mengembalikan hasil validasi
    return validation;
  }

  // Metode untuk menginisialisasi objek validasi dengan menganggap semua field valid
  valid() {
    const validation = {}; // Membuat objek validasi kosong

    // Iterasi melalui setiap aturan validasi dan inisialisasi status validasi field ke tidak invalid dan pesan kosong
    this.validations.map(
      (rule) => (validation[rule.field] = { isInvalid: false, message: "" })
    );

    // Mengembalikan objek validasi dengan status isValid true dan field validasi yang sudah diinisialisasi
    return { isValid: true, ...validation };
  }
}

// Mengekspor kelas FormValidator sebagai modul
export default FormValidator;
