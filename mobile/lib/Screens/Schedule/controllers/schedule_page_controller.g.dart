// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'schedule_page_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$SchedulePageController on _SchedulePageControllerBase, Store {
  final _$focusedDayAtom = Atom(name: '_SchedulePageControllerBase.focusedDay');

  @override
  DateTime get focusedDay {
    _$focusedDayAtom.reportRead();
    return super.focusedDay;
  }

  @override
  set focusedDay(DateTime value) {
    _$focusedDayAtom.reportWrite(value, super.focusedDay, () {
      super.focusedDay = value;
    });
  }

  final _$medicScheduleAtom =
      Atom(name: '_SchedulePageControllerBase.medicSchedule');

  @override
  ObservableList<ScheduleModel> get medicSchedule {
    _$medicScheduleAtom.reportRead();
    return super.medicSchedule;
  }

  @override
  set medicSchedule(ObservableList<ScheduleModel> value) {
    _$medicScheduleAtom.reportWrite(value, super.medicSchedule, () {
      super.medicSchedule = value;
    });
  }

  final _$currentAppointmentAtom =
      Atom(name: '_SchedulePageControllerBase.currentAppointment');

  @override
  ObservableList<AppointmentModel> get currentAppointment {
    _$currentAppointmentAtom.reportRead();
    return super.currentAppointment;
  }

  @override
  set currentAppointment(ObservableList<AppointmentModel> value) {
    _$currentAppointmentAtom.reportWrite(value, super.currentAppointment, () {
      super.currentAppointment = value;
    });
  }

  final _$consultsTypeAtom =
      Atom(name: '_SchedulePageControllerBase.consultsType');

  @override
  ObservableList<ConsultModel> get consultsType {
    _$consultsTypeAtom.reportRead();
    return super.consultsType;
  }

  @override
  set consultsType(ObservableList<ConsultModel> value) {
    _$consultsTypeAtom.reportWrite(value, super.consultsType, () {
      super.consultsType = value;
    });
  }

  final _$selectedTimeAtom =
      Atom(name: '_SchedulePageControllerBase.selectedTime');

  @override
  String? get selectedTime {
    _$selectedTimeAtom.reportRead();
    return super.selectedTime;
  }

  @override
  set selectedTime(String? value) {
    _$selectedTimeAtom.reportWrite(value, super.selectedTime, () {
      super.selectedTime = value;
    });
  }

  final _$selectedTypeAtom =
      Atom(name: '_SchedulePageControllerBase.selectedType');

  @override
  String? get selectedType {
    _$selectedTypeAtom.reportRead();
    return super.selectedType;
  }

  @override
  set selectedType(String? value) {
    _$selectedTypeAtom.reportWrite(value, super.selectedType, () {
      super.selectedType = value;
    });
  }

  final _$_SchedulePageControllerBaseActionController =
      ActionController(name: '_SchedulePageControllerBase');

  @override
  dynamic changeFocusedDay(DateTime value) {
    final _$actionInfo = _$_SchedulePageControllerBaseActionController
        .startAction(name: '_SchedulePageControllerBase.changeFocusedDay');
    try {
      return super.changeFocusedDay(value);
    } finally {
      _$_SchedulePageControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  dynamic changedSelectedTime(String value) {
    final _$actionInfo = _$_SchedulePageControllerBaseActionController
        .startAction(name: '_SchedulePageControllerBase.changedSelectedTime');
    try {
      return super.changedSelectedTime(value);
    } finally {
      _$_SchedulePageControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  dynamic changeSelectedType(String value) {
    final _$actionInfo = _$_SchedulePageControllerBaseActionController
        .startAction(name: '_SchedulePageControllerBase.changeSelectedType');
    try {
      return super.changeSelectedType(value);
    } finally {
      _$_SchedulePageControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
focusedDay: ${focusedDay},
medicSchedule: ${medicSchedule},
currentAppointment: ${currentAppointment},
consultsType: ${consultsType},
selectedTime: ${selectedTime},
selectedType: ${selectedType}
    ''';
  }
}
