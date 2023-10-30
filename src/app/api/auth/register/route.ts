import { NextResponse } from "next/server"
import client from "@/libs/prisma"
import encrypt from "@/libs/crypto/encrypt"

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<boolean>>> {
  try {
    const { name, surname, email, password } = await req.json()

    const emailExists = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      return NextResponse.json({
        data: [false],
        error: ["Email already exists"],
        result: "error",
      })
    }

    const encryptedPassword = await encrypt(password)

    await client.user.create({
      data: {
        name,
        surname,
        email,
        password: encryptedPassword,
      },
    })

    return NextResponse.json({ data: [true], error: [], result: "ok" })
  } catch (err) {
    console.log("Error on register", err)
    return NextResponse.json({
      data: [],
      error: ["Something went wrong on register"],
      result: "error",
    })
  }
}
