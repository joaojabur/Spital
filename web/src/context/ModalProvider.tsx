import React, { createContext, useContext, useState } from "react";
import CadastroSucesso, {
  CadastroSucessoProps as sucessoProps,
} from "../components/Modals/CadastroSucesso";
import PaymentMethod, { PaymentMethodProps } from "../components/Modals/PaymentMethod";
import Spinner from "../components/Modals/Spinner";

interface ModalProviderProps {
  children: React.ReactNode;
}

interface ModalContextProps {
  spinner: {
    open: () => void;
    close: () => void;
  };
  sucesso: {
    open: ({ name, close, description }: sucessoProps) => void;
    close: () => void;
  };
  paymentMethod: {
    open: ({ cards }: PaymentMethodProps) => void;
    close: () => void;
  };
}

const ModalContext = createContext({} as ModalContextProps);

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<JSX.Element | null>(null);

  function openModal(Modal: any) {
    setModal(Modal);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  let value = {
    spinner: {
      open: () => openModal(<Spinner />),
      close: closeModal,
    },
    sucesso: {
      open: ({ name, close, description }: sucessoProps) =>
        openModal(
          <CadastroSucesso
            description={description}
            name={name}
            close={close}
          />
        ),
      close: closeModal,
    },
    paymentMethod: {
      open: ({ cards }: PaymentMethodProps) =>
        openModal(<PaymentMethod cards={cards} />),
      close: closeModal,
    },
  } as ModalContextProps;

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isModalOpen && modal}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
