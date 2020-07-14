const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

/*Esto es para cuando se ingresan valores unicos, ej: Usuario.js */
mongoose.set('useCreateIndex', true);

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser :true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('DB conectado');
        

    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la app
    }
}

module.exports = conectarDB;