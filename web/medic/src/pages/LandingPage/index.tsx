import Benefits from "../../components/Benefits";
import Header from "../../components/Header";
import LeftSideBenefit from "../../components/LeftSideBenefit";
import Presentation from "../../components/Presentation";
import Title from "../../components/Title";
import "./styles.css";
import booking from "../../assets/images/booking.svg";
import checkbox from "../../assets/images/checkbox.svg";
import interview from "../../assets/images/interview.svg";
import wallet from "../../assets/images/wallet.svg";
import RightSideBenefit from "../../components/RightSideBenefit";
import Tax from "../../components/Tax";
import Refund from "../../components/Refund";
import Footer from "../../components/Footer";
import Video from "../../components/Video";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Presentation />
      <Video />
      <Benefits />
      <Title />
      <LeftSideBenefit
        title="Agenda"
        image={booking}
        description="Aqui temos uma agenda que listará todos os compromissos do médico de forma automática ou manual!"
      />
      <RightSideBenefit
        title="Histórico de pacientes"
        image={interview}
        description="O histórico de todos os clientes será guardado na nuvem e podem ser consultados a qualquer momento"
      />
      <LeftSideBenefit
        title="Histórico de consultas"
        image={checkbox}
        description="Informações como preços, data e hora das consultas é importante. Por conta disso disponibilizamos o histórico de suas consultas."
      />
      <RightSideBenefit
        title="Sistema de pagamento"
        image={wallet}
        description="Na Spital utilizamos um sistema de pagamento desenvolvido pela PagSeguro. Com um clique você consegue sacar seu dinheiro das consultas!"
      />
      <Tax />
      <Refund />
      <Footer />
    </div>
  );
};

export default LandingPage;
