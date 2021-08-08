import 'package:Spital/Screens/MakeReview/controller/make_review_repository.dart';
import 'package:mobx/mobx.dart';
part 'make_review_page_controller.g.dart';

class MakeReviewPageController = _MakeReviewPageControllerBase with _$MakeReviewPageController;

abstract class _MakeReviewPageControllerBase with Store {
  MakeReviewRepository _repository = MakeReviewRepository();

  @observable
  double rating = 2.5;

  @observable
  String text = "";

  @observable
  int spitalGrade = -1;

  @action
  changeRating(double value) => rating = value;

  @action
  changeText(String value) => text = value;

  @action
  changeSpitalGrade(int value) => spitalGrade = value;

  Future<bool> makeReview(int medicID, int clientID) async {
    return await _repository.makeReview(clientID, medicID, text, rating);
  }
}