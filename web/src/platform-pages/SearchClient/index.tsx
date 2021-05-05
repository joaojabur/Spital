import HeaderPlatform from "../../components/HeaderPlatform";
import ListMedicAreas from "../../components/ListMedicAreas";
import SearchInput from "../../components/SearchInput";
import "./styles.css";

const SearchClient = () => {
  return (
    <div className="client-platform">
      <HeaderPlatform title="Encontre os melhores médicos da sua região" />
      <div className="container">
        <SearchInput placeholder="Busque pelo área ou nome do médico..." />
        <ListMedicAreas />
      </div>
    </div>
  );
};

export default SearchClient;
