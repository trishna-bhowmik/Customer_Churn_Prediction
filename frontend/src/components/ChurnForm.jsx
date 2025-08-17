import { useState } from "react";

const defaultValues = {
  gender: "",
  SeniorCitizen: "",
  Partner: "",
  Dependents: "",
  tenure: "",
  PhoneService: "",
  MultipleLines: "",
  InternetService: "",
  OnlineSecurity: "",
  OnlineBackup: "",
  DeviceProtection: "",
  TechSupport: "",
  StreamingTV: "",
  StreamingMovies: "",
  Contract: "",
  PaperlessBilling: "",
  PaymentMethod: "",
  MonthlyCharges: "",
  TotalCharges: "",
};

export default function ChurnForm({ onResult }) {
  const [form, setForm] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const setField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "SeniorCitizen" || name === "tenure"
          ? value === "" ? "" : parseInt(value, 10)
          : name === "MonthlyCharges" || name === "TotalCharges"
          ? value === "" ? "" : parseFloat(value)
          : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      onResult(data);
    } catch (e) {
      setErr(e.message);
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-blue-800">
        Enter Customer Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
  <label className="text-gray-700 font-medium">Gender</label>
  <select
    name="gender"
    value={form.gender}
    onChange={setField}
    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="">-- Select --</option>
    <option>Female</option>
    <option>Male</option>
  </select>
</div>

        <div className="flex items-center gap-4">
  <label className="text-gray-700 font-medium">SeniorCitizen</label>
  <select
    name="SeniorCitizen"
    value={form.SeniorCitizen}
    onChange={setField}
    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    <option value="">-- Select --</option>
    <option value={0}>No</option>
    <option value={1}>Yes</option>
  </select>
</div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Partner</label>
          <select name="Partner" value={form.Partner} onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Dependents</label>
          <select
            name="Dependents"
            value={form.Dependents}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Tenure</label>
          <input
            type="number"
            name="tenure"
            value={form.tenure}
            onChange={setField}
            min="0"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">PhoneService</label>
          <select
            name="PhoneService"
            value={form.PhoneService}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">MultipleLines</label>
          <select
            name="MultipleLines"
            value={form.MultipleLines}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No phone service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">InternetService</label>
          <select
            name="InternetService"
            value={form.InternetService}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>DSL</option>
            <option>Fiber optic</option>
            <option>No</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">OnlineSecurity</label>
          <select
            name="OnlineSecurity"
            value={form.OnlineSecurity}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No internet service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">OnlineBackup</label>
          <select
            name="OnlineBackup"
            value={form.OnlineBackup}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No internet service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">DeviceProtection</label>
          <select
            name="DeviceProtection"
            value={form.DeviceProtection}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No internet service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">TechSupport</label>
          <select
            name="TechSupport"
            value={form.TechSupport}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No internet service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">StreamingTV</label>
          <select
            name="StreamingTV"
            value={form.StreamingTV}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No internet service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">StreamingMovies</label>
          <select
            name="StreamingMovies"
            value={form.StreamingMovies}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
            <option>No internet service</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Contract</label>
          <select
            name="Contract"
            value={form.Contract}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>Month-to-month</option>
            <option>One year</option>
            <option>Two year</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">PaperlessBilling</label>
          <select
            name="PaperlessBilling"
            value={form.PaperlessBilling}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">PaymentMethod</label>
          <select
            name="PaymentMethod"
            value={form.PaymentMethod}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option>Electronic check</option>
            <option>Mailed check</option>
            <option>Bank transfer (automatic)</option>
            <option>Credit card (automatic)</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">MonthlyCharges</label>
          <input
            type="number"
            name="MonthlyCharges"
            step="0.01"
            value={form.MonthlyCharges}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">TotalCharges</label>
          <input
            type="number"
            name="TotalCharges"
            step="0.01"
            value={form.TotalCharges}
            onChange={setField}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
      >
        {loading ? "Predicting..." : "Predict Churn"}
      </button>
    </form>
  );
}
