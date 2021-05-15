import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class LoginController extends _LoginControllerBase with _$LoginController {
  LoginController(AuthController auth){
    super._authController = auth;
  }
}

abstract class _LoginControllerBase with Store {
  AuthController? _authController;

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
    String? response = await _authController!.login(email, password);

    if (response.isEmpty){
      logged = true;
    }
  }
}