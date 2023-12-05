const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  const movieId = request.params.movieId;
  const data = movieId ? await service.theatersForMovie(movieId) : await service.list();
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
