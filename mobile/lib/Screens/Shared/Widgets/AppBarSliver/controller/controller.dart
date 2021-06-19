import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class SliverAppBarController = _SliverAppBarControllerBase with _$SliverAppBarController;

abstract class _SliverAppBarControllerBase with Store {
  @observable
  bool isExpanded = true;

  changeExpanded(bool value){
    isExpanded = value;
  }
}