import { useState } from "react"
import api from "../api/api"
import { HelpCircle } from "lucide-react"

export function GenerateQuizz() {
  const [notes, setNotes] = useState('')
  const [quizz, setQuizz] = useState('')
  const [loader, setLoader] = useState(false)

  const GenerateQuiz = async () => {
    setLoader(true)
    setQuizz("") 
    try {
      const res = await api.post("/quiz", { notes })
      setQuizz(res.data.result) 
    } catch {
      setQuizz("❌ Error while asking Gemini.")
    } finally {
      setLoader(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-1">
        <HelpCircle />
        <h1 className="text-2xl font-semibold text-gray-800">Generate Quiz</h1>
      </div>

      <div className="w-full border rounded-2xl mt-3">
        <input
          type="text"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          placeholder="Paste your notes here to generate 5 quiz questions (mix of MCQ and short answers)"
          className="w-full rounded-2xl border border-gray-300 p-3 text-[15px]"
        />
      </div>

      <button
        onClick={GenerateQuiz}
        disabled={loader || notes.trim() === ""}
        className={`mt-6 p-2 rounded-2xl w-full cursor-pointer ${
          loader || notes.trim() === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white"
        }`}
      >
        {loader ? "Generating..." : "Ask Question"}
      </button>

      {loader && (
        <div className="mt-4 text-gray-600 text-sm">Generating quiz questions...</div>
      )}

      {quizz && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Answer:</h3>
          <div className="whitespace-pre-wrap text-gray-500">{quizz}</div>
        </div>
      )}
    </div>
  )
}
