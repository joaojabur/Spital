import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class PageSearchController = _PageSearchControllerBase with _$PageSearchController;

abstract class _PageSearchControllerBase with Store {
  @observable
  int lastSize = 0;

  @observable
  int pages = 0;

  @observable
  int distance = 9999;

  @observable
  int price = 500;

  @observable
  String? name;

  @action
  changeLastSize(int value) => lastSize = value;

  @action
  changeDistance(int value) => distance = value;

  @action
  changeName(String value) => name = value;

  @action
  changePage(int value){
    pages = value;
    print("Offset $value");
  }

  @action
  changePrice(int value) => price = value;
}