// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'text_field_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$TextFieldController on _TextFieldControllerBase, Store {
  final _$obscureAtom = Atom(name: '_TextFieldControllerBase.obscure');

  @override
  bool get obscure {
    _$obscureAtom.reportRead();
    return super.obscure;
  }

  @override
  set obscure(bool value) {
    _$obscureAtom.reportWrite(value, super.obscure, () {
      super.obscure = value;
    });
  }

  final _$_TextFieldControllerBaseActionController =
      ActionController(name: '_TextFieldControllerBase');

  @override
  dynamic toggleObscure() {
    final _$actionInfo = _$_TextFieldControllerBaseActionController.startAction(
        name: '_TextFieldControllerBase.toggleObscure');
    try {
      return super.toggleObscure();
    } finally {
      _$_TextFieldControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
obscure: ${obscure}
    ''';
  }
}
