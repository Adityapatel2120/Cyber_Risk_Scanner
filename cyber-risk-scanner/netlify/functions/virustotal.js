// ✅ netlify/functions/virustotal.js
export async function handler(event) {
  const API_KEY = process.env.VIRUSTOTAL_API_KEY;
  const API_URL = "https://www.virustotal.com/api/v3";

  console.log("🧠 Function triggered");
  console.log("API key present:", !!API_KEY);

  try {
    const body = JSON.parse(event.body || "{}");
    const userUrl = body.url;

    if (!userUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing URL" }) };
    }

    console.log("🔍 Scanning URL:", userUrl);

    // ✅ Built-in FormData (no import needed)
    const formData = new FormData();
    formData.append("url", userUrl);

    // Step 1 — Submit URL
    const submitResponse = await fetch(`${API_URL}/urls`, {
      method: "POST",
      headers: { "x-apikey": API_KEY },
      body: formData,
    });

    console.log("➡️ VirusTotal submit status:", submitResponse.status);

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      console.error("❌ VirusTotal submission failed:", errorText);
      return {
        statusCode: submitResponse.status,
        body: JSON.stringify({ error: "VirusTotal submission failed", details: errorText }),
      };
    }

    const submitData = await submitResponse.json();
    const analysisId = submitData?.data?.id;
    if (!analysisId) {
      throw new Error("No analysis ID returned from VirusTotal");
    }

    console.log("🧾 Analysis ID:", analysisId);

    // Step 2 — Wait for analysis
    let analysis = null;
    for (let i = 0; i < 8; i++) {
      const analysisResponse = await fetch(`${API_URL}/analyses/${analysisId}`, {
        headers: { "x-apikey": API_KEY },
      });
      const analysisData = await analysisResponse.json();

      if (analysisData?.data?.attributes?.status === "completed") {
        analysis = analysisData.data;
        break;
      }

      console.log(`⏳ Waiting... (${i + 1}/8)`);
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (!analysis) {
      console.warn("⚠️ Analysis incomplete — returning partial data.");
    }

    // Step 3 — Get final report
    const encodedId = Buffer.from(userUrl)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const finalResponse = await fetch(`${API_URL}/urls/${encodedId}`, {
      headers: { "x-apikey": API_KEY },
    });

    const finalData = await finalResponse.json();

    console.log("✅ Final VirusTotal data ready");
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(finalData),
    };
  } catch (error) {
    console.error("❌ Function Error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
