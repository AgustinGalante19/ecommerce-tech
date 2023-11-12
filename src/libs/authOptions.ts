import { PrismaAdapter } from "@auth/prisma-adapter"
import client from "./prisma"
import { AuthOptions } from "next-auth"
import compare from "./crypto/compare"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
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
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const currentUser = await client.user.findMany({
          where: {
            email: session.user.email,
          },
        })
        session.user.id = currentUser[0].id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

export default authOptions
