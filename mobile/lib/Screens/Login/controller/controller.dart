import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class LoginController = _LoginControllerBase with _$LoginController;

abstract class _LoginControllerBase with Store {
  AuthController? authController;

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
  login() async {
    String response = await authController!.login(email, password);

    if (response.isEmpty){
      logged = true;
    }

    print(response);

    return response;
  }
}