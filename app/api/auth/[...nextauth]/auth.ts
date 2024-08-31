import { NextAuthOptions, Awaitable, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/mongodb";
import { Goal } from "@/types/model";

type user = {
  username: string;
  password: string;
  email : string;
  goals : Array<Goal>;
};

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
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
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const client = await connectDB();

        const db = client.connection.useDb(`Dailies`);
        const user = await db
          .collection("Users")
          .findOne({ email: credentials?.email });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!passwordMatch) {
          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          return null;
        }

        // Any object returned will be saved in `user` property of the JWT
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.goals = user.goals;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user.email = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.goals = token.goals;

      return session;
    },
  },
};
