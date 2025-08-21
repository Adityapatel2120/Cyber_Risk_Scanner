import {useState} from "react";
import { scanUrl } from "../api";
import Result from "./Result";

export default function Scannerform(){
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    
    // function to handle the scanning of url
    async function handlescan() {
        setLoading(true);
        setError(null);
        try {
            const response = await scanUrl(url);

            if (response.data) {
                setResult(response.data);
            } else {
                setError("Unexpected response format from API.");
            }
        } catch (err) {
            console.log(err);
            alert("Please enter valid URL and try again.");

            setError("Failed to scan URL. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return(
        <div>
            <textarea
            placeholder="Enter suspicious link"
            value={url}
            onChange={(e)=> setUrl(e.target.value)}
            onKeyDown={(e)=> {
                if(e.key === "Enter" && !e.shiftKey){
                    e.preventDefault();
                    handlescan();
            }}
            }>
            </textarea><br></br>

            <button onClick={handlescan}
            disabled={loading || !url.trim()}>

            {loading ? "Scanning..." : "Scan Now"}</button>

            {
                result && (
                    <div>
                        <Result data={result}/>
                    </div>
                )
            }
        </div>
    );
}