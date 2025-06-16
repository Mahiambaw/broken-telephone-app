import React from "react";
import type { Result } from "../../interfaces/Result";

interface ResultItemsProps {
  result: Result[];
}
const ResultItems: React.FC<ResultItemsProps> = ({ result }) => {
  console.log("thi is the result", result);
  const url = "http://127.0.0.1:5000/";
  const render = () => {
    return result.length > 0 ? (
      <ul>
        {result.map((item, index) => (
          <li key={item.round}>
            <p>
              Round {item.round}: {item.text}
            </p>
            <img
              src={url + item.image_url}
              alt={`Result for round ${item.round}`}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p>No results to display.</p>
    );
  };
  return (
    <section>
      <h2>See the Evolution</h2>
      {render()}
    </section>
  );
};
export default ResultItems;
// This
