import { FileText, HelpCircle, MessageCircle } from "lucide-react";
import AskPage from "./AskPage";
import { useState } from "react";
import { GenerateQuizz } from "./GenerateQuiz";
import Summarize from "./summarize";

type TabId = "ask" | "summarize" | "quiz";

const TabId = {
  ASK: "ask" as TabId,
  SUMMARIZE: "summarize" as TabId,
  QUIZ: "quiz" as TabId,
};

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.ASK);

  const tabs: TabConfig[] = [
    { id: TabId.ASK, label: "Ask Anything", icon: MessageCircle },
    { id: TabId.SUMMARIZE, label: "Summarize Notes", icon: FileText },
    { id: TabId.QUIZ, label: "Generate Quiz", icon: HelpCircle },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case TabId.ASK:
        return <AskPage />;
      case TabId.SUMMARIZE:
        return <Summarize />;
      case TabId.QUIZ:
        return <GenerateQuizz />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-b from-red-400 to-black/60 bg-clip-text text-transparent">
            AI Study Buddy
          </h1>
          <p className="mt-4 text-2xl text-gray-600">
            Ask questions, summarize notes, and generate quizzes with AI
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl cursor-pointer mr-4 ${
                  activeTab === tab.id
                    ? "bg-yellow-300 shadow-lg text-black"
                    : "text-gray-500 hover:bg-gray-200 hover:text-indigo-300"
                }`}
              >
                <tab.icon className="inline-block mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl shadow-lg bg-white mt-5 max-w-3xl mx-auto">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}
