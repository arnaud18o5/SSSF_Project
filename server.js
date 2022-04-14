'use strict';
import express from 'express';
import db from './utils/db'

const app = express();
const PORT = process.env.PORT || 8080;

db.on('connected', () => {
    app.listen(PORT, () => {
        console.log('Server ready');
    });
})
