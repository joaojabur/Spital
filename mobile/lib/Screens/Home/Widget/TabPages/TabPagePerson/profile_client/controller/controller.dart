import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class ControllerEditdataBaseProfileClient = _ControllerEditdataBaseProfileClientBase
    with _$ControllerEditdataBaseProfileClient;

abstract class _ControllerEditdataBaseProfileClientBase with Store {
  @observable
  bool edit = false;
  @action
  changeValue() {
    edit = true;
    print(edit);
  }

  @action
  changeOff() {
    edit = false;
  }
}
