import { useState } from "react";
import { scanUrl } from "../api";
import Result from "./Result";

export default function Scannerform() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleScan() {
    // 1️⃣ Basic validation
    if (!url.trim()) {
      setError("⚠️ Please enter a valid URL.");
      return;
    }

    // 2️⃣ Ensure URL has proper format
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 3️⃣ Call Netlify function that proxies VirusTotal
      const response = await scanUrl(formattedUrl);
      // 4️⃣ Check if the VirusTotal data structure exists
      if (response.data?.data?.attributes) {
        setResult(response.data.data);
      } else {
        setError("⚠️ VirusTotal did not return valid scan results.");
      }
    } catch (err) {
      console.error("❌ Error scanning URL:", err.message);
      setError("❌ Failed to scan URL. Check the format or try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-full bg-[#16161a] rounded-2xl p-6 shadow-[0_0_20px_rgba(100,100,255,0.1)] border border-gray-800">

      {/* Input field */}
      <input
        className="border border-gray-700 bg-[#121217] focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 placeholder-gray-500 p-3 rounded-lg w-full text-center text-gray-100 transition-all duration-300 outline-none"
        placeholder="Enter suspicious link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleScan();
          }
        }}
      />

      {/* Error Message */}
      {error && <p className="text-rose-500 text-sm mt-2">{error}</p>}

      {/* Scan Button */}
      <button
        className={`mt-4 py-2.5 px-8 rounded-xl font-semibold text-base text-gray-100 transition-all duration-300 shadow-md 
          ${loading || !url.trim()
            ? "bg-gray-700 cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-400 hover:to-purple-400"
          }`}
        onClick={handleScan}
        disabled={loading || !url.trim()}
      >
        {loading ? "🔍 Scanning..." : "Scan Now"}
      </button>

      {/* Results Section */}
      {result && (
        <div className="mt-6 w-full bg-[#0f0f11] border border-gray-800 rounded-xl shadow-lg p-4 overflow-y-auto max-h-[400px] transition-all duration-300">
          <Result data={result} />
        </div>
      )}
    </div>
  );
}
