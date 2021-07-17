import React, { useEffect, useState } from "react";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";
import Loader from "react-loader-spinner";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import { TextField } from "@material-ui/core";
import mask from "../../../utils/mask";
import Uploadfile from "../../../components/Dropzone";

export interface Files {
  profile: File;
  identification: Array<File>;
}

export default function ProfileConfig({ previousPage, nextPage }: PagesProps){
  const { medicDataConfigure, setMedicDataConfigure } = useShareFormMedicConfigure();
  const [filePreview, setFilePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

  useEffect(() => {
    setErrors(validateConfigureMedic(medicDataConfigure));
  }, [medicDataConfigure]);

  function handleFileUpload(file: File){
    setMedicDataConfigure((previousState) => ({...previousState, file}))
    setFilePreview(window.URL.createObjectURL(file));
  }

  function handlePreview(){
    window.open(filePreview)
  }

  return (
    <div
    style={{ justifyContent: "space-between", padding: "2.5rem" }}
    className="landing"
  >
    <div style={{ width: "100%", flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="landing-flex">
        <h1 className="landing-flex-h1">Configurações de Perfil</h1>
      </div>
      <div className="line-global"></div>
      <div style={{ marginTop: "2rem", flex: 1 }} className="landing-flex">
          <Uploadfile onFileUpload={handleFileUpload}/>
      </div>
      
      <div style={{ margin: "2rem 0", width: '100%',display: 'flex', justifyContent: 'center' }} className="landing-flex">
        {errors?.file && (
          <p style={{ color: '#f44336' }}>{errors.file}</p>
        ) }
        {
          medicDataConfigure?.file && (
            <button 
              onClick={handlePreview}
              className="next"
              style={{fontSize: '1.25rem'}}>
                Visualizar foto enviada
            </button>
          )
        }
      </div>
    </div>

    <div style={{ width: "100%" }}>
      <button
        onClick={previousPage}
        style={{ width: "100%" }}
        className="previous"
      >
        Anterior
      </button>
      <button onClick={nextPage} style={{ width: "100%" }} className="next">
        {loading ? (
          <Loader type="TailSpin" color="#fff" height={30} width={30} />
        ) : (
          "Próximo"
        )}
      </button>
    </div>
  </div>
  );
};
