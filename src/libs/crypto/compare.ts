import bcrypt from "bcrypt"

export default async function compare(value: string, hashedPassword: string) {
  return await bcrypt.compare(value, hashedPassword)
}
