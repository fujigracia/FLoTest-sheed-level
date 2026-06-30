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

document.addEventListener("DOMContentLoaded", () => {
    // 1. Definisikan semua database soal di satu tempat
    const databaseSoal = {
        "matematika": {
            judul: "Matematika",
            soal: [
                { q: "Berapakah hasil dari 15 + 20 x 2?", a: ["45", "55", "70", "75"], correct: 1 },
                { q: "Jika x + 5 = 12, berapakah nilai x?", a: ["5", "6", "7", "8"], correct: 2 },
                { q: "Hasil dari 2³ + 3² adalah...", a: ["13", "15", "17", "19"], correct: 2 },
                { q: "Luas persegi panjang dengan panjang 10cm dan lebar 5cm?", a: ["15 cm²", "30 cm²", "50 cm²", "100 cm²"], correct: 2 },
                { q: "Nilai dari √144 adalah...", a: ["10", "11", "12", "14"], correct: 2 }
            ]
        }
        // Anda bisa menambah mapel lain di sini dengan format yang sama
    };

    // Cek apakah kita ada di halaman take-test.html
    if (!document.getElementById('quiz-form')) return;

    // 2. Ambil parameter mapel dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const mapel = urlParams.get('mapel'); // Mengambil 'matematika'
    const data = databaseSoal[mapel];

    if (!data) {
        document.querySelector('.quiz-container').innerHTML = "<h3>Ujian tidak ditemukan!</h3>";
        return;
    }

    // Update judul ujian
    document.getElementById('judul-ujian').innerText = `Ujian: ${data.judul}`;

    // 3. Logika Menampilkan Soal
    let indexSoal = 0;
    const totalSoal = data.soal.length;

    function renderSoal() {
        const s = data.soal[indexSoal];
        document.getElementById('nomor-soal').innerHTML = `Pertanyaan Nomor <strong>${indexSoal + 1}</strong> dari ${totalSoal}`;
        document.getElementById('progres-teks').innerText = `Progres: ${Math.round(((indexSoal + 1) / totalSoal) * 100)}%`;
        document.getElementById('progress-bar').style.width = `${((indexSoal + 1) / totalSoal) * 100}%`;
        document.getElementById('question-text').innerText = `${indexSoal + 1}. ${s.q}`;

        let optionsHTML = '';
        s.a.forEach((opt, i) => {
            optionsHTML += `
                <label class="option-item">
                    <input type="radio" name="jawaban" value="${i}"> ${opt}
                </label>`;
        });
        document.getElementById('options-list').innerHTML = optionsHTML;

        document.getElementById('btn-next').style.display = indexSoal === (totalSoal - 1) ? 'none' : 'block';
        document.getElementById('btn-submit').style.display = indexSoal === (totalSoal - 1) ? 'block' : 'none';
    }

    document.getElementById('btn-next').onclick = () => { if(indexSoal < totalSoal - 1) { indexSoal++; renderSoal(); } };
    document.getElementById('btn-prev').onclick = () => { if(indexSoal > 0) { indexSoal--; renderSoal(); } };

    document.getElementById('quiz-form').onsubmit = (e) => {
        e.preventDefault();
        alert('Ujian selesai! Jawaban Anda telah tersimpan.');
        window.location.href = 'dashboard.html';
    };

    renderSoal();
});