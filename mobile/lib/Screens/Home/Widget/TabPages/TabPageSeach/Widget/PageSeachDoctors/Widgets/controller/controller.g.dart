// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$ListDoctorController on _ListDoctorControllerBase, Store {
  final _$medicsAtom = Atom(name: '_ListDoctorControllerBase.medics');

  @override
  ObservableList<MedicModel> get medics {
    _$medicsAtom.reportRead();
    return super.medics;
  }

  @override
  set medics(ObservableList<MedicModel> value) {
    _$medicsAtom.reportWrite(value, super.medics, () {
      super.medics = value;
    });
  }

  final _$loadMedicsAsyncAction =
      AsyncAction('_ListDoctorControllerBase.loadMedics');

  @override
  Future loadMedics(String area, Position location, int maxDistance,
      String? name, int offset) {
    return _$loadMedicsAsyncAction
        .run(() => super.loadMedics(area, location, maxDistance, name, offset));
  }

  @override
  String toString() {
    return '''
medics: ${medics}
    ''';
  }
}
