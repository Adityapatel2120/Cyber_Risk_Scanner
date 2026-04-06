import Scannerform from './components/Scannerform';
import FeedbackForm from "./components/FeedbackForm";
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0d0d0f] via-[#121217] to-[#181820] text-gray-200 px-4 py-8">
      
      {/* Header */}
      <header className="w-full text-center mb-6">
        <h1 className="text-4xl font-
        bold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
          Scam Scanner
        </h1>
        <p className="mt-1 text-gray-400 text-sm italic">
          Protect yourself from phishing, malware, and scam links — instantly.
        </p>
      </header>

      {/* Description */}
      <p className="w-full mt-2 max-w-2xl text-center text-gray-400 leading-relaxed">
        Not sure if a link is safe? Paste it below and let
        <span className="text-indigo-400 font-medium"> Scam Scanner </span>
        analyze it against trusted sources.
      </p>

      {/* Informative Section  */}
      <div className="mt-4 max-w-xl text-sm text-gray-400 space-y-1 text-center">
        <p>🔍 Our scanner checks your link using multiple threat databases and reputation systems.</p>
        <p>🛡️ Get instant results showing reputation score, risk level, and threat category.</p>
      </div>

      {/* Scanner Form */}
      <div className="mt-6 w-full max-w-xl">
        <Scannerform />
      </div>
      
      <FeedbackForm />

      {/* Safety Tip */}
      <p className="mt-6 text-xs text-gray-500 text-center italic">
        💡 Tip: Always verify URLs carefully — even a small typo can lead to a fake login page.
      </p>

      {/* Footer */}
      <footer className="mt-10 text-gray-400 text-xs text-center">
        Built for safe browsing with ❤️ by <span className="text-indigo-400 font-medium">Aditya Patel</span>.
      </footer>
    </div>
  );
}

export default App;
