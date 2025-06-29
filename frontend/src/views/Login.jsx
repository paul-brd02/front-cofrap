import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../services/apiService";

function Login() {
  const [createAccount, setCreateAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const checkValues = () => {
    let usernameIsValid = username ? true : false;
    let passwordIsValid = password ? true : false;
    setUsernameError(!usernameIsValid);
    setPasswordError(!passwordIsValid);

    if (usernameIsValid && (createAccount ? true : passwordIsValid)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = async () => {
    try {
      if (checkValues()) {
        if (createAccount) {
          const qrCode = await apiRequest("URL", "POST", { username });
          setQrCodeData(qrCode);
          setShowModal(true);
        } else {
          await apiRequest("URL", "POST", {
            username: username,
            password: password
          });
        }
      };
    } catch (err) {
      alert("Erreur de la requête: ", err.message);
    };
  };

  const closeModal = () => {
    setShowModal(false);
    setCreateAccount(false);
    setUsername("");
    setPassword("");
    setUsernameError(false);
    setPasswordError(false);
  };

  return (
    <>
      <div className="flex items-center justify-center h-full mt-16">
        <div className="bg-primary p-8 rounded-2xl shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">
            {createAccount ? "Créer un compte" : "Connexion"}
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${usernameError ? "inputError" : ""}`}
            />

            {!createAccount && (<input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${passwordError ? "inputError" : ""}`}
            />)}

            <button
              onClick={handleSubmit}
              className={`w-full py-2 rounded-lg transition duration-200 ${createAccount
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {createAccount ? "Créer mon compte" : "Se connecter"}
            </button>

            <p
              onClick={() => {
                setCreateAccount(!createAccount);
                setUsername("");
                setPassword("");
                setUsernameError(false);
                setPasswordError(false);
              }}
              className="text-white text-center text-sm hover:underline hover:cursor-pointer"
            >
              {createAccount ? "Déjà un compte ? Se connecter" : "Créer un compte"}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">QR Code de votre mot de passe</h3>
            {qrCodeData ? (
              <img
                src={qrCodeData} // doit être une URL ou base64 d’image
                alt="QR Code"
                className="mx-auto mb-4"
              />
            ) : (
              <p>Chargement du QR Code...</p>
            )}
            <button
              onClick={closeModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
