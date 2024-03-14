//Definisikan library dan modul yang akan dipakai
const express = require('express');
const mysql = require('mysql')
const app = express();
const path = require('path');
const PORT = 3000;

// Koneksi ke MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: '', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'kjpp_mbpru' // Ganti dengan nama database yang ingin Anda hubungkan
});

// Membuka koneksi ke database MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error koneksi ke database MySQL: ' + err.stack);
        return;
    }
    console.log('Terhubung dengan ID koneksi MySQL: ' + connection.threadId);
});

//definisikan lokasi folder agar dibaca express
app.use(express.static(path.join(__dirname, 'frontend')));
app.set('views', path.join(__dirname, 'frontend/views'));

// Mengatur EJS sebagai view engine
app.set('view engine', 'ejs');

// Menampilkan halaman utama (home.ejs)
app.get('/', (req, res) => {
    // Mengirim data ke halaman utama
    const data = {
        title: 'Halaman Utama',
        message: 'Selamat datang di aplikasi Express dengan EJS!'
    };
    res.render('home', { data });
});

//Menampilkan halaman profile (profile.ejs)
app.get('/profile', function(req, res) {

    res.render('profile');
});

//Menampilkan halaman product & Services (product-service.ejs)
app.get('/service', function(req, res){

    res.render('service');
});

//Menampilkan halaman corporate values (corporate-service.ejs)
app.get('/value', function(req, res) {

    res.render('value');
});

//Menampilkan halaman portfolio (portfolio.ejs)
app.get('/portfolio', function(req, res) {

    res.render('portfolio');
});

//Menampilkan halaman gallery (gallery.ejs)
app.get('/gallery', function(req, res) {

    res.render('gallery');
});

//Menampilkan halaman contact (contact.ejs)
app.get('/contact', function(req, res) {

    res.render('contact');
});

//Menampilkan halaman error (missing.ejs)
app.get('/page-not-found', function(req, res) {

    res.render('missing');
});

app.get('/admin', function(req, res) {
    res.render('admin');

});

app.post('/post-admin', (req, res) => {
    const username = ['username'];
    const password = ['password'];

    if (username && password){
        
    }
});

app.post('/post-form', (req, res) => {
    const form_nama = ['nama'];
    const form_email = ['email'];
    const form_nomorHandphone = ['handphone'];
    const form_nomorTelepon = ['telepon'];
    const form_provinsi = ['provinsi'];
    const form_kotaKabupaten = ['kota-kabupaten'];
    const form_tujuanPenilaian = ['tujuan-penilaian'];
    const form_objekPenilaian = ['objek-penilaian'];

})

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
