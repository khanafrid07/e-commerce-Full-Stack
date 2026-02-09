import { useCreateReviewsMutation } from "./reviewSlice";
import { useState } from "react";
import { useParams } from "react-router";

export default function Reviews({ reviews }) {
  const [createReviews] = useCreateReviewsMutation();
  const { id } = useParams();

  const [review, setReview] = useState({
    rating: 2,
    comment: "",
    productId: id,
  });

  const [page, setPage] = useState(0);
  const reviewsPerPage = 5;

  function onReviewChange(e) {
    setReview((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function onRatingChange(e) {
    setReview((prev) => ({
      ...prev,
      rating: Number(e.target.value),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createReviews(review).unwrap();
      alert("Review added successfully");

      setReview({
        rating: 2,
        comment: "",
        productId: id,
      });
    } catch (err) {
      console.log(err);
      alert("Error adding review");
    }
  }

  // pagination logic
  const startIndex = page * reviewsPerPage;
  const currentReviews = reviews?.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Reviews & Ratings</h3>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <input
              key={num}
              type="radio"
              name="rating"
              value={num}
              checked={review.rating === num}
              onChange={onRatingChange}
              className="mask mask-star-2 bg-orange-400"
            />
          ))}
        </div>

        <textarea
          className="textarea w-full"
          name="comment"
          value={review.comment}
          onChange={onReviewChange}
          placeholder="Write a Review"
        />

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>

      {/* Reviews List */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {currentReviews?.map((rev) => (
          <div key={rev._id} className="border border-gray rounded-sm p-2">
            <p className="font-bold">{rev.username}</p>

            <div className="rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <input
                  key={num}
                  type="radio"
                  name={`rating-${rev._id}`}
                  className="mask mask-star-2 bg-orange-400"
                  checked={num <= rev.rating}
                  readOnly
                />
              ))}
            </div>

            <p>{rev.comment}</p>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex gap-4 mt-4">
        <button
          className="btn"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          className="btn"
          disabled={startIndex + reviewsPerPage >= reviews.length}
          onClick={() => setPage((prev) => prev + 1)}
        >
          More Reviews
        </button>
      </div>
    </div>
  );
}
