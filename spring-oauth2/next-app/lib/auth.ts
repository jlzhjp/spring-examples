import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "test-provider",
          clientId: "test-client",
          clientSecret: "secret",
          discoveryUrl:
            "http://localhost:8080/.well-known/openid-configuration",
          scopes: ["openid"],
          pkce: true,
          type: "oidc",
        },
      ],
    }),
  ],
})
