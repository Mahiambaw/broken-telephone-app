// pages/Home.tsx
import React, { useState, useEffect } from "react";
import Header from "../Header";
import HowItWorks from "../HowItworks";
import PromptInput from "../Prompt/PromptInput";
import ResultItems from "../ResultItems/ResultItems";
import type { Result } from "../../interfaces/Result";
import { sendPrompt } from "../../api/api";

const Home: React.FC = () => {
  const [result, setResult] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<{ prompt: string; round: number } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!input?.prompt) return;
      setLoading(true);
      setError(null);
      try {
        const data = await sendPrompt(input.prompt, input.round);
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data.result);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
        setInput(null);
      }
    };

    fetchData();
  }, [input]);

  const handleSubmit = (prompt: string, round: number) => {
    setInput({ prompt, round });
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <Header />
      <HowItWorks />

      <section className="mb-12">
        <PromptInput onSubmitPrompt={handleSubmit} />
      </section>

      {loading && (
        <p className="text-center text-pink-700 font-semibold">Loading...</p>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center max-w-xl mx-auto">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <ResultItems result={result} />
    </main>
  );
};

export default Home;
