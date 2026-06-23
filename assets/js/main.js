/* ==========================================================================
   FLO-TEST - EPIC 3: LOGIKA UTAMA (ADMIN, MENTOR, & MENTI)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ----------------------------------------------------------------------
       1. LOGIKA MENTOR (Manajemen Paket Tes Dinamis)
       ---------------------------------------------------------------------- */
    const formCreateTest = document.querySelector("#content-mentor form");
    const tableBodyTests = document.querySelector("#content-tes table tbody");
    const badgeCountMentor = document.querySelector("#content-tes .badge-count");
    const tabDaftarTes = document.getElementById("tab-tes");
    let totalPaketUjian = 3;

    if (formCreateTest && tableBodyTests) {
        formCreateTest.addEventListener("submit", (event) => {
            event.preventDefault();

            const inputJudul = formCreateTest.querySelector("input[placeholder*='Contoh']").value.trim();
            const textareaSoal = formCreateTest.querySelector("textarea").value.trim();

            if (!inputJudul || !textareaSoal) {
                alert("Harap isi Judul dan Pertanyaan Soal terlebih dahulu!");
                return;
            }

            // GANTI bagian pembuatan elemen tr di dalam logika mentor dengan ini:
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td class="test-title-cell">${escapeHTML(inputJudul)}</td>
                    <td>1 Soal</td>
                    <td><span class="status draft">Draft</span></td>
                `;

            tableBodyTests.insertBefore(newRow, tableBodyTests.firstChild);
            totalPaketUjian++;
            if (badgeCountMentor) badgeCountMentor.textContent = `${totalPaketUjian} Paket Tes`;

            formCreateTest.reset();
            alert("Soal ujian baru berhasil disimpan ke Daftar Tes!");

            if (tabDaftarTes) {
                setTimeout(() => { tabDaftarTes.checked = true; }, 500);
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. LOGIKA MENTI (Ujian Interaktif & Hitung Skor Otomatis)
       ---------------------------------------------------------------------- */
    const formTakeTest = document.querySelector("#content-menti form");
    const scoreCard = document.getElementById("menti-score-result");
    const tabRiwayatHasil = document.getElementById("tab-tes");
    const tableBodyResult = document.querySelector("#content-tes table tbody");

    if (formTakeTest) {
        formTakeTest.addEventListener("submit", (event) => {
            event.preventDefault();

            // Ambil jawaban yang dipilih siswa
            const selectedOption = formTakeTest.querySelector("input[name='html-ans']:checked");
            
            if (!selectedOption) {
                alert("Silakan pilih salah satu jawaban terlebih dahulu!");
                return;
            }

            // Hitung Skor (Kunci Jawaban yang benar adalah B)
            let skorAkhir = 0;
            if (selectedOption.value === "B") {
                skorAkhir = 100;
            } else {
                skorAkhir = 0;
            }

            // Tampilkan hasil skor di halaman secara dinamis
            if (scoreCard) {
                const scoreNumText = scoreCard.querySelector(".score-num");
                if (scoreNumText) {
                    scoreNumText.innerHTML = `${skorAkhir} <span style="font-size: 1.2rem; color: #64748b;">/ 100</span>`;
                }
                
                // Atur warna teks/border berdasarkan kelulusan (Kriteria kelulusan >= 75)
                if (skorAkhir >= 75) {
                    scoreCard.style.borderColor = "#10b981";
                    scoreCard.style.background = "#f0fdf4";
                    scoreCard.querySelector("h3").textContent = "🎉 Ujian Berhasil Dikirim! Anda Lulus.";
                    scoreCard.querySelector("h3").style.color = "#10b981";
                } else {
                    scoreCard.style.borderColor = "#ef4444";
                    scoreCard.style.background = "#fef2f2";
                    scoreCard.querySelector("h3").textContent = "❌ Ujian Berhasil Dikirim! Nilai Belum Cukup.";
                    scoreCard.querySelector("h3").style.color = "#ef4444";
                }
                
                scoreCard.style.display = "block";
            }

            // BONUS: Otomatis tambahkan ke tabel "Riwayat Hasil" Menti
            if (tableBodyResult) {
                const tanggalSekarang = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                const statusLulus = skorAkhir >= 75 ? '<span class="status published">Lulus</span>' : '<span class="status archived">Gagal</span>';
                
                const resultRow = document.createElement("tr");
                resultRow.innerHTML = `
                    <td class="test-title-cell">Ujian Utama: Pemrograman HTML & CSS Dasar</td>
                    <td>${tanggalSekarang}</td>
                    <td><strong>${skorAkhir} / 100</strong></td>
                    <td>${statusLulus}</td>
                `;
                tableBodyResult.insertBefore(resultRow, tableBodyResult.firstChild);
            }

            alert("Jawaban kamu telah berhasil disimpan!");
            formTakeTest.reset();
        });
    }

    /* ----------------------------------------------------------------------
       3. LOGIKA ADMIN (Pencatatan / Manajemen User Sederhana)
       ---------------------------------------------------------------------- */
    const formAdminUser = document.querySelector("#content-mentor form"); // Menyesuaikan selektor jika ada form user admin
    // Kamu bisa kembangkan aksi manipulasi baris tabel data admin di sini nanti
});

/**
 * Utility Helper untuk mencegah serangan XSS (Cross-Site Scripting)
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/* ----------------------------------------------------------------------
       4. LOGIKA INDEX (Validasi Login Sederhana / Redirection)
       ---------------------------------------------------------------------- */
    const loginForm = document.querySelector(".form-login");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const emailInput = loginForm.querySelector("input[type='email']").value.trim();
            const passwordInput = loginForm.querySelector("input[type='password']").value.trim();
            
            if (emailInput === "" || passwordInput === "") {
                alert("Email dan Password tidak boleh kosong!");
                return;
            }
            
            alert("Login berhasil! Mengalihkan ke dashboard...");
        });
    }

    function login(role) {
    // Arahkan berdasarkan role
    switch(role) {
        case 'admin':
            window.location.href = 'admin/dashboard.html';
            break;
        case 'mentor':
            window.location.href = 'mentor/dashboard.html';
            break;
        case 'menti':
            window.location.href = 'menti/dashboard.html';
            break;
        default:
            alert('Role tidak dikenal');
    }
}

