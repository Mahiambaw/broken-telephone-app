import React, { useState } from "react";

type PromptInputProps = {
  onSubmitPrompt: (prompt: string, round: number) => void;
};

const PromptInput: React.FC<PromptInputProps> = ({ onSubmitPrompt }) => {
  const [input, setInput] = useState({ prompt: "", round: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.prompt.trim()) {
      onSubmitPrompt(input.prompt, input.round);
      setInput((prev) => ({ ...prev, prompt: "" }));
    }
  };

  return (
    <section className="my-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6"
      >
        <div className="flex-1">
          <label
            htmlFor="promptInput"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Put a text to create a picture:
          </label>
          <input
            type="text"
            id="promptInput"
            value={input.prompt}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, prompt: e.target.value }))
            }
            placeholder="Enter short description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="promptround"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Round number:
          </label>
          <input
            type="number"
            id="promptround"
            value={input.round}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, round: Number(e.target.value) }))
            }
            min="1"
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!input.prompt.trim()}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default PromptInput;
