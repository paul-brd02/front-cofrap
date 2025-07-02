import { useEffect, useState } from "react";

function Result() {
  const user = history.state?.usr?.user; // fallback si jamais tu en as besoin

  return (
    <div className="flex justify-center mt-24 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Authentification à deux facteurs réussie
        </h2>
        <p className="text-gray-700 text-lg">
          Bonjour <span className="font-medium">{user?.username}</span> 👋
        </p>
      </div>
    </div>
  );
}

export default Result;