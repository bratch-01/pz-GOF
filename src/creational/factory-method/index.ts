/**
 * Патерн: Factory Method (Фабричний метод)
 * Проблема: Необхідність створювати об'єкти без вказівки їх конкретних класів.
 * Анти-приклад: Жорстке прив'язування до конкретних класів (через new) по всьому коду з купою if/else для визначення типу об'єкта.
 */

interface Transport {
    deliver(): void;
}

class Truck implements Transport {
    deliver(): void {
        console.log("Доставка вантажу по суші вантажівкою.");
    }
}

class Ship implements Transport {
    deliver(): void {
        console.log("Доставка вантажу по морю судном.");
    }
}

abstract class Logistics {
    // Фабричний метод
    public abstract createTransport(): Transport;

    public planDelivery(): void {
        const transport = this.createTransport();
        transport.deliver();
    }
}

class RoadLogistics extends Logistics {
    public createTransport(): Transport {
        return new Truck();
    }
}

class SeaLogistics extends Logistics {
    public createTransport(): Transport {
        return new Ship();
    }
}

export function testFactoryMethod() {
    console.log("--- Factory Method ---");
    const roadLogistics = new RoadLogistics();
    roadLogistics.planDelivery();

    const seaLogistics = new SeaLogistics();
    seaLogistics.planDelivery();
    console.log("");
}