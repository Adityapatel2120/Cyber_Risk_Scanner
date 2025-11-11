// src/api.js

export async function scanUrl(userUrl) {
  try {
    // Call the Netlify function endpoint instead of VirusTotal API directly
    const response = await fetch("/.netlify/functions/virustotal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: userUrl }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (err) {
    console.error("❌ Error in scanUrl:", err.message);
    throw new Error("Scan failed: " + err.message);
  }
}
