"use client";
import AuthPage from "./components/Login";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-[-2] bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      {/* Main Container */}
      <div className="container mx-auto max-w-4xl px-6 py-10 text-center bg-white shadow-md rounded-lg">
        {/* Logo & Title */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
            &lt;FinanceVisualizer/&gt;
          </h1>
          <p className="text-lg text-gray-600 mt-2">Your Own Finance-Visualizer</p>
        </div>

        {/* Authentication Page */}
        <div className="w-full max-w-md mx-auto">
          <AuthPage />
        </div>
      </div>
    </div>
  );
}
