import 'package:Spital/Screens/Shared/Models/review_model.dart';
import 'package:Spital/Screens/Shared/services/dio_instance.dart';
import 'package:dio/dio.dart';

class ResponseReview {
  final bool error;
  final String? message;
  final List<ReviewModel>? reviews;

  ResponseReview({required this.error, this.message, this.reviews});
}

class ReviewRepository {
  final Dio dio = DioInstace.dio;

  Future<ResponseReview> loadReviews(int medicID) async {
    try {
      List<ReviewModel> reviews = [];
      final response = await dio.get('/reviews?medicID=1',
          options: Options(
            followRedirects: false,
            validateStatus: (status) {
              return status! < 500;
            },
          ));

      for (var review in List.from(response.data)) {
        reviews.add(ReviewModel.fromMap(review));
      }

      return ResponseReview(error: false, reviews: reviews);
    } catch (err) {
      return ResponseReview(error: true, message: "Ocorreu um erro.");
    }
  }
}
