
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import api from "../api/api";

export default function AskPage(){
    const [question,setQuestion] = useState('')
    const [answer,setAnswer] = useState('')
    const [loader,setLoader] = useState(false)

    const askAnything = async() => {
        setLoader(true)
        try{
            const res = await api.post("/ask",{question})
            setAnswer(res.data.response)
        }
        catch{
            setAnswer("Error While Asking Gemini")
        }
        finally{
            setLoader(false)
        }
    }

    return (
        <>
        <div className=" p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-1">
            <MessageCircle className="text-gray-600 w-6 h-6" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-gray-800 ">Ask Anything</h2>
            </div>
            <div className="w-full border rounded-2xl mt-3">
                <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text" placeholder="Ask Any Question" 
                className="w-full rounded-2xl border border-gray-300 p-3 text-[15px]" />
            </div>
            <button
            onClick={askAnything}
            disabled={loader || question.trim() === ""}
            className="mt-6 bg-black text-white p-2 rounded-2xl w-full cursor-pointer disabled:opacity-50">
            Ask Question
            </button>
              {answer && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Answer:</h3>
                    <div className="whitespace-pre-wrap text-gray-500">{answer}</div>
                  </div>
                )}
        </div>
         
        </>
    )
}