// components/ResultItems.tsx
import React from "react";
import type { Result } from "../../interfaces/Result";

interface ResultItemsProps {
  result: Result[];
}

const ResultItems: React.FC<ResultItemsProps> = ({ result }) => {
  const url = "http://127.0.0.1:5000/";

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">
        🌱 See the Evolution
      </h2>

      {result.length > 0 ? (
        <ul className="space-y-6">
          {result.map((item, index) => (
            <li
              key={`${item.round}-${index}`}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <p className="mb-2 text-sm font-medium text-neutral-700">
                <span className="font-bold">Round {item.round}:</span>{" "}
                {item.text}
              </p>
              <img
                src={url + item.image_url}
                alt={`Result for round ${item.round}`}
                className="rounded w-full max-w-md mx-auto"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-neutral-500">No results to display.</p>
      )}
    </section>
  );
};

export default ResultItems;
