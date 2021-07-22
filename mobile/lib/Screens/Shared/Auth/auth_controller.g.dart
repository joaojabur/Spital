// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$AuthController on _AuthControllerBase, Store {
  final _$dataimagesAtom = Atom(name: '_AuthControllerBase.dataimages');

  @override
  ObservableList<String> get dataimages {
    _$dataimagesAtom.reportRead();
    return super.dataimages;
  }

  @override
  set dataimages(ObservableList<String> value) {
    _$dataimagesAtom.reportWrite(value, super.dataimages, () {
      super.dataimages = value;
    });
  }

  final _$imagePadraoAtom = Atom(name: '_AuthControllerBase.imagePadrao');

  @override
  String get imagePadrao {
    _$imagePadraoAtom.reportRead();
    return super.imagePadrao;
  }

  @override
  set imagePadrao(String value) {
    _$imagePadraoAtom.reportWrite(value, super.imagePadrao, () {
      super.imagePadrao = value;
    });
  }

  final _$imageActualAtom = Atom(name: '_AuthControllerBase.imageActual');

  @override
  String get imageActual {
    _$imageActualAtom.reportRead();
    return super.imageActual;
  }

  @override
  set imageActual(String value) {
    _$imageActualAtom.reportWrite(value, super.imageActual, () {
      super.imageActual = value;
    });
  }

  final _$userAtom = Atom(name: '_AuthControllerBase.user');

  @override
  UserModel? get user {
    _$userAtom.reportRead();
    return super.user;
  }

  @override
  set user(UserModel? value) {
    _$userAtom.reportWrite(value, super.user, () {
      super.user = value;
    });
  }

  final _$isAuthenticatedAtom =
      Atom(name: '_AuthControllerBase.isAuthenticated');

  @override
  bool get isAuthenticated {
    _$isAuthenticatedAtom.reportRead();
    return super.isAuthenticated;
  }

  @override
  set isAuthenticated(bool value) {
    _$isAuthenticatedAtom.reportWrite(value, super.isAuthenticated, () {
      super.isAuthenticated = value;
    });
  }

  final _$_AuthControllerBaseActionController =
      ActionController(name: '_AuthControllerBase');

  @override
  dynamic changeImage(int i) {
    final _$actionInfo = _$_AuthControllerBaseActionController.startAction(
        name: '_AuthControllerBase.changeImage');
    try {
      return super.changeImage(i);
    } finally {
      _$_AuthControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
dataimages: ${dataimages},
imagePadrao: ${imagePadrao},
imageActual: ${imageActual},
user: ${user},
isAuthenticated: ${isAuthenticated}
    ''';
  }
}
