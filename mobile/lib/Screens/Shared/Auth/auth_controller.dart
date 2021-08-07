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
  ObservableList<String> dataimages = ObservableList<String>.of([
    "images/perfil/1.jpg",
    "images/perfil/2.jpg",
    "images/perfil/3.jpg",
    "images/perfil/4.jpg",
    "images/perfil/5.jpg",
    "images/perfil/6.jpg",
  ]);

  @observable
  String imagePadrao = "images/perfil/7.png";
  @observable
  String imageActual = "images/perfil/7.png";

  @observable
  UserModel? user;

  @observable
  bool isAuthenticated = false;

  Future<String> getToken() async {
    var token = await storage.read(key: 'access-token');

    if (token?.isNotEmpty ?? false) {
      var response = await _authRepository.loginWithToken(token!);

      if (response.error) {
        return 'Cannot Login With Token';
      }

      user = response.user;
      isAuthenticated = true;

      return '';
    }

    return 'Cannot Login With Token';
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

  Future<void> logout() async {
    await _authRepository.logout();

    user = null;
  }

  @action
  changeImage(int i) {
    imagePadrao = imageActual;
    imageActual = dataimages[i];
    dataimages[i] = imagePadrao;
    print("mudado");
  }
}
