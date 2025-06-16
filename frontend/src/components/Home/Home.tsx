import React, { useState, useEffect } from "react";
import { sendPrompt } from "../api/api";
import type { Result } from "../../interfaces/Result";
import PromptInput from "../Prompt/PromptInput";
import ResultItems from "../ResultItems/ResultItems";
import {
  PencilSquareIcon,
  HashtagIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

const Home: React.FC = () => {
  const [result, setResult] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<{ prompt: string; round: number } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!input?.prompt) return; // Don't fetch if no prompt
      setLoading(true);
      setError(null);
      try {
        const data: { error?: string; result: Result[] } = await sendPrompt(
          input.prompt,
          input.round
        );
        console.log("Data received:", data);
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
        setInput(null); // Reset input to prevent re-fetching
      }
    };

    fetchData();
  }, [input]);

  const handleSubmit = (value: string, turn: number) => {
    setInput({ prompt: value, round: turn });
  };
  return (
    <>
      <main className="">
        <section className="bg-red-200 pt-[50px] text-center mb-[50px]">
          <h1 className="text-[32px] pb-[42px] leading-[1.7] text-[#333] tracking-[1px] font-bold">
            🧠 Welcome To Broken Telephone
          </h1>
          <div className="max-w-[350px] mx-auto text:left">
            <p className="text-[20px] tracking-[1.5px]">
              Describe an idea. Let AI turn it into a picture. Then the picture
              becomes text again. How far will it drift from the original?!
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-[28px] text-center leading-[1.6] tracking-[1px] text-[#333] mb-[20px] font-bold">
            🎮 How to it works
          </h2>
          <div className="px-[15px]">
            <div className="max-w-[500px]">
              <img
                src="https://plus.unsplash.com/premium_photo-1725907643701-9ba38affe7bb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-[21px] pl-6 leading-[1.6] tracking-[1px] text-[#333] mb-[20px] font-bold pt-[50px]">
                How to play
              </h3>
              <ol className="list-decimal pl-6 space-y-4  text-[18px] leading-[1]">
                <li>
                  <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PencilSquareIcon className="h-5 w-5 text-white" />
                    </div>
                    <p>
                      In the <strong>"Put a text to create a picture"</strong>{" "}
                      box, enter a short description.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <HashtagIcon className="h-5 w-5 text-white" />
                    </div>
                    <p>
                      In the <strong>"Put a number of rounds"</strong> box,
                      enter how many rounds the game should play.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PlayIcon className="h-5 w-5 text-white" />
                    </div>
                    <p>
                      Click <strong>Submit</strong> to start.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <ul className="mt-[50px]">
              <h3 className="text-[21px] leading-[1.6] tracking-[1px] text-[#333] mb-[20px] font-bold">
                The app will:
              </h3>

              <li>Take your description and generate an image</li>
              <li>Then describe the image using AI</li>
              <li>Repeat this process for the number of rounds you chose</li>
              <li>
                Scroll down to see how far the final output drifted from your
                original idea!
              </li>
            </ul>
          </div>
        </section>

        {loading && <p>Loading...</p>}
        <PromptInput onSubmitPrompt={handleSubmit} />
        <ResultItems result={result} />
      </main>
    </>
  );
};

export default Home;
