// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'home_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$HomeController on _HomeControllerBase, Store {
  final _$tabControllerAtom = Atom(name: '_HomeControllerBase.tabController');

  @override
  TabController? get tabController {
    _$tabControllerAtom.reportRead();
    return super.tabController;
  }

  @override
  set tabController(TabController? value) {
    _$tabControllerAtom.reportWrite(value, super.tabController, () {
      super.tabController = value;
    });
  }

  final _$tabIndexAtom = Atom(name: '_HomeControllerBase.tabIndex');

  @override
  int? get tabIndex {
    _$tabIndexAtom.reportRead();
    return super.tabIndex;
  }

  @override
  set tabIndex(int? value) {
    _$tabIndexAtom.reportWrite(value, super.tabIndex, () {
      super.tabIndex = value;
    });
  }

  final _$_HomeControllerBaseActionController =
      ActionController(name: '_HomeControllerBase');

  @override
  void changeTabIndex(int index) {
    final _$actionInfo = _$_HomeControllerBaseActionController.startAction(
        name: '_HomeControllerBase.changeTabIndex');
    try {
      return super.changeTabIndex(index);
    } finally {
      _$_HomeControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
tabController: ${tabController},
tabIndex: ${tabIndex}
    ''';
  }
}
