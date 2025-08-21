import React from "react";
import App from "../App";

// Result.jsx
export default function Result({ data }) {

  // Extract fields from VirusTotal response safely
  const stats = data.attributes?.last_analysis_stats;
  const reputation = data.attributes?.reputation;
  const categories = data.attributes?.categories;
  const finalUrl = data.attributes?.last_final_url;
  const votes = data.attributes?.total_votes;

  return (
    <div>
      <h2>🔍 Scan Results</h2>

      {finalUrl && (
        <p>
          <strong>URL:</strong>{" "}
          <a href={finalUrl} target="_blank" rel="noreferrer">
            {finalUrl}
          </a>
        </p>
      )}

      {stats && (
        <div>
          <strong>Analysis Stats:</strong>
          <ul>
            <li>✅ Harmless: {stats.harmless}</li>
            <li>⚠️ Suspicious: {stats.suspicious}</li>
            <li>❌ Malicious: {stats.malicious}</li>
            <li>⏳ Undetected: {stats.undetected}</li>
          </ul>
        </div>
      )}

      {typeof reputation === "number" && (
        <p><strong>Reputation Score:</strong> {reputation}</p>
      )}

      {votes && (
        <p>
          <strong>Total Votes:</strong>{" "}
          Harmless ({votes.harmless}), Malicious ({votes.malicious})
        </p>
      )}

      {categories && Object.keys(categories).length > 0 && (
        <div>
          <strong>Categories:</strong>
          <ul>
            {Object.entries(categories).map(([engine, category]) => (
              <li key={engine}>
                {engine}: {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
  );
}
