import "./styles.css";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import PaymentInfo from "../../../components/PaymentInfo";
import { NamesProps } from "../../Form/Steps/Names";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { PaymentMethodProps } from "../../Modals/PaymentMethod";

const PaymentMedicProfile = ({ previousPage, nextPage }: NamesProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [cardInfo, setCardInfo] = useState<PaymentMethodProps>({
    id: "",
    first_digits: "",
    last_digits: "",
    holder_name: "",
    expiration_date: "",
    card_cvv: "",
  });

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title="Dados da consulta"
        returnFunction={() => previousPage()}
      />
      <div className="container">
        <PaymentInfo card={cardInfo} setCard={setCardInfo} error={error} />
        {loading ? (
          <Loader
            type="TailSpin"
            color="var(--color-button-primary)"
            height={100}
            width={100}
          />
        ) : (
          <>
            <button onClick={nextPage} className="green-button">
              Ir para o pagamento
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMedicProfile;
