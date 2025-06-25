import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-white rounded-xl shadow-sm mb-12">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-neutral-800 mb-8">
        🎮 How it works
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        <img
          src="https://plus.unsplash.com/premium_photo-1725907643701-9ba38affe7bb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AI transformation process"
          className="w-full max-w-md rounded-lg shadow-md"
        />

        <div className="flex flex-col gap-6 max-w-xl">
          <div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              How to play
            </h3>
            <ul className="list-disc pl-6 text-base text-neutral-600 space-y-2">
              <li>Put a short description in the box</li>
              <li>Enter how many rounds to play</li>
              <li>
                Click <strong>Submit</strong> to begin
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              The app will:
            </h3>
            <ul className="list-disc pl-6 text-base text-neutral-600 space-y-2">
              <li>Generate an image based on your text</li>
              <li>Describe that image with AI</li>
              <li>Repeat this for the number of rounds</li>
              <li>Show how your idea changes over time</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
