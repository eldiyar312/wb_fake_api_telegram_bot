export const getIdRegex = (str: string) => {
  const regex = /ID:\s(\d+)/
  const match = str.match(regex)
  return match ? parseInt(match[1]) : 0
}

export const getIdInStart = (str: string) => {
  const pattern = /\d+/

  const match = str.match(pattern)
  return match ? parseInt(match[0]) : 0
}
