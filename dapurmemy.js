let cart = JSON.parse(localStorage.getItem("cart")) || [];
const nomorWA = "6287848069337";
let currentItem = null;

function addToCart(btn) {
    currentItem = {
        nama: btn.dataset.nama,
        harga: parseInt(btn.dataset.harga)
    };
    const popup = document.getElementById("popupAlert");
    if (!popup) return;
    document.getElementById("popupMessage").innerText =
        "Masukkan jumlah " + currentItem.nama;
    document.getElementById("jumlahInput").value = "";
    popup.classList.add("show");
}

function submitJumlah() {
    const jumlahInput = document.getElementById("jumlahInput");
    if (!jumlahInput) return;
    const jumlah = parseInt(jumlahInput.value);
    if (!jumlah || jumlah <= 0) {
        document.getElementById("popupMessage").innerText =
            "Jumlah tidak valid ❌";
        return;
    }

    let item = cart.find(i => i.nama === currentItem.nama);
    if (item) item.jumlah += jumlah;
    else cart.push({ nama: currentItem.nama, harga: currentItem.harga, jumlah });

    simpanCart();
    tampilkanCart();
    tampilkanPesanan();
    closePopup();
}

function closePopup() {
    const popup = document.getElementById("popupAlert");
    if (!popup) return;
    popup.classList.remove("show");
}

function tampilkanCart() {
    const list = document.getElementById("cart-list");
    if (!list) return;
    list.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nama} x ${item.jumlah}</span>
            <span>Rp ${(item.harga*item.jumlah).toLocaleString("id-ID")}
            <button onclick="hapusItem(${index})" style="margin-left:10px; cursor:pointer;">❌</button></span>
        `;
        list.appendChild(li);
    });
}

function hapusItem(index) {
    cart.splice(index,1);
    simpanCart();
    tampilkanCart();
    tampilkanPesanan();
}

function tampilkanPesanan() {
    const textarea = document.getElementById("pesan");
    if (!textarea) return;
    textarea.value = cart.map(item => `- ${item.nama} x ${item.jumlah} (Rp ${item.harga*item.jumlah})`).join("\n");
}

function kirimWA() {
    const nama = document.getElementById("nama")?.value.trim() || "";
    const alamat = document.getElementById("alamat")?.value.trim() || "";
    const pesanTextarea = document.getElementById("pesan")?.value.trim() || "";

    if (!nama || !alamat || !pesanTextarea) {
        alert("Nama, alamat, dan pesanan harus diisi!");
        return;
    }

    let pesanWA = `Halo Dapur Memy,\n\nNama: ${nama}\nAlamat: ${alamat}\n\nPesanan:\n${pesanTextarea}`;
    let total = cart.reduce((sum,item)=>sum+item.harga*item.jumlah,0);
    pesanWA += `\n\nTotal: Rp ${total.toLocaleString("id-ID")}`;

    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`,"_blank");
}

// Tombol WA di menu halaman
function gotoIndexWA() {
    window.location.href = "index.html";
}

function simpanCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
    tampilkanCart();
    tampilkanPesanan();
});
