const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI no está definida en las variables de entorno');
    }
    await mongoose.connect(uri);
    console.log('conectado a MongoDB');
  } catch (err) {
    console.error('Error a conectar a MONGODB', err);
    process.exit(1);
  }
}

module.exports = connectDB;

