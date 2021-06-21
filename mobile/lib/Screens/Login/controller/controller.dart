import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class LoginController = _LoginControllerBase with _$LoginController;

abstract class _LoginControllerBase with Store {
  GlobalKey<FormState>? form;
  AuthController? authController;
  @observable
  String error = "";
  @observable
  bool logged = false;

  @observable
  String email = "";

  @observable
  String password = "";

  @action
  changeEmail(String value) => email = value;

  @action
  changePassword(String value) => password = value;

  @action
  setError(String value) => error = value;

  @action
  login() async {
    setError('');

    String response = await authController!.login(email, password);

    if (response.isEmpty) {
      logged = true;
    }

    setError(response);

    form?.currentState?.validate();

    return response;
  }
}
