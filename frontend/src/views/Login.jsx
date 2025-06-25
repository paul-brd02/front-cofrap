function Login() {
    return (
        <div className="flex items-center justify-center h-full mt-16">
            <div className="bg-primary p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">Connexion</h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Se connecter
                    </button>
                    <p className="text-white text-center text-sm hover:underline hover:cursor-pointer">Créer un compte</p>
                </form>
            </div>
        </div>
    );
}

export default Login;