import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import { PrismaAdapter } from "@auth/prisma-adapter"

import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/libs/prisma"
import compare from "@/libs/crypto/compare"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Credentials are required")
        }

        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error("That user doesn't exists")
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordCorrect) {
          throw new Error("Invalid password")
        }

        return user
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
