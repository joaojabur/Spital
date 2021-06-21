import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
part 'register_controller.g.dart';

class RegisterController extends _RegisterControllerBase
    with _$RegisterController {
  RegisterController({required length, required tickerProvider}) {
    super.tabRegisterController =
        TabController(length: length, vsync: tickerProvider);
    super.tabRegisterIndex = 0;
  }
}

abstract class _RegisterControllerBase with Store {
  @observable
  String firstName = "";
  @observable
  bool obscureText = true;
  @observable
  ObservableList<bool> isOpen = ObservableList<bool>.of([
    false,
    false,
    false,
  ]);
  @observable
  String lastName = "";
  @observable
  String email = "";
  @observable
  String phoneNumber = "";

  String? password = "";
  @observable
  String? confirmPassword = "";

  @observable
  TabController? tabRegisterController;
  @observable
  int? tabRegisterIndex;
  @observable
  String birthdate = "";

  @action
  changePageRegister(int value) {
    tabRegisterController!.index = value;
    tabRegisterIndex = value;
  }

  @action
  changeFirstname(String value) => firstName = value;
  @action
  changelastName(String value) => lastName = value;

  @action
  changeEmail(String value) {
    email = value;
  }

  @action
  changePassoword(String value) {
    password = value;
  }

  @action
  changeConfirmPassoword(String value) {
    confirmPassword = value;
  }

  @action
  changePhoneNumber(String value) {
    phoneNumber = value;
  }

  @action
  changeIsOpen(int i) {
    isOpen[i] = !isOpen[i];
  }

  @action
  changeIsClosed(int i) {
    isOpen[i] = false;
  }

  @action
  changeBirthDate(String value) {
    birthdate = value;
  }

  String? validateFirstName(String? value) {
    if (firstName.isEmpty) {
      return "Este campo é obrigatorio";
    } else if (firstName.length <= 2) {
      return ("O nome deve conter no mínimo 3 letras");
    }
    return null;
  }

  String? validateLastName(String? value) {
    if (lastName.isEmpty) {
      return "Este campo é obrigatorio";
    } else if (lastName.length <= 2) {
      return ("O nome deve conter no mínimo 3 letras");
    }
    return null;
  }

  String? validateEmail(String? value) {
    if (email.isEmpty) {
      return "Este campo é obrigatorio";
    } else if (!email.contains("@")) {
      return "este não é um email valido";
    }
    return null;
  }

  String? validatePassWord(String? value) {
    if (password!.isEmpty) {
      return "Este campo é obrigatorio";
    } else if (password!.length <= 7) {
      return "A senha devem conter no mínimo 8 caracteres";
    }
    return null;
  }

  String? validateConfirmPassWord(String? value) {
    if ((confirmPassword == password) && (confirmPassword != "")) {
      return null;
    } else if (confirmPassword!.isEmpty) {
      return "Este campo é obrigatorio";
    }
    return "As senhas devem ser iguais";
  }

  String? validatePhoneNumber(String? value) {
    if (phoneNumber.isEmpty) {
      return "este campo é obrigatório";
    } else if (phoneNumber.length < 15) {
      return "O número é inválido ";
    }
    return null;
  }

  String? validateBirthDate(String? value) {
    if (birthdate.isEmpty) {
      return "Este campo é obrigatorio";
    } else if ((birthdate.length < 10) || (birthdate.length < 1)) {
      return "Esta data é inválida";
    }
    return null;
  }
}
