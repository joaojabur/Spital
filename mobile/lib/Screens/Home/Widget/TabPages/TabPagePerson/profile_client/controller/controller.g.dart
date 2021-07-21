// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$ControllerEditdataBaseProfileClient
    on _ControllerEditdataBaseProfileClientBase, Store {
  final _$editAtom =
      Atom(name: '_ControllerEditdataBaseProfileClientBase.edit');

  @override
  bool get edit {
    _$editAtom.reportRead();
    return super.edit;
  }

  @override
  set edit(bool value) {
    _$editAtom.reportWrite(value, super.edit, () {
      super.edit = value;
    });
  }

  final _$_ControllerEditdataBaseProfileClientBaseActionController =
      ActionController(name: '_ControllerEditdataBaseProfileClientBase');

  @override
  dynamic changeValue() {
    final _$actionInfo =
        _$_ControllerEditdataBaseProfileClientBaseActionController.startAction(
            name: '_ControllerEditdataBaseProfileClientBase.changeValue');
    try {
      return super.changeValue();
    } finally {
      _$_ControllerEditdataBaseProfileClientBaseActionController
          .endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
edit: ${edit}
    ''';
  }
}
