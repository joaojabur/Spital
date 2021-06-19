import 'package:Spital/Screens/Shared/Auth/auth_repository.dart';
import 'package:Spital/Screens/Shared/Models/user_model.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobx/mobx.dart';
part 'auth_controller.g.dart';

class AuthController extends _AuthControllerBase with _$AuthController {
  AuthController() {
    super.user = null;
  }
}

abstract class _AuthControllerBase with Store {
  final storage = new FlutterSecureStorage();
  final _authRepository = new AuthRepository();

  @observable
  UserModel? user;

  @observable
  bool isAuthenticated = false;

  Future<void> getToken() async {
    var token = await storage.read(key: 'access-token');

    if (token?.isNotEmpty ?? false) {
      var response = await _authRepository.loginWithToken(token!);

      if (response.error) {
        return;
      }

      user = response.user;
      isAuthenticated = true;
    }
  }

  Future<String> login(String email, String password) async {
    var response = await _authRepository.login(email, password);

    if (response.error) {
      return response.message!;
    } else {
      user = response.user;
      isAuthenticated = true;
      return '';
    }
  }
}
