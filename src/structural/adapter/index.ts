/**
 * Патерн: Adapter (Адаптер)
 * Проблема: Несумісність інтерфейсів. Наприклад, потрібно інтегрувати сторонню бібліотеку, інтерфейс якої не збігається з вашим кодом.
 * Анти-приклад: Переписування робочого бізнес-коду під формат нової бібліотеки, що порушує принцип відкритості/закритості (OCP).
 */

// Стара система (наш код очікує цей інтерфейс)
interface OldPaymentProcessor {
    payInUAH(amount: number): void;
}

// Нова стороння бібліотека (несумісний інтерфейс)
class StripePaymentService {
    makePaymentInUSD(dollars: number): void {
        console.log(`Stripe: Processed payment of $${dollars}`);
    }
}

// Адаптер
class StripeAdapter implements OldPaymentProcessor {
    private stripeService: StripePaymentService;
    private exchangeRate = 38.5; // Умовний курс

    constructor(stripeService: StripePaymentService) {
        this.stripeService = stripeService;
    }

    payInUAH(amount: number): void {
        const dollars = +(amount / this.exchangeRate).toFixed(2);
        console.log(`Adapter: Converting ${amount} UAH to $${dollars}`);
        this.stripeService.makePaymentInUSD(dollars);
    }
}

export function testAdapter() {
    console.log("--- Adapter ---");
    const stripe = new StripePaymentService();
    const adapter = new StripeAdapter(stripe);

    // Клієнтський код продовжує працювати з UAH
    adapter.payInUAH(1000);
    console.log("");
}