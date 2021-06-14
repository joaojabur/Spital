import Overlay from "../Overlay";
import "./styles.css";
import { IoCloseOutline } from "react-icons/io5";
import { useModal } from "../../../context/ModalProvider";
import locationImg from "../../../assets/images/location.svg";

const Location = (address: any) => {
  const { location } = useModal();

  return (
    <Overlay>
      <div className="location">
        <div onClick={location.close} className="close-button">
          <IoCloseOutline size={"4rem"} color="#fff" />
        </div>
        <img src={locationImg} alt="Localização" />
        <h1
          style={{
            marginTop: "4rem",
            fontWeight: "bold",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          {address.address}
        </h1>
      </div>
    </Overlay>
  );
};

export default Location;
