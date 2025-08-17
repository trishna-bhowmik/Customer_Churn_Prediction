export default function ResultCard({ result }) {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-extrabold text-blue-800 mb-4 text-center">
        📊 Prediction Result
      </h2>

      {result ? (
        <div className="flex flex-col items-center gap-3">
          <div
            className={`px-6 py-3 rounded-xl text-lg font-bold shadow-md ${
              result.churn
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {result.churn ? "⚠️ Customer Likely to Churn" : "✅ Customer Will Stay"}
          </div>

  
          <p className="text-gray-700 text-lg">
            Leaving Probability:{" "}
            <span className="font-semibold text-blue-600">
              {(result.churn_probability * 100).toFixed(2)}%
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-center italic">
          Fill the form and click <span className="font-semibold">Predict</span> to see results.
        </p>
      )}
    </div>
  );
}
