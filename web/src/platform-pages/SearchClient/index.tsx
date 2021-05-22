import React, { useState } from "react";
import HeaderPlatform from "../../components/HeaderPlatform";
import ListMedicAreas from "../../components/ListMedicAreas";
import SearchInput from "../../components/SearchInput";
import "./styles.css";

const SearchClient = () => {
  const [ searchTerm, setSearchTerm ] = useState('');
  return (
    <div className="client-platform">
      <HeaderPlatform title="Encontre os melhores médicos da sua região" />
      <div className="container">
        <SearchInput 
          placeholder="Busque pelo área ou nome do médico..."
          onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value)} />
        <ListMedicAreas searchTerm={searchTerm}/>
      </div>
    </div>
  );
};

export default SearchClient;
