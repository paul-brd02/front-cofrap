import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../services/apiService";

function CreateAccount() {
    const [step, setStep] = useState(1); // 1: password gen, 2: 2FA, 3: done
    const [username, setUsername] = useState("");
    const [userCreated, setUserCreated] = useState(null); // { username, password, password_qr }
    const [twoFAData, setTwoFAData] = useState(null); // { mfa_uri, mfa_qr }

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleGeneratePassword = async () => {
        try {
            if (!username) {
                setError("Veuillez entrer un nom d'utilisateur.");
                return;
            }
            const res = await apiRequest("/function/generate-password", "POST", { username });
            setUserCreated(res);
            setStep(2);
        } catch (err) {
            setError("Erreur lors de la génération du mot de passe.");
        }
    };

    const handleGenerate2FA = async () => {
        try {
            const res = await apiRequest("/function/generate-2fa", "POST", { username });
            setTwoFAData(res);
            setStep(3);
        } catch (err) {
            setError("Erreur lors de la configuration 2FA.");
        }
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Créer un compte</h2>
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border w-full p-2 rounded mb-4"
                        />
                        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                        <button
                            onClick={handleGeneratePassword}
                            className="bg-primary text-white py-2 px-4 rounded w-full hover:bg-blue-700"
                        >
                            Créer mon compte
                        </button>
                        <p onClick={() => { navigate("/") }} className="text-blue-600 mt-4 text-center text-sm hover:underline hover:cursor-pointer">
                            Déjà un compte ? Se connecter
                        </p>
                    </>
                )}

                {step === 2 && userCreated && (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Mot de passe généré</h2>
                        <p className="mb-2">Nom d'utilisateur : <strong>{userCreated.username}</strong></p>
                        <img
                            src={`data:image/png;base64,${userCreated.password_qr}`}
                            alt="QR Code mot de passe"
                            className="mx-auto mb-4"
                        />
                        <p className="text-red-600 text-sm mb-4 text-center">
                            ⚠️ Scannez le QR code pour récupérer votre mot de passe.
                            <br />
                            <strong>Il ne s'affichera qu'une seule fois !</strong>
                        </p>
                        <button
                            onClick={handleGenerate2FA}
                            className="bg-green-600 text-white py-2 px-4 rounded w-full"
                        >
                            Continuer avec l’authentification 2FA
                        </button>
                    </>
                )}

                {step === 3 && twoFAData && (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Configurer Google Authenticator</h2>
                        <img
                            src={`data:image/png;base64,${twoFAData.mfa_qr}`}
                            alt="QR Code 2FA"
                            className="mx-auto mb-4"
                        />
                        <p className="text-gray-700 text-sm mb-4 text-center">
                            Scannez ce QR Code avec Google Authenticator.<br />
                            Un code dynamique à 6 chiffres vous sera généré.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-600 text-white py-2 px-4 rounded w-full"
                        >
                            Terminer
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateAccount;