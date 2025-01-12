// app/api/auth/[auth0]/route.js
import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      authorizationParams: {
        audience: "your-api-identifier", // Add your Auth0 API identifier
        scope: "openid profile email",
      },
    });
  },
});
