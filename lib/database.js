// lib/database.js
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Asegurarnos de que la carpeta de la base de datos existe
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'agroconecta.db');

// Crear conexión a la base de datos
const db = new Database(dbPath);

// Habilitar foreign keys y otras configuraciones
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// Crear tabla de usuarios si no existe
try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            farm_name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    console.log('✅ Base de datos inicializada correctamente');
    console.log('📁 Ubicación de la base de datos:', dbPath);
} catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
}

export default db;