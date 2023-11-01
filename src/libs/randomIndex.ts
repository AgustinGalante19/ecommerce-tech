export default function randomIndex(length: number[]) {
  const result = length.map((item) => Math.floor(Math.random() * item))
  return Array.from(new Set(result))
}
