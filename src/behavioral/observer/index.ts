/**
 * Патерн: Observer (Спостерігач)
 * Проблема: Об'єкт має сповіщати інші об'єкти про зміни свого стану, при цьому не знаючи про них (низька зв'язність).
 * Анти-приклад: Об'єкт, що змінюється, має жорсткі посилання на всі залежні класи і прямо викликає їхні методи. Додавання нового залежного класу вимагає зміни головного класу.
 */

interface Observer {
    update(temperature: number): void;
}

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

class WeatherStation implements Subject {
    private observers: Observer[] = [];
    private temperature: number = 0;

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.temperature);
        }
    }

    setTemperature(temp: number): void {
        console.log(`WeatherStation: Температура змінилась на ${temp}°C`);
        this.temperature = temp;
        this.notify();
    }
}

class PhoneDisplay implements Observer {
    update(temperature: number): void {
        console.log(`PhoneDisplay: Оновлено дані. Поточна температура ${temperature}°C`);
    }
}

class WindowDisplay implements Observer {
    update(temperature: number): void {
        console.log(`WindowDisplay: На вулиці зараз ${temperature}°C`);
    }
}

export function testObserver() {
    console.log("--- Observer ---");
    const station = new WeatherStation();
    const phone = new PhoneDisplay();
    const window = new WindowDisplay();

    station.attach(phone);
    station.attach(window);

    station.setTemperature(25);
    console.log("Відключення PhoneDisplay...");
    station.detach(phone);
    station.setTemperature(20);
    console.log("");
}