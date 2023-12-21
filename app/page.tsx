"use client";
import DragAndDrop from "@/components/draganddrop";
import GCLogo from "@/components/gclogo";
import Script from "next/script";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 max-h-screen">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-9MHEN6WJ1P" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-9MHEN6WJ1P');
        `}
      </Script>
      <h1 className="animate-text pb-3 font-bold text-center text-4xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 tracking-wider">
        G<span className="text-2xl sm:text-5xl">ET</span>G
        <span className="text-2xl sm:text-5xl">ETTY</span>
      </h1>

      <div
        onClick={() =>
          window.open(
            "https://chrome.google.com/webstore/detail/getgetty-extension/kkioljeeheopjbpoidhbmmbmehpgigon",
            "_blank"
          )
        }
        className="absolute flex items-center w-fit pr-2 sm:pr-0 sm:w-40 h-12 rounded-lg pl-2 top-5 left-5 cursor-pointer hover:scale-105 border border-gray-300 border-opacity-50 hover:border-opacity-100"
      >
        <div className="flex flex-row items-center justify-center">
          <GCLogo className="w-[35px] h-full" />
          <div className="hidden sm:flex flex-col items-start justify-center h-full pl-2 leading-3">
            <p className="text-white text-[0.5rem]">Available in the</p>

            <p className="text-white text-[0.7rem]">Chrome Web Store</p>
          </div>
        </div>
      </div>
      <DragAndDrop />
      <h1
        onClick={() => window.open("https://priyansu.in", "_blank")}
        className="mt-2 text-center cursor-pointer hover:text-gray-200 border border-gray-300 border-opacity-50 hover:border-opacity-100 p-2 rounded-lg"
      >
        Priyansu Choudhury
      </h1>
    </main>
  );
}
