export function getUser(request: Request) {
  const data = request.headers.get("x-ms-client-principal");

  if (process.env.NODE_ENV === 'development') {
    return "FlorianRappl";
  }

  if (data) {
    const encoded = Buffer.from(data, "base64");
    const decoded = encoded.toString("ascii");
    const clientPrincipal = JSON.parse(decoded);
    return clientPrincipal.userDetails;
  }

  return undefined;
}

export function isLoggedIn(request: Request) {
  const user = getUser(request);
  return user !== undefined;
}
