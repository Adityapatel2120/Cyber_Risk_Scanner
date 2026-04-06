// netlify/functions/virustotal.js
// Updated with MongoDB integration to save every scan result

import { MongoClient } from "mongodb";

const API_KEY = process.env.VIRUSTOTAL_API_KEY;
const API_URL = "https://www.virustotal.com/api/v3";
const MONGODB_URI = process.env.MONGODB_URI;

// Reuse the MongoDB client across warm function invocations (performance optimization)
let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function handler(event) {
  console.log("🧠 Function triggered");
  console.log("API key present:", !!API_KEY);
  console.log("MongoDB URI present:", !!MONGODB_URI);

  try {
    const body = JSON.parse(event.body || "{}");
    const userUrl = body.url;

    if (!userUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing URL" }) };
    }

    console.log("🔍 Scanning URL:", userUrl);

    // Step 1 — Submit URL to VirusTotal
    const formData = new FormData();
    formData.append("url", userUrl);

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

    // Step 2 — Poll for analysis completion
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

    // Step 3 — Get final URL report from VirusTotal
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

    // Step 4 — Save scan result to MongoDB
    try {
      const client = await getMongoClient();
      const db = client.db("cyber_risk_scanner");
      const collection = db.collection("scans");

      const attrs = finalData?.data?.attributes || {};

      const scanRecord = {
        url: userUrl,
        scannedAt: new Date(),
        reputation: attrs.reputation ?? null,
        stats: attrs.last_analysis_stats ?? null,
        categories: attrs.categories ?? null,
        finalUrl: attrs.last_final_url ?? userUrl,
        votes: attrs.total_votes ?? null,
      };

      await collection.insertOne(scanRecord);
      console.log("💾 Scan saved to MongoDB:", userUrl);
    } catch (dbError) {
      // Log the DB error but don't fail the scan response — user still gets their result
      console.error("⚠️ MongoDB save failed (scan still returned):", dbError.message);
    }

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