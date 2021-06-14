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
  ObservableList<bool> isOpen =
      ObservableList<bool>.of([false, false, false, false]);
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
  changeBirthDate(String value) {
    birthdate = value;
  }

  String validateFirstName() {
    if (firstName.isEmpty) {
      return "este campo é obrigatório";
    }
    return "";
  }

  String validateLastName() {
    if (lastName.isEmpty) {
      return "este campo é obrigatório";
    }
    return "";
  }

  String validateNameCompleted() {
    if ((firstName == "") && (lastName == "")) {
      return "true";
    }
    return "Erro";
  }

  String validateEmail() {
    if (email.isEmpty) {
      return "este campo é obrigatório ";
    } else if (!email.contains("@")) {
      return "este não é um email valido";
    }
    return "";
  }

  String validatePassWord() {
    if (password!.isEmpty) {
      return "este campo é obrigatório";
    } else if (password!.length <= 7) {
      return "A senha precisa conter no minimo 8 caracteres";
    }
    return "";
  }

  String validateConfirmPassWord() {
    if (confirmPassword == password) {
      return "";
    } else if (confirmPassword!.isEmpty) {
      return "este campo é obrigatório";
    }
    return "senha não coincide";
  }

  String validateCredenciais() {
    if ((validateEmail() == "") &&
        (validatePassWord() == "") &&
        (validateConfirmPassWord() == "")) {
      return "";
    }
    return "Erro";
  }

  String validatePhoneNumber() {
    if (phoneNumber.isEmpty) {
      return "este campo é obrigatório";
    } else if (phoneNumber.length < 11) {
      return "Número de telefone invalido";
    }
    return "";
  }

  String validateBirthDate() {
    if (birthdate.isEmpty) {
      return "este campo é obrigatório";
    }
    return "";
  }

  String validateCadastro() {
    if ((validateCredenciais() == "") &&
        (validateNameCompleted() == "") &&
        (validatePhoneNumber() == "") &&
        (validateBirthDate() == "")) {
      return "";
    }
    return "Erro";
  }
}
