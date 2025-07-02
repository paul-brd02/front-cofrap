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
    const text = await response.text()

    if (!response.ok) {
      throw new Error(text || response.statusText)
    }

    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  } catch (error) {
    console.error('Erreur API :', error.message);
    throw error;
  }
}
