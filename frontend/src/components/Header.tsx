// components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-pink-100 py-10 text-center rounded-xl shadow-sm mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
        🧠 Welcome To Broken Telephone
      </h1>
      <p className="text-lg sm:text-xl text-neutral-700 mt-4 max-w-2xl mx-auto leading-relaxed">
        Describe an idea. Let AI turn it into a picture.
        <br />
        Then the picture becomes text again. How far will it drift from the
        original?!
      </p>
    </header>
  );
};

export default Header;
