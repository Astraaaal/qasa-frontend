interface LoginSuccessful {
  accessToken: string;
  expiresIn: number;
}

interface LoginFailed {
  Message: string;
}

export async function loginUser(username: string, password: string) {
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

  // Check if backend returned status 400 (maybe malformed JSON)
  if (response.status === 400) {
    const json: LoginFailed = await response.json();
    const message = json.Message;
    throw new Error(message);
  }

  // catch other failures
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  // we're ok here
  const raw = await response.json();

  const json: LoginSuccessful = {
    accessToken: raw.access_token,
    expiresIn: raw.expires_in,
  };

  return json;
}
