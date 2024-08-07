// import NextAuth from "next-auth/next";
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";

// // Define the profile type to include the picture property
// interface Profile {
//   sub: string;
//   name?: string;
//   email?: string;
//   picture?: string;
// }

// // Define the account type to include the expires_in property
// interface Account {
//   access_token: string;
//   expires_in: number;
//   refresh_token: string;
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     {
//       id: "descope",
//       name: "Descope",
//       type: "oauth",
//       wellKnown: `https://api.descope.com/P2icCJng79fuhf2a6MUaNKtFy5Uh/.well-known/openid-configuration`,
//       authorization: { params: { scope: "openid email profile" } },
//       idToken: true,
//       clientId: "P2icCJng79fuhf2a6MUaNKtFy5Uh",
//       clientSecret: "<Descope Access Key>",
//       checks: ["pkce", "state"],
//       profile(profile: Profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     },
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }: { token: JWT | any, account?: Account | any, profile?: Profile | any }) {
//       if (account) {
//         return {
//           ...token,
//           access_token: account.access_token,
//           expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
//           refresh_token: account.refresh_token,
//           profile: {
//             name: profile?.name,
//             email: profile?.email,
//             image: profile?.picture,
//           },
//         };
//       } else if (Date.now() < (token.expires_at as number) * 1000) {
//         return token;
//       } else {
//         try {
//           const response = await fetch(
//             "https://api.descope.com/oauth2/v1/token",
//             {
//               headers: { "Content-Type": "application/x-www-form-urlencoded" },
//               body: new URLSearchParams({
//                 client_id: "P2icCJng79fuhf2a6MUaNKtFy5Uh",
//                 client_secret: "<Descope Access Key>",
//                 grant_type: "refresh_token",
//                 refresh_token: token.refresh_token as string,
//               }),
//               method: "POST",
//             }
//           );

//           const tokens = await response.json();

//           if (!response.ok) throw tokens;

//           return {
//             ...token,
//             access_token: tokens.access_token,
//             expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
//             refresh_token: tokens.refresh_token ?? token.refresh_token,
//           };
//         } catch (error) {
//           console.error("Error refreshing access token", error);
//           return { ...token, error: "RefreshAccessTokenError" };
//         }
//       }
//     },

//     async session({ session, token }: { session: Session, token: JWT }) {
//       if (token.profile) {
//         session.user = token.profile;
//       }

//       // @ts-ignore: Ignore because session error and accessToken might not exist on type Session
//       session.error = token.error;
//       // @ts-ignore: Ignore because session error and accessToken might not exist on type Session
//       session.accessToken = token.access_token;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };










// import NextAuth from "next-auth/next";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     {
//       id: "descope",
//       name: "Descope",
//       type: "oauth",
//       wellKnown: `https://api.descope.com/P2icCJng79fuhf2a6MUaNKtFy5Uh/.well-known/openid-configuration`,
//       authorization: { params: { scope: "openid email profile" } },
//       idToken: true,
//       clientId: "P2icCJng79fuhf2a6MUaNKtFy5Uh",
//       clientSecret: "<Descope Access Key>",
//       checks: ["pkce", "state"],
//       profile(profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     },
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account) {
//         return {
//           ...token,
//           access_token: account.access_token,
//           expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
//           refresh_token: account.refresh_token,
//           profile: {
//             name: profile?.name,
//             email: profile?.email,
//             image: profile?.picture,
//           },
//         };
//       } else if (Date.now() < token.expires_at * 1000) {
//         return token;
//       } else {
//         try {
//           const response = await fetch(
//             "https://api.descope.com/oauth2/v1/token",
//             {
//               headers: { "Content-Type": "application/x-www-form-urlencoded" },
//               body: new URLSearchParams({
//                 client_id: "P2icCJng79fuhf2a6MUaNKtFy5Uh",
//                 client_secret: "<Descope Access Key>",
//                 grant_type: "refresh_token",
//                 refresh_token: token.refresh_token,
//               }),
//               method: "POST",
//             }
//           );

//           const tokens = await response.json();

//           if (!response.ok) throw tokens;

//           return {
//             ...token,
//             access_token: tokens.access_token,
//             expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
//             refresh_token: tokens.refresh_token ?? token.refresh_token,
//           };
//         } catch (error) {
//           console.error("Error refreshing access token", error);
//           return { ...token, error: "RefreshAccessTokenError" };
//         }
//       }
//     },

//     async session({ session, token }) {
//       if (token.profile) {
//         session.user = token.profile;
//       }

//       session.error = token.error;
//       session.accessToken = token.access_token;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
