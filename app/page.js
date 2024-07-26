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
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white text-center">
              Guess My Number
            </h3>
          </div>
        </Link>
        {/* <Link href="/guessnumber">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white text-center">
              Guess My Number
            </h3>
          </div>
        </Link> */}
        {/* Add more games here */}
      </div>
    </main>
  );
}