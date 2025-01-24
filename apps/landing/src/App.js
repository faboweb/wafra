import "./App.css";
import { ArrowRight } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-[#f3f9f3] flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <div></div>
        <button className="bg-[#007c01] text-white px-4 py-2 rounded-full text-sm font-semibold">
          Get the app
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 flex items-center">
          Watch the video <ArrowRight className="ml-2 h-4 w-4" />
        </button>

        <h1 className="text-6xl font-bold mb-4">Be Your Bank</h1>

        <div className="relative w-full max-w-md aspect-[9/19] mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wafra_Landing-ijOSgGabb6yJfZYKpYmHQFVyHhernQ.png"
            alt="Bank app interface"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <h2 className="text-3xl font-semibold mb-4">
          Have your money
          <br />
          work for you.
        </h2>

        <div className="flex items-center justify-center space-x-2 mb-8">
          <img
            src="/placeholder.svg?height=24&width=24"
            alt="App Store icon"
            width={24}
            height={24}
          />
          <span className="text-sm">Available on App Store</span>
        </div>
      </main>

      <footer className="w-full p-4 flex justify-between items-center text-sm text-gray-600">
        <div className="flex space-x-4">
          <a href="#">Find Us on X</a>
          <a href="#">We are hiring!</a>
          <a href="#">Terms of use</a>
        </div>
        <div>Copyright © 2025 Fintech. All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
