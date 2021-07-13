// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'location_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$LocationController on _LocationControllerBase, Store {
  final _$positionAtom = Atom(name: '_LocationControllerBase.position');

  @override
  Position? get position {
    _$positionAtom.reportRead();
    return super.position;
  }

  @override
  set position(Position? value) {
    _$positionAtom.reportWrite(value, super.position, () {
      super.position = value;
    });
  }

  final _$_LocationControllerBaseActionController =
      ActionController(name: '_LocationControllerBase');

  @override
  dynamic setPosition(Position value) {
    final _$actionInfo = _$_LocationControllerBaseActionController.startAction(
        name: '_LocationControllerBase.setPosition');
    try {
      return super.setPosition(value);
    } finally {
      _$_LocationControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
position: ${position}
    ''';
  }
}
