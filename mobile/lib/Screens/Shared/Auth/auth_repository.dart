import 'package:Spital/Screens/Shared/Models/user_model.dart';
import 'package:Spital/Screens/Shared/services/dio_instance.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart'
    as secureStorage;

class LoginResponse {
  final bool error;
  final String? message;
  final UserModel? user;

  LoginResponse({required this.error, this.user, this.message});
}

class AuthRepository {
  final storage = new secureStorage.FlutterSecureStorage();
  final Dio dio = DioInstace.dio;
  Future<LoginResponse> login(String email, String password) async {
    try {
      Map<String, String> data = {"email": email, "password": password};
      final response = await dio.post('/clients/login',
          data: data,
          options: Options(
            followRedirects: false,
            validateStatus: (status) {
              return status! < 500;
            },
          ));

      int userID = response.data["id"];
      String token = response.data["token"];
      bool confirmed = response.data["confirmed"];

      await storage.write(key: "access-token", value: token);

      return LoginResponse(
          error: false, user: await getUserData(userID, confirmed));
    } catch (error) {
      return LoginResponse(error: true, message: "Ocorreu um erro");
    }
  }

  Future<LoginResponse> loginWithToken(String token) async {
    try {
      final response = await dio.get('/clients/auth',
          options: Options(
              followRedirects: false,
              validateStatus: (status) {
                return status! < 500;
              },
              headers: {'authorization': token}));

      int userID = response.data["userID"];
      bool auth = response.data["auth"];
      bool confirmed = response.data["confirmed"];

      if (auth) {
        return LoginResponse(
            error: false, user: await getUserData(userID, confirmed));
      }

      await storage.delete(key: 'access-token');

      return LoginResponse(error: true, message: "Token inválido");
    } catch (error) {
      return LoginResponse(error: true, message: "Ocorreu um erro");
    }
  }

  Future<UserModel> getUserData(int id, bool confirmed) async {
    final response = await dio.get('/clients?id=$id');
    var data = Map<String, dynamic>.from(response.data);

    data['image'] = "https://wallpaperaccess.com/full/1604594.jpg";
    data['confirmed'] = confirmed;
    return UserModel.fromMap(data);
  }

  Future<void> logout() async {
    await storage.deleteAll();
  }
}
