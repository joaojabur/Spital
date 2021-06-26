import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
part 'home_controller.g.dart';

class HomeController extends _HomeControllerBase with _$HomeController {
  HomeController({ required length, required tickerProvider }){
    super.tabController = TabController(
      length: length,
      vsync: tickerProvider
    );
    super.tabIndex = 0;
  }
}

abstract class _HomeControllerBase with Store {
  @observable
  TabController? tabController;

  @observable
  int? tabIndex;

  @action
  void changeTabIndex(int index){
    tabIndex = index;
  }
}