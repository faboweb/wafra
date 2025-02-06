import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { baseUrl } from "./sitemap";
import Image from "next/image";
import Link from "next/link";
import CompoundInterestCalculator from "./components/chart";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Wafra.money | Banking that pays",
    template: "%s | Wafra.money",
  },
  description: "Banking that pays",
  openGraph: {
    title: "Wafra.money",
    description: "Banking that pays",
    url: baseUrl,
    siteName: "Wafra.money",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body
        className="antialiased"
        style={{ background: "linear-gradient(to bottom, #DFFFDF, #FFFFFF)" }}
      >
        <script async src="https://tally.so/widgets/embed.js"></script>
        <main className="flex-grow flex flex-col items-center justify-center px-4 text-center relative max-w-xl mx-auto">
          <header className="w-full p-4 flex justify-between items-center">
            <div>
              <Image
                src="/logo.svg"
                alt="Wafra.money"
                width={100}
                height={100}
              />
            </div>
            {/* <button
              className="bg-[#007c01] text-white px-4 py-2 rounded-full text-sm font-semibold opacity-50"
              disabled
            >
              Get the app
            </button> */}
            <button
              className="bg-[#007c01] text-white px-4 py-2 rounded-full text-sm font-semibold cursor-pointer"
              data-tally-open="nWKkRN"
              data-tally-hide-title="1"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
            >
              Join Waitlist
            </button>
          </header>

          {/* <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 flex items-center">
            Watch the video <ArrowRight className="ml-2 h-4 w-4" />
          </button> */}

          <h1 className="text-6xl font-bold mb-4 mt-8">Be Your Bank</h1>

          <div className="relative w-full max-w-md mt-[-100px]">
            <Image
              src="/device.svg"
              alt="Bank app interface"
              width={730}
              height={1080}
            />

            <div className="flex items-center justify-center space-x-2 absolute bg-[#EFF1EF] rounded-full top-[110px] right-0 p-[4px] pr-[10px]">
              <Image
                src="/apple.svg?height=24&width=24"
                alt="App Store icon"
                width={32}
                height={32}
              />
              <div className="flex flex-col items-start">
                <span
                  style={{
                    fontSize: 10,
                    color: "#6A6F6A",
                  }}
                >
                  Soon on
                </span>
                <span
                  style={{
                    fontSize: 14,
                  }}
                >
                  App Store
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-4">
            Have your money
            <br />
            work for you.
          </h2>

          <div className="my-16">
            <CompoundInterestCalculator />
          </div>

          <button
            className="bg-[#007c01] text-white px-8 py-4 rounded-full text-sm font-semibold cursor-pointer"
            data-tally-open="nWKkRN"
            data-tally-hide-title="1"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
          >
            Join Waitlist
          </button>
        </main>

        <footer className="w-full p-4 flex justify-between items-center text-gray-600 border-t border-gray-200 text-xs mt-8">
          <div className="flex space-x-4">
            {/* <Link href="#">Find Us on X</Link> */}
            <Link href="mailto:hiring@wafra.money">We are hiring!</Link>
            {/* <Link href="#">Terms of use</Link> */}
          </div>
          <div>Copyright © 2025 Wafra.money. All rights reserved</div>
        </footer>
      </body>
    </html>
  );
}
