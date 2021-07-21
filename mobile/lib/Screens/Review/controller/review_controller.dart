import 'package:Spital/Screens/Review/controller/review_repository.dart';
import 'package:Spital/Screens/Shared/Models/review_model.dart';
import 'package:mobx/mobx.dart';
part 'review_controller.g.dart';

class ReviewController = _ReviewControllerBase with _$ReviewController;

abstract class _ReviewControllerBase with Store {
  ReviewRepository repository = ReviewRepository();

  @observable
  ObservableList<ReviewModel> reviews = ObservableList<ReviewModel>();

  Future<String> loadReviews(int medicID) async {
    ResponseReview response = await repository.loadReviews(medicID);

    if (response.error) {
      return response.message!;
    }

    reviews = response.reviews!.asObservable();

    print(response.reviews!.asObservable());
    return "";
  }
}
