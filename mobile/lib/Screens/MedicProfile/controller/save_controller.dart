import 'package:mobx/mobx.dart';
part 'save_controller.g.dart';

class SaveController = _SaveControllerBase with _$SaveController;

abstract class _SaveControllerBase with Store {
  @observable
  bool save = false;
  @action
  changeValue() {
    save = !save;
    print(save);
  }
}
