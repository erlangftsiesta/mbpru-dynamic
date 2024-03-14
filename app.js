const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.set('views', path.join(__dirname, 'frontend/views'));

// Mengatur EJS sebagai view engine
app.set('view engine', 'ejs');

// Menampilkan halaman utama
app.get('/', (req, res) => {
    // Mengirim data ke halaman utama
    const data = {
        title: 'Halaman Utama',
        message: 'Selamat datang di aplikasi Express dengan EJS!'
    };
    res.render('home', { data });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
