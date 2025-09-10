// GANTI DENGAN URL APLIKASI WEB ANDA DARI LANGKAH 2
const URL_API = 'https://script.google.com/macros/s/AKfycbxRCPYfhWSonrvG-UjHvvcTrghr7MgODYW9GMPy9iPgEyBfmBqPSB5DqFfocQIAy6w5zg/exec';

const nikInput = document.getElementById('nikInput');
const cekButton = document.getElementById('cekButton');
const hasilDiv = document.getElementById('hasil');

cekButton.addEventListener('click', () => {
    const nik = nikInput.value.trim();
    if (nik === '') {
        alert('NIK tidak boleh kosong!');
        return;
    }

    hasilDiv.style.display = 'block';
    hasilDiv.className = 'hasil-container'; // Reset class
    hasilDiv.innerHTML = '<p>Mencari data...</p>';

    // Memanggil API Google Apps Script
    fetch(`${URL_API}?nik=${nik}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                hasilDiv.classList.add('sukses');
                hasilDiv.innerHTML = `
                    <p><strong>Nama Pasien:</strong> ${data.nama}</p>
                    <p><strong>Status:</strong> ${data.status_pasien}</p>
                    <p><strong>Catatan:</strong> ${data.catatan}</p>
                `;
            } else {
                hasilDiv.classList.add('error');
                hasilDiv.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            hasilDiv.classList.add('error');
            hasilDiv.innerHTML = '<p>Terjadi kesalahan saat menghubungi server. Silakan coba lagi.</p>';
        });
});