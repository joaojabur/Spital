import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:mobx/mobx.dart';
part 'consulta_controller.g.dart';

class CalendarController = _CalendarControllerBase with _$CalendarController;

abstract class _CalendarControllerBase with Store {
  ObservableList<bool> isColor = ObservableList<bool>.of([
    true,
    false,
    false,
  ]);

  @action
  changeOnColor(int i) {
    isColor[i] = true;
  }

  @action
  changeOffColor(int i) {
    isColor[i] = false;
  }
}
