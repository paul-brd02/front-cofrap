import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [createAccountView, setCreateAccountView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  let navigate = useNavigate();

  // Conditions individuelles
  const hasUppercase = (password) => {
    return /[A-Z]/.test(password);
  }
  const hasLowercase = (password) => {
    return /[a-z]/.test(password);
  }
  const hasNumber = (password) => {
    return /\d/.test(password);
  }
  const hasSpecialChar = (password) => {
    return /[^A-Za-z\d]/.test(password);
  }
  const hasMinLength = (password) => {
    return password.length >= 24;
  }

  const verifStrongPassword = (password) => {
    return hasUppercase(password) && hasLowercase(password) && hasNumber(password) && hasSpecialChar(password) && hasMinLength(password);
  }

  useEffect(() => {
    setPasswordStrong(verifStrongPassword(password));
    if (!createAccountView) setCanSubmit(password && email);
    console.log(canSubmit)
  }, [password]);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
    setCanSubmit(passwordMatch && passwordStrong && email);
  }, [confirmPassword]);

  const getConditionClass = (condition) =>
    condition ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center justify-center h-full mt-16">
      <div className="bg-primary p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          {createAccountView ? "Créer un compte" : "Connexion"}
        </h2>

        <form className="space-y-4">
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

          {/* Affichage des conditions */}
          {createAccountView && (
            <div className="text-sm space-y-1">
              <p className={getConditionClass(hasMinLength)}>
                {hasMinLength(password) ? "✅" : "❌"} 24 caractères minimum
              </p>
              <p className={getConditionClass(hasUppercase)}>
                {hasUppercase(password) ? "✅" : "❌"} Au moins une majuscule
              </p>
              <p className={getConditionClass(hasLowercase)}>
                {hasLowercase(password) ? "✅" : "❌"} Au moins une minuscule
              </p>
              <p className={getConditionClass(hasNumber)}>
                {hasNumber(password) ? "✅" : "❌"} Au moins un chiffre
              </p>
              <p className={getConditionClass(hasSpecialChar)}>
                {hasSpecialChar(password) ? "✅" : "❌"} Au moins un caractère spécial
              </p>
            </div>
          )}

          {createAccountView && (
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className={`${passwordMatch ? "border-gray-300" : "border-red-500"} focus:outline-none focus:ring-2 ${passwordMatch ? "focus:ring-blue-500" : "focus:ring-red-500"
                }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-2 rounded-lg transition duration-200 ${canSubmit
                ? createAccountView
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-white cursor-not-allowed"
              }`}
          >
            {createAccountView ? "Créer mon compte" : "Se connecter"}
          </button>

          <p
            onClick={() => {
              setCreateAccountView(!createAccountView);
              setEmail("")
              setPassword("");
              setConfirmPassword("");
              navigate("/result")
            }}
            className="text-white text-center text-sm hover:underline hover:cursor-pointer"
          >
            {createAccountView ? "Déjà un compte ? Se connecter" : "Créer un compte"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
