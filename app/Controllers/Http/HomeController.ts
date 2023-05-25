export const home = async ({ response }) => {
  try {
    response.send('Server working...')
  } catch (error) {
    response.badRequest({ message: error.messages })
  }
}
