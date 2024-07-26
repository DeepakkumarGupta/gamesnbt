"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="flex justify-center mb-8">
        <Image
          src={logo}
          alt="Nexus Business Tech Logo"
          width={200}
          height={200}
          
        />
      </div>
      
      <h2 className="text-4xl font-bold mb-4 text-center">Games Just for fun</h2>
      <p className="mb-4 text-green-300">play some games till our site develops...</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/guessnumber">
          <div className=" hover:border-2 border-green-300 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white text-center">
              Guess My Number
            </h3>
            <p className="text-center">Lets see how many attempts you take!!</p>
          </div>
        </Link>
        <Link href="/quizz">
          <div className="hover:border-2 border-blue-200 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white text-center">
              Quizz
            </h3>
            <p className="text-center">Lets see how smart your brain is !!</p>
          </div>
        </Link>
        {/* Add more games here */}
      </div>

      <h3  className="mt-10 text-orange-300">All the games in here are made with the help of llama 3.1 meta AI model to test its capabilities. </h3>
    </main>
  );
}