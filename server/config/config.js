// ==========================
// Puerto
// ==========================

process.env.PORT = process.env.PORT || 3000;


// ==========================
// Entorno
// ==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ==========================
// Base de datos
// ==========================

let urlDB;

if(process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/demo';
else
    urlDB = 'mongodb+srv://samuel:123456@cluster0.ggmtc.mongodb.net/app-node-restserver';


process.env.URLDB = urlDB;
