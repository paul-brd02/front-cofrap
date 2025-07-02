import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../services/apiService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password || !twoFACode) {
        setError("Tous les champs sont obligatoires.");
        return;
      }

      const res = await apiRequest("/api/login", "POST", {
        username,
        password,
        token: twoFACode,
      });

      // Connexion OK => redirection
      navigate("/dashboard", { state: { user: res } });
    } catch (err) {
      setError("Échec de l'authentification.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Connexion</h2>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          type="text"
          placeholder="Code 2FA"
          value={twoFACode}
          onChange={(e) => setTwoFACode(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        {error && <p className="text-red-600 text-sm mb-2 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-primary text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Se connecter
        </button>
        <p onClick={() => { navigate("/create-account") }} className="text-blue-600 mt-4 text-center text-sm hover:underline hover:cursor-pointer">
          Créer un compte
        </p>
      </div>
    </div>
  );
}

export default Login;
