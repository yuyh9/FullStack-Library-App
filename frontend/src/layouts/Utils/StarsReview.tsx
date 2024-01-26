import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const StarsReview: React.FC<{ rating: number}> = (
  props
) => {
  let rating = props.rating;

  let fullStars = 0;

  let halfStars = 0;

  let emptyStars = 0;

  if (rating !== undefined && rating > 0 && rating <= 5) {
    for (let i = 0; i <= 4; i++) {
        if (rating - 1 >= 0) {
            fullStars += 1;
            rating -= 1;
        } else if (rating === .5) {
            halfStars += 1;
            rating -= .5;
        } else if (rating === 0) {
            emptyStars += 1;
        } else {
            break;
        }
    }
} else {
    emptyStars = 5;
}
  return (
    <div>
      {Array.from({ length: fullStars}, (_, index) => (
        <FaStar key={index} className="fs-4 text-warning" />
      ))}

      {Array.from({ length: halfStars }, (_, index) => (
        <FaStarHalfAlt key={index} className="fs-4 text-warning" />
      ))}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar key={index} className="fs-4 text-warning" />
      ))}
    </div>
  );
};
