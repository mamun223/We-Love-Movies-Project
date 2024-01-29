const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists (req, res, next) {
  const reviewId = req.params.reviewId
  const review = await service.read(reviewId)
  
  if (review) {
    res.locals.reviewId = reviewId
    return next()
  }
  return next({ status: 404, message: "error: Review cannot be found." })
}

async function destroy (req, res) {
  
  await service.destroy(res.locals.reviewId)
  res.sendStatus(204)
}

async function update (req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.reviewId,
  }
  
  const data = await service.update(updatedReview)
  res.json({ data })
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), destroy],
  update: [asyncErrorBoundary(reviewExists), update]
}