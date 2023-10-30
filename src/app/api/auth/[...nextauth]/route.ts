import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import { PrismaAdapter } from "@auth/prisma-adapter"

import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/libs/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
