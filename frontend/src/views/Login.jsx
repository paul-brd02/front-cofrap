import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();

  // ----- VALIDATION FUNCTIONS -----
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (pwd) =>
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[^A-Za-z\d]/.test(pwd) &&
    pwd.length >= 24;

  const passwordsMatch = password === confirmPassword;

  // ----- CAN SUBMIT CALCULATION -----
  useEffect(() => {
    const emailOK = isValidEmail(email);
    const passwordOK = isStrongPassword(password);

    if (createAccount) {
      setCanSubmit(emailOK && passwordOK && passwordsMatch);
    } else {
      setCanSubmit(emailOK && password.length > 0);
    }
  }, [email, password, confirmPassword, createAccount]);

  // ----- UTILITY -----
  const getConditionClass = (condition) =>
    condition ? "text-green-500" : "text-red-500";

  const handleSubmit = () => {
    const user = { email, password };
    navigate("/result", { state: { user } });
  };

  // ----- RENDER -----
  return (
    <div className="flex items-center justify-center h-full mt-16">
      <div className="bg-primary p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          {createAccount ? "Créer un compte" : "Connexion"}
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {createAccount && (
            <>
              {/* Conditions */}
              <div className="text-sm space-y-1">
                <p className={getConditionClass(password.length >= 24)}>
                  {password.length >= 24 ? "✅" : "❌"} 24 caractères minimum
                </p>
                <p className={getConditionClass(/[A-Z]/.test(password))}>
                  {/[A-Z]/.test(password) ? "✅" : "❌"} Une majuscule
                </p>
                <p className={getConditionClass(/[a-z]/.test(password))}>
                  {/[a-z]/.test(password) ? "✅" : "❌"} Une minuscule
                </p>
                <p className={getConditionClass(/\d/.test(password))}>
                  {/\d/.test(password) ? "✅" : "❌"} Un chiffre
                </p>
                <p className={getConditionClass(/[^A-Za-z\d]/.test(password))}>
                  {/[^A-Za-z\d]/.test(password) ? "✅" : "❌"} Un caractère spécial
                </p>
              </div>

              {/* Confirm password */}
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`focus:outline-none focus:ring-2 ${
                  passwordsMatch ? "focus:ring-blue-500 border-gray-300" : "focus:ring-red-500 border-red-500"
                }`}
              />
            </>
          )}

          <button
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={`w-full py-2 rounded-lg transition duration-200 ${
              canSubmit
                ? createAccount
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {createAccount ? "Créer mon compte" : "Se connecter"}
          </button>

          <p
            onClick={() => {
              setCreateAccount(!createAccount);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="text-white text-center text-sm hover:underline hover:cursor-pointer"
          >
            {createAccount ? "Déjà un compte ? Se connecter" : "Créer un compte"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
