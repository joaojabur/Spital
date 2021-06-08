import React, { useEffect, useState } from "react";
import api from "../../services/api";
import SubHeaderPlatform from "../SubHeaderPlatform";
import "./styles.css";
import { useHistory, useParams } from "react-router-dom";
import { ParamTypes } from "../MedicProfilePages/Main";
import { FaStar } from "react-icons/fa";
import Loader from "react-loader-spinner";

interface ReviewProps {
  id: number;
  first_name: string;
  last_name: string;
  stars: number;
  description: string;
}

const MedicProfileRating = () => {
  const { medicID } = useParams<ParamTypes>();
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [medicName, setMedicName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`medics?id=${medicID}`).then((response: any) => {
      setMedicName(response.data.first_name);
      api.get(`reviews?medicID=${response.data.id}`).then((res: any) => {
        setReviews(res.data);
        setLoading(false);
      });
    });
  }, [setReviews, medicID]);

  const history = useHistory();
  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title={`Avaliações do(a) Dr(a) ${medicName}`}
        returnFunction={() => history.goBack()}
      />
      <div
        style={{ alignItems: "flex-start", marginTop: "2rem" }}
        className="container"
      >
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginLeft: "1rem" }}
        >
          Avaliações:
        </h1>
        {loading ? (
          <Loader
            type="TailSpin"
            color="var(--color-button-primary)"
            height={100}
            width={100}
          />
        ) : (
          <div className="review-medic-profile">
            {reviews.map((review: ReviewProps, index: number) => {
              return (
                <div key={index} className="review-medic-profile-wrap">
                  <div className="review-medic-profile-wrap-flex">
                    <img
                      src={`https://avatars.dicebear.com/api/human/${
                        review.first_name + review.last_name
                      }.svg`}
                    />
                    <h1>
                      {review.first_name} {review.last_name}
                    </h1>

                    <span>{review.stars}.0</span>
                    <FaStar
                      color="#FFC107"
                      style={{ marginTop: "1.1rem", marginLeft: "1.5rem" }}
                      size="3rem"
                    />
                  </div>
                  <p>{review.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicProfileRating;
