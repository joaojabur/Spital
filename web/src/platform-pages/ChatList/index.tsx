import HeaderPlatform from "../../components/HeaderPlatform";
import "./styles.css";
import SearchInput from "../../components/SearchInput";

const ChatList = () => {

  return (
    <div className="client-platform">
      <HeaderPlatform title="Bata um papo com seu médico" />
      <div className="container">
          <SearchInput placeholder="Busque pelo nome do médico..." />
      </div>
    </div>
  );
};

export default ChatList;
