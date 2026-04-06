import { useState } from "react";
import axios from "axios";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      setStatus("✅ Feedback submitted!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("❌ Failed to submit feedback");
    }
  };

  return (
    <div className="mt-10 w-full max-w-xl bg-[#16161a] p-6 rounded-xl border border-gray-800">
      
      <h2 className="text-xl font-semibold text-center mb-4 text-indigo-400">
        Feedback
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded bg-[#121217] border border-gray-700"
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded bg-[#121217] border border-gray-700"
        />

        <textarea
          name="message"
          placeholder="Your Feedback"
          value={form.message}
          onChange={handleChange}
          className="p-2 rounded bg-[#121217] border border-gray-700"
        />

        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 py-2 rounded">
          Submit Feedback
        </button>

      </form>

      {status && <p className="text-center mt-3 text-sm">{status}</p>}
    </div>
  );
}