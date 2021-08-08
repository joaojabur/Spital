import 'package:Spital/Screens/Shared/services/dio_instance.dart';
import 'package:dio/dio.dart';

class MakeReviewRepository {
  Dio dio = DioInstace.dio;
  Future<bool> makeReview(int clientID, int medicID, String description, double stars) async {
    try {
      final response = await dio.post('/reviews?clientID=$clientID&medicID=$medicID',
        data: {
          "stars": stars,
          "description": description
        }
      );

      print(response);

      if (response.data["success"] == true){
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}