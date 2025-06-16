import React, { useState } from "react";

type PromptInputProps = {
  onSubmitPrompt: (prompt: string, round: number) => void;
};

const PromptInput: React.FC<PromptInputProps> = ({ onSubmitPrompt }) => {
  const [input, setInput] = useState<{ prompt: string; round: number }>({
    prompt: "",
    round: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.prompt.trim()) {
      onSubmitPrompt(input.prompt, input.round);
      // Reset prompt after submission, keep round
      setInput((prev) => ({ ...prev, prompt: "" }));
    }
  };

  const handleChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, prompt: e.target.value }));
  };

  const handleChangeRound = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, round: Number(e.target.value) }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="promptInput">Put a text to create a picture:</label>
      <input
        type="text"
        id="promptInput"
        value={input.prompt}
        onChange={handleChangePrompt}
        placeholder="Enter your text here"
        required
      />

      <label htmlFor="promptround">Round number:</label>
      <input
        type="number"
        id="promptround"
        value={input.round}
        onChange={handleChangeRound}
        placeholder="Enter your round here"
        min="1"
        required
      />

      <button type="submit" disabled={!input.prompt.trim()}>
        Submit
      </button>
    </form>
  );
};

export default PromptInput;
