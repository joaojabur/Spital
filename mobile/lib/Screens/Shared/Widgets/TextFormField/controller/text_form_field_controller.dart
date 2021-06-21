import 'package:mobx/mobx.dart';
part 'text_form_field_controller.g.dart';

class TextFieldController = _TextFieldControllerBase with _$TextFieldController;

abstract class _TextFieldControllerBase with Store {
  @observable
  bool obscure = true;
  @observable
  bool obscure2 = true;
  @observable
  @action
  toggleObscure() {
    obscure = !obscure;
  }

  @action
  toggleObscure2() {
    obscure2 = !obscure2;
  }
}
