// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'save_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$SaveController on _SaveControllerBase, Store {
  final _$saveAtom = Atom(name: '_SaveControllerBase.save');

  @override
  bool get save {
    _$saveAtom.reportRead();
    return super.save;
  }

  @override
  set save(bool value) {
    _$saveAtom.reportWrite(value, super.save, () {
      super.save = value;
    });
  }

  final _$_SaveControllerBaseActionController =
      ActionController(name: '_SaveControllerBase');

  @override
  dynamic changeValue() {
    final _$actionInfo = _$_SaveControllerBaseActionController.startAction(
        name: '_SaveControllerBase.changeValue');
    try {
      return super.changeValue();
    } finally {
      _$_SaveControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
save: ${save}
    ''';
  }
}
