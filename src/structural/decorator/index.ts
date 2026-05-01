/**
 * Патерн: Decorator (Декоратор)
 * Проблема: Необхідність динамічно додавати нову поведінку об'єктам без використання успадкування.
 * Анти-приклад: Створення величезної кількості підкласів для кожної комбінації властивостей (Notifier, SMSNotifier, SlackNotifier, SMSAndSlackNotifier тощо).
 */

interface Notifier {
    send(message: string): void;
}

class EmailNotifier implements Notifier {
    send(message: string): void {
        console.log(`Sending Email: ${message}`);
    }
}

abstract class NotifierDecorator implements Notifier {
    protected wrapper: Notifier;

    constructor(notifier: Notifier) {
        this.wrapper = notifier;
    }

    send(message: string): void {
        this.wrapper.send(message);
    }
}

class SMSDecorator extends NotifierDecorator {
    send(message: string): void {
        super.send(message);
        console.log(`Sending SMS: ${message}`);
    }
}

class SlackDecorator extends NotifierDecorator {
    send(message: string): void {
        super.send(message);
        console.log(`Sending Slack message: ${message}`);
    }
}

export function testDecorator() {
    console.log("--- Decorator ---");
    let notifier: Notifier = new EmailNotifier();
    // Додаємо поведінку SMS та Slack динамічно
    notifier = new SMSDecorator(notifier);
    notifier = new SlackDecorator(notifier);

    notifier.send("Увага! Сервер перевантажено.");
    console.log("");
}