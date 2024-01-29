const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    res.json({ data: await service.list() });
}

async function moviesShowing(req, res) {
    res.json({ data: await service.moviesShowing() });
}

async function movieExists(req, res, next) {
  const movieId = req.params.movieId;
  if (movieId !== undefined && movieId !== null) {

    res.locals.movieId = movieId;

    return next();
  }

  next({ status: 404, message: `Movie cannot be found.` });
}


async function read(req, res) {
    const movie = await service.read(Number(res.locals.movieId));

    if (!movie) {
      res.status(404).json({ error: 'Movie not found.' });
    } 
    res.json({ data: movie });
}

async function theatersShowingMovie (req, res) {
  const theatersShowingMovie = await service.theatersShowingMovie(Number(res.locals.movieId))
  res.json({ data: theatersShowingMovie })
}

async function movieReviews (req, res) {
  const movieReviews = await service.movieReviews(Number(res.locals.movieId))
  res.json({ data: movieReviews })
}




module.exports = {
    list: asyncErrorBoundary(list),
    moviesShowing: asyncErrorBoundary(moviesShowing),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    theatersShowingMovie: [asyncErrorBoundary(movieExists), theatersShowingMovie],
    movieReviews: [asyncErrorBoundary(movieExists), movieReviews]
}