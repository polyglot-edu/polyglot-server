import { Request, Response } from "express";
import FileMaterial from "../models/file.model";

const multer = require("multer");

// Configura multer per salvare i file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // directory dove salvare i file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // nome file con timestamp
  },
});

const upload = multer({ storage });

// API di Upload
export const uploadFile = [
  upload.single("file"), // middleware multer per gestire l'upload del file
  async (req: Request, res: Response) => {
    const nodeId = req.params.id; // ID del nodo passato come parametro

    try {
      // Controlla se il file è stato caricato
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      }

      // Crea o aggiorna il file associato al nodo
      const file = await FileMaterial.findByIdAndUpdate(
        nodeId,
        {
          _id: nodeId,
          filename: req.file.filename,
          path: req.file.path,
          uploadedAt: new Date(),
        },
        { upsert: true, new: true },
      );

      res.json({ message: "File caricato con successo", file });
    } catch (error) {
      res.status(500).json({ message: "Errore durante l'upload del file" });
    }
  },
];

// API di Download
export const download = async (req: Request, res: Response) => {
  const nodeId = req.params.id; // ID del nodo passato come parametro

  try {
    // Trova il file associato al nodo
    const file = await FileMaterial.findById(nodeId);

    if (!file) {
      return res.status(404).json({ message: "File non trovato" });
    }

    res.download(file.path, file.filename);
  } catch (error) {
    res.status(500).json({ message: "Errore durante il download del file" });
  }
};
