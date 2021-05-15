import 'dart:io';

import 'package:Spital/screens/Shared/Models/user_model.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart' as secureStorage;

class LoginResponse {
  final bool error;
  final String? message;
  final UserModel? user;

  LoginResponse({
    required this.error, 
    this.user,
    this.message
  });
}

class AuthRepository {
  final storage = new secureStorage.FlutterSecureStorage();
  final Dio dio = Dio(BaseOptions(baseUrl: "http://192.168.1.9:3333"));
  Future<LoginResponse> login(String email,String password) async {
    try {
      final response = await dio.post('/clients/login',
        data: {
          "email": email,
          "password": password
        }
      );

      int userID = response.data["id"];
      String token = response.data["token"];
      bool confirmed = response.data["confirmed"];

      await storage.write(key: "access-token", value: token);

      return LoginResponse(
        error: false,
        user: await getUserData(userID, confirmed)
      );
    } catch(error){
      return LoginResponse(
        error: true,
        message: "Ocorreu um erro"
      );
    }
  }

  Future<LoginResponse> loginWithToken(String token) async {
    try {
      final response = await dio.post('/clients/auth', options: Options(
        headers: {
          HttpHeaders.authorizationHeader: token
        }
      ));

      int userID = response.data["id"];
      bool auth = response.data["auth"];
      bool confirmed = response.data["confirmed"];

      if (auth){
        return LoginResponse(
          error: false,
          user: await getUserData(userID, confirmed)
        );
      }

      await storage.delete(key: 'token');
      
      return LoginResponse(
        error: true,
        message: "Token inválido"
      );

    } catch(error){
       return LoginResponse(
        error: true,
        message: "Ocorreu um erro"
      );
    }
  }

  Future<UserModel> getUserData(int id, bool confirmed) async {
    final response = await dio.get('/clients?id=$id');

    response.data["confirmed"] = confirmed;

    return UserModel.fromJson(response.data);
  }
}