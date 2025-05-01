export async function loginUser(username: string, password: string): Promise<{ token: string } | null> {
    try {
      const response = await fetch("http://26.45.117.162/test_api/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mUsername: username,
          mPassword: password,
        }),
      });
  
      if (!response.ok) return null;
  
      const data = await response.json();
      return data.access_token ? { token: data.access_token } : null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  }
  