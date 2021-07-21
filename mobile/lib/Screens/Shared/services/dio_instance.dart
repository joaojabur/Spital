import 'package:dio/dio.dart';

class DioInstace {
  static Dio dio = Dio(BaseOptions(baseUrl: "http://192.168.1.7:3333"));
}
