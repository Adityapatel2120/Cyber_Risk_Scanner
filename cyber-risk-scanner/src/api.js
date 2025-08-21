import axios from "axios";

const API_KEY = import.meta.env.VITE_VT_API_KEY;
console.log("API KEY:", API_KEY);

const client = axios.create({
  baseURL: "https://www.virustotal.com/api/v3",
  headers: { "x-apikey": API_KEY},
});

// Convert normal base64 → unpadded base64url
function urlId(rawUrl) {
  return btoa(rawUrl).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function scanUrl(userUrl) {

  try {
    // sending URL
    const form = new FormData();
    form.append("url",userUrl);
    const submit = await client.post("/urls", form);  
    const analysisid = submit.data?.data?.id; // to get id of analysis

    // Analysing response
    let analysis = null;
    for(let i=0;i<10;i++){
      const res = await client.get(`/analyses/${analysisid}`);
      analysis = res.data?.data;
      if(analysis?.attributes?.status === "completed") break;
      await new Promise((r) => setTimeout(r,1500));
    }

    // Displaying data
    const id = urlId(userUrl);
    const final = await client.get(`/urls/${id}`);
    console.log(final.data);
    return final.data;

  } catch (err) {
    throw new Error("Failed to scan URL. Check the format or try again.");
  }
}
