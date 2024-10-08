import React from "react";
import { IoStar } from "react-icons/io5";

interface StarsProps {
  rating: number;
  color?: string;
  background?: string;
}

export default function Stars({
  rating,
  color = "#FFC107",
  background = "#000",
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
    <>
      {stars.map((star, index) => {
        var id = "id" + Math.random().toString(16).slice(2);
        var id2 = "id" + Math.random().toString(16).slice(2);

        if (star) {
          let percentage = (1 - star) * 30;
          return (
            <div style={{ position: "relative", width: 30, height: 30 }}>
              <IoStar
                key={index}
                color={color}
                size={30}
                style={{
                  position: "absolute",
                  left: 0,
                  clipPath: `inset(0 ${percentage}px 0 0)`,
                  backgroundClip: "#ccc",
                  zIndex: 2,
                }}
              />
              <IoStar
                key={id2}
                color="#ccc"
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

        return <IoStar key={id} color={background} size={30} />;
      })}
    </>
  );
}
