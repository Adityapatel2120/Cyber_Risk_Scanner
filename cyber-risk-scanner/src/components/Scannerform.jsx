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
        <div className="flex flex-col items-center w-full">
            <input className="border p-1.5 mt-2  rounded w-full h-auto text-center"
            placeholder="Enter suspicious link here..."
            value={url}
            onChange={(e)=> setUrl(e.target.value)
            }
            onKeyDown={(e)=> {
                if(e.key === "Enter" && !e.shiftKey){
                    e.preventDefault();
                    handlescan();
                }}
            }>
            </input>

            <p>{error && <p className="text-red-600">{error}</p>}</p>
            
            <button className="rounded-[10px] transition-colors duration-200 border border-solid border-2  border-white-200 hover:border-green-600 bg-1a1a1a  text-base font-semibold mt-2 py-2 px-4 cursor-pointer "
            onClick={handlescan}
            disabled={loading || !url.trim()}>

            {loading ? "Scanning..." : "Scan Now"}</button>

            {
                result && (
                    <div className="relative mt-2 bottom-0 left-0 w-full p-5  border-t shadow-lg max-h-1/2 overflow-y-auto">
                        <Result data={result}/>
                    </div>
                )
            }
        </div>
    );
}