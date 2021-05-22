// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'page_home_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$PageHomeController on _PageHomeControllerBase, Store {
  final _$authControllerAtom =
      Atom(name: '_PageHomeControllerBase.authController');

  @override
  AuthController? get authController {
    _$authControllerAtom.reportRead();
    return super.authController;
  }

  @override
  set authController(AuthController? value) {
    _$authControllerAtom.reportWrite(value, super.authController, () {
      super.authController = value;
    });
  }

  @override
  String toString() {
    return '''
authController: ${authController}
    ''';
  }
}
