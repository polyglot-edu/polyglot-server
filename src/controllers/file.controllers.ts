import { Request, Response } from "express";
import FileMaterial from "../models/file.model";
const multer = require("multer");
//creazione path
const fs = require("fs");
const path = require("path");

const baseUploadsDir = path.join(__dirname, "../../uploads");

// Funzione per creare la directory se non esiste
const createUploadsDir = (dir:any) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Estendi l'interfaccia Request per includere la proprietà 'file'
const { Request } = require("express");

// Definizione del tipo per multer.File
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface RequestWithFile extends Request {
  file?: MulterFile; // Aggiungi la proprietà file di tipo MulterFile
}

// Configura multer per salvare i file
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    const nodeId = req.params.id; // ID del nodo passato come parametro
    const uploadsDir = path.join(baseUploadsDir, nodeId.toString());

    // Crea la directory per il nodo se non esiste
    createUploadsDir(uploadsDir);

    cb(null, uploadsDir); // directory dove salvare i file
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, Date.now() + "-" + file.originalname); // nome file con timestamp
  },
});
  
  const upload = multer({ storage });
  
  // API di Upload
  export const uploadFile = [
    upload.single("file"), // middleware multer per gestire l'upload del file
    async (req: RequestWithFile, res: Response) => { // Usa RequestWithFile qui
      const nodeId = req.params.id; // ID del nodo passato come parametro
  
      try {
        // Controlla se il file è stato caricato
        if (!req.file) {
          return res.status(400).json({ message: "Nessun file caricato" });
        }
  
        // Crea o aggiorna il file associato al nodo
        const updatedFile = await FileMaterial.findByIdAndUpdate(
          nodeId,
          {
            _id: nodeId,
            filename: req.file.filename,
            path: req.file.path,
            uploadedAt: new Date(),
          },
          { upsert: true, new: true }
        );
  
        res.json({ message: "File caricato con successo", file: updatedFile });
      } catch (error) {
        console.error(error); // Log dell'errore per debugging
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
      console.error(error); // Log dell'errore per debugging
      res.status(500).json({ message: "Errore durante il download del file" });
    }
  };