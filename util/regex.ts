export const getIdRegex = (str: string) => {
  const regex = /ID:\s(\d+)/
  const match = str.match(regex)
  return match ? parseInt(match[1]) : 0
}
