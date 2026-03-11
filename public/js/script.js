// ================================================
// 1. FITUR DARK MODE (LocalStroge & DOM)
// ================================================

const btnTheme = document.getElementById('btn-theme');
const body = document.body;

// Cek apakah ada simpanan tema di browser
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    btnTheme.innerText = "Mode Terang";    
}

btnTheme.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Simpan tema ke localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        btnTheme.innerText = "Mode Terang";
    } else {
        localStorage.setItem('theme', 'light');
        btnTheme.innerText = "Mode Gelap";
    }
});

// ================================================
// 2.   FITUR BELI (EVENT LISTENE & MATH)
// ================================================
function aktifkanTombolBeli() {
    const tombolBeli = document.querySelectorAll('.btn-detail');
    tombolBeli.forEach(button => {
        button.replaceWith(button.cloneNode(true)); // Hapus event listener lama
    });

    const tombolBaru = document.querySelectorAll('.btn-detail');
    tombolBaru.forEach(function(button) {
        button.addEventListener('click', function (e) {
            const cardBody = e.target.closest('.card-body');
            const stokElement = cardBody.querySelector('.stok-text');
            let stok = parseInt(stokElement.innerText.replace('Stok: ', ''));

            if (stok > 0) {
                stok--;
                stokElement.innerText = `Stok: ${stok}`;
                const namaBarang = cardBody.querySelector('.card-title').innerText; 
                alert(`Terima kasih telah membeli produk ${namaBarang}!`);
            } else {
                alert('Maaf, stok habis!');
                e.target.disabled = true; 
                e.target.innerText = "Habis";
            }
        }); 
    });
}
aktifkanTombolBeli(); 
// digunakan untuk setiap nge reload halaman, function ini dipanggil

// ================================================
// 3.   wishlist (DOM & LocalStorage)
// ================================================

function aktifkanTombolWishlist() {
    const tombolWishlist = document.querySelectorAll('.btn-wishlist');

    tombolWishlist.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    const tombolBaru = document.querySelectorAll('.btn-wishlist');

    tombolBaru.forEach(button => {
        const cardBody = button.closest('.card-body');
        const namaBarang = cardBody.querySelector('.card-title').innerText;

        let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];

        if (wishlist.includes(namaBarang)) {
            button.classList.remove('btn-outline-danger');
            button.classList.add('btn-danger');
            button.innerText = "❤️ Disimpan";
        } else {
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline-danger');
            button.innerText = "❤️ Wishlist"
        }

        button.addEventListener('click', function(e) {
            let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
            if (!wishlist.includes(namaBarang)) {
                const ok = confirm(`Tambahkan ${namaBarang} ke wishlist?`);
                if (ok) {
                    wishlist.push(namaBarang);
                    e.target.classList.remove('btn-outline-danger');
                    e.target.classList.add('btn-danger');
                    e.target.innerText = "❤️ Disimpan";
                }
            } else {
                const ok = confirm(`Hapus ${namaBarang} dari wishlist?`);
                if (ok) {
                    wishlist = wishlist.filter(item => item !== namaBarang);
                    e.target.classList.remove('btn-danger');
                    e.target.classList.add('btn-outline-danger');
                    e.target.innerText = "❤️ wishlist";
                }
            }

            sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateBadgeWishlist();
        })
    })
}

function updateBadgeWishlist() {
    const wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    document.getElementById('wishlistCount').innerText = wishlist.length;
}

function tampilkanwishlist() {
    const daftar = document.getElementById('daftar-wishlist');
    let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];

    daftar.innerHTML = "";

    if (wishlist.length === 0) {
        let liKosong = document.createElement('li');
        liKosong.className = "list-group-item text-center text-muted";
        liKosong.innerText = "Belum ada barang di wishlist." ;
        daftar.appendChild(liKosong);
    } else {
        wishlist.forEach(function(item) {
            let li = document.createElement('li');
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerText = item;

            daftar.appendChild(li);
        });
    }
}

function hapusWishlist() {
    sessionStorage.removeItem('wishlist');
    updateBadgeWishlist();
    tampilkanwishlist();
    aktifkanTombolWishlist();
}

aktifkanTombolWishlist()
updateBadgeWishlist();
