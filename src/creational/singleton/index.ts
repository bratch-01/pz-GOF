/**
 * Патерн: Singleton (Одинак)
 * Проблема: Потрібно гарантувати, що у класу є лише один екземпляр (наприклад, підключення до БД або логер), і надати глобальну точку доступу до нього.
 * Анти-приклад: Створення нового підключення до БД при кожному запиті, що призводить до вичерпання ресурсів і розсинхронізації даних.
 */

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connectionId: number;

    private constructor() {
        // Приватний конструктор запобігає створенню об'єктів через оператор new
        this.connectionId = Math.random();
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public query(sql: string): void {
        console.log(`[DB ${this.connectionId}] Executing query: ${sql}`);
    }
}

export function testSingleton() {
    console.log("--- Singleton ---");
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();

    db1.query("SELECT * FROM users");
    console.log(`db1 and db2 are the same instance: ${db1 === db2}\n`);
}