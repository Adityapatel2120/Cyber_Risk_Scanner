import { useState } from "react";
import { scanUrl } from "../api";
import Result from "./Result";

export default function Scannerform() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handlescan() {
    if (!url.trim()) {
      setError("⚠️ Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await scanUrl(url);
      if (response.data) setResult(response.data);
      else setError("Unexpected response format from API.");
    } catch (err) {
      console.error(err);
      setError("Failed to scan URL. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-full bg-[#16161a] rounded-2xl p-6 shadow-[0_0_20px_rgba(100,100,255,0.1)] border border-gray-800">
      
      {/* Input */}
      <input
        className="border border-gray-700 bg-[#121217] focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 placeholder-gray-500 p-3 rounded-lg w-full text-center text-gray-100 transition-all duration-300 outline-none"
        placeholder="Enter suspicious link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handlescan();
          }
        }}
      />

      {/* Error */}
      {error && <p className="text-rose-500 text-sm mt-2">{error}</p>}

      {/* Button */}
      <button
        className={`mt-4 py-2.5 px-8 rounded-xl font-semibold text-base text-gray-100 transition-all duration-300 shadow-md 
          ${loading || !url.trim()
            ? "bg-gray-700 cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-400 hover:to-purple-400"
          }`}
        onClick={handlescan}
        disabled={loading || !url.trim()}
      >
        {loading ? "🔍 Scanning..." : "Scan Now"}
      </button>

      {/* Result Section */}
      {result && (
        <div className="mt-6 w-full bg-[#0f0f11] border border-gray-800 rounded-xl shadow-lg p-4 overflow-y-auto max-h-[400px] transition-all duration-300">
          <Result data={result} />
        </div>
      )}
    </div>
  );
}
