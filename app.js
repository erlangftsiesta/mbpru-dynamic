//Definisikan library dan modul yang akan dipakai
const express = require('express');
const mysql = require('mysql')
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Koneksi ke MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'kjpp_mbpru' // Ganti dengan nama database yang ingin Anda hubungkan
});

// Membuka koneksi ke database MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error koneksi ke database MySQL: ' + err.stack);
        return;
    }
    console.log('\nKonek Cuy');
});

//Middleware untuk Menangani Sesi User
app.use(session({
    secret: 'youAreNotAllowedToKnows!', // Ganti dengan string rahasia untuk mengamankan session
    resave: false,
    saveUninitialized: true
}));

//Middleware untuk memberikan pesan terkait error atau peringatan (middleware: flash)
app.use(flash());

//Inisialisasi pesan flash sebagai respon di local storage
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

//Gunakan Fungsi sesi untuk melakukan pengecekan sesi user 
const checkLogin = (req, res, next) => {
    // Misalnya, kita akan memeriksa apakah pengguna memiliki session yang menyatakan bahwa mereka sudah login
    if (!req.session.isAdmin) {
        // Jika pengguna belum login, arahkan ke halaman login
        req.flash('pesan', 'Login dulu bjir!')
        res.redirect('/login');
    } else {
        // Jika pengguna sudah login, lanjutkan ke middleware berikutnya atau route yang dituju
        next();
    }
};

// Middleware untuk menangani requests
app.use(bodyParser.urlencoded({ extended: true }));

//definisikan lokasi folder agar dibaca express
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'frontend/public')));

//sesuaikan lokasi folder render agar dibaca express
app.set('views', [
    path.join(__dirname, 'frontend/views'),
    path.join(__dirname, 'frontend/views/admin'),
]);

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

//Menampilkan halaman admin (admin.ejs)
app.get('/admin', checkLogin, function(req, res) {
    connection.query('SELECT * FROM form_permintaan', (err, results) => {
        if (err) throw err;
            //isi sama dashboard admin
            res.render('admin', {form_permintaan: results});
    });
});

//developer
app.get('/developer', function(req, res) {

    res.render('developer');
});

//Menampilkan halaman login (login.ejs)
app.get('/login', function(req, res) {
    const pesan = req.flash('pesan')[0];

    //Isi sama tampilan login
    res.render('login', {pesan});

});

//Menangani permintaan untuk login sebagai admin
app.post('/login', (req, res) => {
    const { admin, password } = req.body;

    // Query ke database untuk memeriksa kredensial admin
    connection.query('SELECT * FROM admin WHERE admin = ? AND password = ?', [admin, password], (error, results,) => {
        if (error) throw error;

        // Jika kredensial valid, arahkan ke halaman admin
        if (results.length > 0) {
            req.session.isAdmin = true;
            res.redirect('/admin');
        } else {
            // Jika kredensial tidak valid, kembali ke halaman login
            req.flash('pesan', 'salah ni bjir pw atau username nya')
            res.redirect('/login');
        }
    });
});

// Menghandle permintaan POST formulir
app.post('/post-form', (req, res) => {
    const { form_nama, form_email, form_nomorHandphone, form_nomorTelepon, form_provinsi, form_kotaKabupaten, form_provinsiAset, form_kotaKabupatenAset, form_tujuanPenilaian, form_objekPenilaian } = req.body;
    
    //Post Data ke Database
    const sql = 'INSERT INTO form_permintaan (nama, email, no_hp, no_telp, provinsi_pelanggan, kota_pelanggan, provinsi_aset, kota_aset, tujuan_penilaian, objek_penilaian) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [form_nama, form_email, form_nomorHandphone, form_nomorTelepon, form_provinsi, form_kotaKabupaten, form_provinsiAset, form_kotaKabupatenAset, form_tujuanPenilaian, form_objekPenilaian], (error, results) => {
        if (error) throw error;
        console.log('Data penilaian berhasil disimpan ke database.');
        // Setelah data disimpan, arahkan pengguna kembali ke halaman admin
        res.redirect('/contact');
    });

    // Contoh: Menampilkan data yang diterima di konsol
    console.log('Nama: ', form_nama);
    console.log('Email: ', form_email);
    console.log('Nomor Handphone: ', form_nomorHandphone);
    console.log('Nomor Telepon: ', form_nomorTelepon);
    console.log('Provinsi: ', form_provinsi);
    console.log('Kota/Kabupaten: ', form_kotaKabupaten);
    console.log('Provinsi Aset: ', form_provinsiAset);
    console.log('Kota/Kabupaten Aset: ', form_kotaKabupatenAset);
    console.log('Tujuan Penilaian: ', form_tujuanPenilaian);
    console.log('Objek Penilaian: ', form_objekPenilaian);

    // Setelah memproses data, Anda bisa merender halaman lain atau mengirimkan respons ke klien sesuai kebutuhan
    console.log('Data formulir berhasil diterima!');
});


// minta ultilitas/ultility ke Operating System (Just Gimmick)
const os = require('os');


// Menjalankan server
app.listen(PORT, () => {
    const cpuInfo = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const osInfo = os.platform();
    console.log(`Checking System Information... \nCPU: ${cpuInfo[0].model} \nRAM Tersedia: ${freeMemory / 1024 / 1024 / 1024} GB \nOperating System: ${osInfo} \nNode.JS sedang berjalan... \nTerhubung, Server berjalan pada port ${PORT}`);
});

