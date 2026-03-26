export async function loginApi(
  login: string,
  password: string,
): Promise<string> {
  try {
    const response = await fetch("http://localhost:4000/4ntjnra6", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    if (!response.ok) {
      throw new Error("Échec de l'authentification");
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error("Token manquant dans la réponse");
    }
    return data.token;
  } catch (err: any) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      throw new Error(
        "Impossible de contacter l'API. Vérifiez que le serveur est bien démarré et que CORS est autorisé.",
      );
    }
    throw err;
  }
}
