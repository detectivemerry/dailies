import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Goal } from "@/types/model";
import sendMilestoneNotifications from "@/app/lib/actions/notifications/milestoneNotifications";

type user = {
  username: string;
  password: string;
  email: string;
  goals: Array<Goal>;
};

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/login`,
          { method: "POST", body: JSON.stringify(credentials) }
        );
        const loginResult = await loginResponse.json();
        if (loginResponse.ok) {

          if(credentials?.email){
            sendMilestoneNotifications(credentials.email);
          }

          const { user } = loginResult;
          
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (user) {
        console.log(`user : ${user}`);
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.goals = user.goals;
        token.token = user.token;
        token.subscribedCommunities = user.subscribedCommunities;
        console.log(`token : ${token.token}`);
      }

      return token;
    },

    async session({ session, token, user, trigger, newSession }) {
      session.user.email = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.goals = token.goals;
      session.user.token = token.token;
      session.user.subscribedCommunities = token.subscribedCommunities;

      // if (trigger === "update" && newSession?.goals) {
      //   session.user.goals = newSession.goals;
      // }
      // if (trigger === "update" && newSession?.subscribedCommunities) {
      //   session.user.subscribedCommunities = newSession.subscribedCommunities;
      // }
      return session;
    },
  },
};
