/**
 * Перелічення (enum) - це список іменованих констант, які можна використовувати як змінні.
 *
/* ---------- 1. Union type vs Enum (строкові значення) ---------- */
// Рекомендується починати з union type:
type StatusUnion = "pending" | "fulfilled" | "rejected";

// Якщо потрібен runtime-об'єкт (наприклад для перебору або передачі в коді):
enum Status {
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

// Використання union type (тип лише для перевірки компілятором):
let s1: StatusUnion = "pending";
// s1 = "unknown"; // помилка: невалідне значення

// Використання enum (є значення в runtime):
let s2: Status = Status.Pending;
// console.log(StatusEnum.Pending) // => "pending"

/* ---------- 2. Numeric enums і зворотне відображення ---------- */
type CodeUnion = 200 | 201 | 400 | 500;

enum HTTPCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  ServerError = 500,
}

const code1: CodeUnion = 200;

const code2: HTTPCode = HTTPCode.Success;

// Numeric enums мають двостороннє відображення: HTTPCode[200] === "Success"
// console.log(HTTPCode[200]);

/* ---------- 3. String enums (стабільні і зрозумілі) ---------- */
// type RoleUnion = "admin" | "user" | "guest";

enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

// let role: Role = Role.User;

// role = Role.Admin;

// interface User {
//   username: string;
//   role: Role; // використовуємо enum як тип і як значення
// }

// const user: User = {
//   username: "jacob",
//   role: Role.Guest,
// };

/* ---------- 4. Enum у switch/case ---------- */
function handleStatus(s: Status) {
  switch (s) {
    case Status.Pending:
      return "Waiting";
    case Status.Fulfilled:
      return "Done";
    case Status.Rejected:
      return "Failed";
  }
}

const statusText = handleStatus(Status.Pending);
console.log(statusText);/**
 * Узагальнені типи (generics)
 */

/* ---------- 1. Базова generic-функція ---------- */
function identity<T>(value: T): T {
  return value;
}

const n = identity<number>(42); // T виводиться як number
const s = identity<string>("hello"); // T виводиться як string

const logger = <T, Y>(a: T, b: Y): T | Y => {
  console.log(a);
  console.log(b);
  return a;
};

logger<number, string>(5, "a");
logger<string, boolean>("test", true);

/* ---------- 2. Generics з масивами ---------- */
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = firstElement<number>([10, 20, 30]);

const firstStr = firstElement<string>(["Alice", "Bob"]);
console.log(firstNum, firstStr);

/* ---------- 3. Обмеження ---------- */

// interface Teacher {
//   name: string;
//   students: string[];
// }

// interface Student {
//   name: string;
//   teacher: string;
// }

// function createHelloMessage<T extends { name: string }>(user: T) {
//   console.log(`Hello, ${user.name}`);
// }

// createHelloMessage<Teacher>({ name: "Olha", students: ["John", "Ann"] });
// createHelloMessage<Student>({ name: "Olha", teacher: "Olha" });

// function logLength<T extends { length: number }>(arg: T): number {
//   console.log("length:", arg.length);
//   return arg.length;
// }

// logLength([1, 2, 3]);
// logLength("hello world");
// logLength(42); // помилка: number не має length

/* ---------- 4. Дженерик інтерфейс: узагальнений тип API відповіді ---------- */
interface ApiResponse<T> {
  data: T;
  status: number;
}

interface Todo {
  id: number;
  title: string;
}

const todosResponse: ApiResponse<Todo[]> = {
  data: [
    { id: 1, title: "Learn generics" },
    { id: 2, title: "Learn enums" },
  ],
  status: 200,
};

// todosResponse.data[0].id;

const oneTodoResponse: ApiResponse<Todo> = {
  data: { id: 1, title: "Learn generics" },
  status: 200,
};

// oneTodoResponse.data.title

const oneTodoImageUrlResponse: ApiResponse<string> = {
  data: "https://i.imgur.com/OvMZBs9.jpeg",
  status: 200,
};

// /* ---------- 4. Practice ---------- */

// function saveToStorage<T>(key: string, value: T): void {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// saveToStorage("user", "Jacob Peterson");
// saveToStorage("clicks", 8);
// saveToStorage("clicks", [8]);

// function loadFromStorage<T>(key: string): null | T {
//   const item = localStorage.getItem(key);
//   if (item !== null) {
//     return JSON.parse(item);
//   }
//   return null;
// }

// const user = loadFromStorage<string>("user");
// const clicks = loadFromStorage<number>("clicks");

function max<T>(array: T[], selector: (item: T) => number): T {
  return array.reduce((prev, curr) =>
    selector(curr) > selector(prev) ? curr : prev
  );
}

interface Product {
  name: string;
  price: number;
}

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 800 },
];

const mostExpensive = max<Product>(products, (p) => p.price);
// → { name: "Laptop", price: 1000 }

interface User {
  displayName: string;
  age: number;
}

const users = [
  { displayName: "Poly", age: 5 },
  { displayName: "Jacob", age: 20 },
];

const oldestUser = max<User>(users, (u) => u.age);
// → { displayName: "Jacob", age: 20 }/**
 * Типізація промісів
 *
 * Явна типізація `Promise<T>` і використання `.then` з типізованими результатами
 */

/* ---------- 1. Promise<> ---------- */
const getData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello, TypeScript!"), 300);
  });
};

getData().then((result) => console.log(result.toUpperCase())); // Hello, TypeScript!

/* ---------- 2. Promise<T> з об'єктом ---------- */
interface User {
  id: number;
  name: string;
}

const getUser = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Alice" }), 300);
  });
};

getUser().then((user) => console.log(user.name)); // Alice

/* ---------- 3. Promise<T> з масивом об'єктів ---------- */
const getUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]),
      300
    );
  });
};

getUsers().then((users) => console.log(users[0].name)); // Alice/**
 * Типізація HTTP-запитів з Axios
 *
 * https://dummyjson.com/docs/posts
 */

import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface GetPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

const getAllPosts = async (): Promise<GetPostsResponse> => {
  const response = await axios.get<GetPostsResponse>(
    "https://dummyjson.com/posts"
  );
  return response.data;
};

// getAllPosts().then(data => data.posts)

const getPostById = async (postId: number): Promise<Post> => {
  const response = await axios.get<Post>(
    `https://dummyjson.com/posts/${postId}`
  );
  return response.data;
};

interface NewPostBody {
  title: string;
  userId: number;
}

const createPost = async (newPost: NewPostBody) => {
  const response = await axios.post<Post>(
    "https://dummyjson.com/posts/add",
    newPost
  );
  return response.data;
};
