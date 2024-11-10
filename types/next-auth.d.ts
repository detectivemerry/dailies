import NextAuth from "next-auth";
import { Goal, UserSubscribedCommunity } from "./model";

declare module "next-auth" {
  /**
   *  returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    username: string | unknown;
    password: string| unknown;
    email: string | undefined | null;
    goals: Array<Goal> | unknown;
    token: string | unknown;
    subscribedCommunities : Array<UserSubscribedCommunity> | unknown;
  }

  interface Session {
    user: {
      username: string | unknown;
      password: string| unknown;
      email: string | unknown;
      goals: Array<Goal> | unknown;
      token : string | unknown;
      subscribedCommunities : Array<UserSubscribedCommunity> | unknown;
    };
  }
}
