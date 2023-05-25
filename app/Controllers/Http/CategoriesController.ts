export const createCategory = async ({ request, response }) => {
  try {
    response.send(request.body())
  } catch (error) {
    response.badRequest({ message: error.messages })
  }
}
