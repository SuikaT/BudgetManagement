import { Injectable } from "@angular/core";
import { SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { CapacitorSQLite } from "@capacitor-community/sqlite";

@Injectable({
    providedIn: "root",
})
export class SQLiteService {
    private sqlite: SQLiteConnection;
    private database!: SQLiteDBConnection;

    constructor() {
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }

    async initDB() {
        // Create a connection
        this.database = await this.sqlite.createConnection("mydb", false, "no-encryption", 1, false);

        // Open the connection
        await this.database.open();

        // Create your tables
        await this.database.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    }
}
