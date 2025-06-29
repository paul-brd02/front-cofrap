export async function apiRequest(url, method = 'GET', data = null) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('Content-Type');

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Erreur inconnue');
    }

    // Si le serveur renvoie du JSON, on le parse
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Erreur API :', error.message);
    throw error; // Laisse l'appelant gérer l'erreur
  }
}
