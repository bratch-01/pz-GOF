/**
 * Патерн: Strategy (Стратегія)
 * Проблема: Потрібно мати можливість динамічно змінювати алгоритм дій об'єкта під час виконання програми.
 * Анти-приклад: Монолітний клас Navigator з гігантським блоком switch-case для різних типів маршрутів (авто, пішки, велосипед), який важко підтримувати і тестувати.
 */

interface RouteStrategy {
    buildRoute(A: string, B: string): void;
}

class RoadStrategy implements RouteStrategy {
    buildRoute(A: string, B: string): void {
        console.log(`Побудова автомобільного маршруту від ${A} до ${B}`);
    }
}

class WalkingStrategy implements RouteStrategy {
    buildRoute(A: string, B: string): void {
        console.log(`Побудова пішохідного маршруту від ${A} до ${B} (через парки)`);
    }
}

class NavigatorContext {
    private strategy: RouteStrategy;

    constructor(strategy: RouteStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: RouteStrategy): void {
        this.strategy = strategy;
    }

    executeStrategy(A: string, B: string): void {
        this.strategy.buildRoute(A, B);
    }
}

export function testStrategy() {
    console.log("--- Strategy ---");
    const navigator = new NavigatorContext(new RoadStrategy());
    navigator.executeStrategy("Дім", "Робота");

    console.log("Перемикання на пішохідний режим...");
    navigator.setStrategy(new WalkingStrategy());
    navigator.executeStrategy("Дім", "Магазин");
    console.log("");
}