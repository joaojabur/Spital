import 'package:mobx/mobx.dart';
part 'register_controller.g.dart';

class Controller = ControllerBase with _$Controller;

abstract class ControllerBase with Store {
  @observable
  var _counter = 0;

  @action
  _incriment() {
    _counter++;
  }
}
