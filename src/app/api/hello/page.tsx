import { NextResponse } from "next/server";

export async function GET() {
  // Array of greetings in different languages
  const greetings = [
    { message: "Hello, World!" },
    { message: "¡Hola, Mundo!" },
    { message: "Bonjour, Monde!" },
    { message: "Ciao, Mondo!" },
    { message: "Hallo, Welt!" },
    { message: "こんにちは、世界！" },
    { message: "안녕하세요, 세계!" },
    { message: "你好，世界！" },
    { message: "Olá, Mundo!" },
    { message: "Привет, мир!" },
  ];

  // Select a random greeting
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  return NextResponse.json(randomGreeting);
}
