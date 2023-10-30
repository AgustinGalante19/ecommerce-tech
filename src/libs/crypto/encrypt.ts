import bcrypt from "bcrypt"

export default async function encrypt(value: string) {
  return await bcrypt.hash(value, 15)
}
