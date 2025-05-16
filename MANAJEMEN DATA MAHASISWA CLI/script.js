const dataMahasiswa = [
  { nim: "24208063", nama: "Dwi", jurusan: "PTIK" },
  { nim: "24208012", nama: "Ardiyan", jurusan: "PTIK" },
  { nim: "24208081", nama: "Rifka", jurusan: "PTIK" },
];

function jalankanPerintah() {
  const inputField = document.getElementById("cli-input");
  const output = document.getElementById("cli-output");
  const perintah = inputField.value.trim();
  let hasil = "";

  if (perintah === "") return;

  const tokens = perintah.split(" ");
  const cmd = tokens[0].toLowerCase();

  switch (cmd) {
    case "tambah":
      if (tokens.length >= 4) {
        const nim = tokens[1];
        const jurusan = tokens[tokens.length - 1];
        const nama = tokens.slice(2, tokens.length - 1).join(" ");
        const sudahAda = dataMahasiswa.some((m) => m.nim === nim);
        if (sudahAda) {
          hasil = `Mahasiswa dengan NIM ${nim} sudah ada.`;
        } else {
          dataMahasiswa.push({ nim, nama, jurusan });
          hasil = `Mahasiswa ${nama} ditambahkan.`;
        }
      } else {
        hasil = "Format salah. Gunakan: tambah NIM Nama Jurusan";
      }
      break;

    case "cari":
      if (tokens.length === 2) {
        const nim = tokens[1];
        const mhs = dataMahasiswa.find((m) => m.nim === nim);
        hasil = mhs
          ? `NIM: ${mhs.nim}\nNama: ${mhs.nama}\nJurusan: ${mhs.jurusan}`
          : `Data mahasiswa dengan NIM ${nim} tidak ditemukan.`;
      } else {
        hasil = "Format salah. Gunakan: cari NIM";
      }
      break;

    case "hapus":
      if (tokens.length === 2) {
        const nim = tokens[1];
        const index = dataMahasiswa.findIndex((m) => m.nim === nim);
        if (index !== -1) {
          dataMahasiswa.splice(index, 1);
          hasil = `Data mahasiswa dengan NIM ${nim} dihapus.`;
        } else {
          hasil = `Data mahasiswa dengan NIM ${nim} tidak ditemukan.`;
        }
      } else {
        hasil = "Format salah. Gunakan: hapus NIM";
      }
      break;

    case "tampilkan":
      if (dataMahasiswa.length === 0) {
        hasil = "Belum ada data mahasiswa.";
      } else {
        hasil =
          "Daftar Mahasiswa:\n" +
          dataMahasiswa
            .map(
              (m, i) =>
                `${i + 1}. NIM: ${m.nim}, Nama: ${m.nama}, Jurusan: ${
                  m.jurusan
                }`
            )
            .join("\n");
      }
      break;

    case "help":
      hasil =
        "Perintah yang tersedia:\n" +
        "- tambah NIM Nama Jurusan\n" +
        "- cari NIM\n" +
        "- hapus NIM\n" +
        "- tampilkan\n" +
        "- help";
      break;

    default:
      hasil = `Perintah "${cmd}" tidak dikenal. Ketik "help" untuk daftar perintah.`;
  }

  output.textContent += `\n> ${perintah}\n${hasil}`;
  output.scrollTop = output.scrollHeight;
  inputField.value = "";
}

document.getElementById("cli-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") jalankanPerintah();
});
