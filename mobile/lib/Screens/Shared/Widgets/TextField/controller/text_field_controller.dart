import 'package:mobx/mobx.dart';
part 'text_field_controller.g.dart';

class TextFieldController = _TextFieldControllerBase with _$TextFieldController;

abstract class _TextFieldControllerBase with Store {
  @observable
  bool obscure = true;
  @action
  toggleObscure() {
    obscure = !obscure;
  }
}
