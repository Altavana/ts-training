// 1

class User1 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 2

class User2 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello(): string {
    return `Hi, I'm ${this.name}`;
  }
}

// 3
// public — доступні всюди (за замовчуванням)

// private — доступні тільки всередині класу

// protected — доступні в класі та його нащадках

class Account {
  private balance: number = 0;

  protected deposit(amount: number): void {
    this.balance += amount;
  }
}

// 4
interface Animal1 {
  name: string;
  speak(): void;
}

class Dog1 implements Animal1 {
  name: string = "Buddy";

  speak(): void {
    console.log("Woof!");
  }
}

// 5

class Vehicle {
  protected readonly model: string;
  protected readonly year: number;

  constructor(model: string, year: number) {
    this.model = model;
    this.year = year;
  }

  protected getInfo(): string {
    return `${this.model} (${this.year})`;
  }
}

// 6

class User3 {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  get upperName(): string {
    return this.name.toUpperCase();
  }
}

class User4 {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  set rename(n: string) {
    // ❌ Error
    this.name = n;
  }
}

// 7

abstract class Animal2 {
  abstract readonly animalName: string; // без значення
  abstract makeSound(): void; // абстрактний метод (без реалізації)

  move(): void {
    console.log("I am moving");
  }
}

class Dog2 extends Animal2 {
  animalName: string = "Dog";
  makeSound(): void {
    console.log("Woof!");
  }
}

const d = new Dog2();
d.animalName; // "Dog"
d.makeSound(); // "Woof!"
d.move(); // "I am moving"
