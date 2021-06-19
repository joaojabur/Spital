import { Fragment } from "react";
import { IoStar } from "react-icons/io5";

interface StarsProps {
  rating: number;
  color?: string;
  background?: string;
}

export default function Stars({
  rating,
  color = "#FFC107",
  background = "#ccc",
}: StarsProps) {
  let stars = [0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    if (1 <= rating - 1 * i) {
      stars[i] = 1;
    } else {
      stars[i] = rating - 1 * i;
      break;
    }
  }

  return (
    <Fragment>
      {stars.map((star, index: number) => {
        var id = "id" + Math.random().toString(16).slice(2);
        var id2 = "id" + Math.random().toString(16).slice(2);

        if (star) {
          let percentage = (1 - star) * 30;
          return (
            <div
              key={index}
              style={{ position: "relative", width: 30, height: 30 }}
            >
              <IoStar
                key={index}
                color={color}
                size={30}
                style={{
                  position: "absolute",
                  left: 0,
                  clipPath: `inset(0 ${percentage}px 0 0)`,
                  backgroundClip: "#000",
                  zIndex: 2,
                }}
              />
              <IoStar
                key={id}
                color="#000"
                size={30}
                style={{
                  position: "absolute",
                  left: 0,
                  zIndex: 1,
                }}
              />
            </div>
          );
        }

        return <IoStar key={id2} color={background} size={30} />;
      })}
    </Fragment>
  );
}
