import 'package:mobx/mobx.dart';
part 'make_review_page_controller.g.dart';

class MakeReviewPageController = _MakeReviewPageControllerBase with _$MakeReviewPageController;

abstract class _MakeReviewPageControllerBase with Store {
  @observable
  double rating = 2.5;

  @observable
  int liked = -1;

  @observable
  String text = "";

  @observable
  int spitalGrade = -1;

  @action
  changeRating(double value) => rating = value;

  @action 
  changeLiked(int value){
    print(value);
    liked = value;
  }

  @action
  changeText(String value) => text = value;

  @action
  changeSpitalGrade(int value) => spitalGrade = value;
}