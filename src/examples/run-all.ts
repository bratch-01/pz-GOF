import { testSingleton } from "../creational/singleton";
import { testFactoryMethod } from "../creational/factory-method";
import { testAdapter } from "../structural/adapter";
import { testDecorator } from "../structural/decorator";
import { testStrategy } from "../behavioral/strategy";
import { testObserver } from "../behavioral/observer";

console.log("==========================================");
console.log("Демонстрація GOF Патернів Проєктування");
console.log("==========================================\n");

// Creational
testSingleton();
testFactoryMethod();

// Structural
testAdapter();
testDecorator();

// Behavioral
testStrategy();
testObserver();

console.log("==========================================");
console.log("Демонстрацію успішно завершено.");
console.log("==========================================");