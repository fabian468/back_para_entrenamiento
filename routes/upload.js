const express = require('express');
const multer = require('multer');
const path = require('path');
const TrainingEntry = require('../models/TrainingEntry');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post(
    '/upload',
    upload.fields([
        { name: 'modelFile', maxCount: 1 },
        { name: 'graphImages', maxCount: 10 }
    ]),
    async (req, res) => {
        console.log('Archivos recibidos:', req.files);

        try {
            const {
                episode,
                reward,
                loss,
                profitUSD,
                epsilon,
                drawdown,
                hitFrequency
            } = req.body;

            const modelPath = req.files?.modelFile?.[0]?.path || null;

            const graphImages = req.files?.graphImages?.map(file => file.path) || [];

            const entry = new TrainingEntry({
                episode,
                reward,
                loss,
                profitUSD,
                epsilon,
                drawdown,
                hitFrequency,
                modelPath,
                graphImages
            });

            await entry.save();
            res.status(200).json({ message: 'Datos de entrenamiento registrados.' });
        } catch (error) {
            res.status(500).json({ error: 'Error en carga de datos.', details: error.message });
        }
    }
);


module.exports = router;
