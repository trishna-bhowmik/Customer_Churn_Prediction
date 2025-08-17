import { useState } from "react";
import ChurnForm from "./components/ChurnForm.jsx";
import ResultCard from "./components/ResultCard.jsx";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-8 text-center">
          Customer Churn Prediction
        </h1>

        {/* Grid with 2/3 and 1/3 columns */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ChurnForm onResult={setResult} />
          </div>
          <div className="md:col-span-1">
            <ResultCard result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}


