export default function ReviewCard({ review }: any) {

  return (
    <div className="bg-white p-6 shadow rounded-lg">

      <p className="italic">
        "{review.review}"
      </p>

      <p className="mt-4 font-semibold">
        - {review.clientName}
      </p>

      <p>⭐ {review.rating}</p>

    </div>
  );
}