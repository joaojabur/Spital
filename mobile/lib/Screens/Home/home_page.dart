import 'package:Spital/Screens/Home/Widget/TabPages/TabPageCalendar/page_calendar.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/page_home.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPagePerson/page_person.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/page_seach.dart';
import 'package:Spital/core/core.dart';
import 'package:Spital/screens/Home/controller/home_controller.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';

import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin {
  late HomeController controller;

  @override
  void initState() {
    super.initState();
    controller = HomeController(
        length: 4,
        tickerProvider: this
    );
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);
    SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(statusBarColor: Colors.transparent));
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: Colors.white,
      body: TabBarView(
        physics: NeverScrollableScrollPhysics(),
        children: <Widget>[
          PageHome(),
          PageSeach(),
          PageCalendar(),
          PagePerson(),
        ],
        controller: controller.tabController,
        ),
        bottomNavigationBar: Observer( builder: (_){
          int? index = controller.tabIndex;
          return Container(
            padding: EdgeInsets.only(
              bottom: height * 0.02, 
              right: width * 0.060, 
              left: width * 0.060
            ),
            child: Container(
              padding: EdgeInsets.only(
                right: width * 0.01,
                left: width * 0.01,
                top: height * 0.01,
                bottom: height * 0.01
              ),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: Colors.white,
                border: Border.all(width: 1, color: Colors.black26),
              ),
              child: TabBar(
                    unselectedLabelColor:
                    AppColors.darkblueTransparent, //cor quando não selecionado
                    indicator: UnderlineTabIndicator(
                    borderSide: BorderSide(
                      color: Colors.transparent
                    )
                  ),
                  labelColor: Colors.white,
                  tabs: <Widget>[
                    Tab(
                      child: Container(
                        height: height * 0.5,
                        width: width * 0.3,
                        decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                          color: index == 0 ? AppColors.darkblueTransparent : Colors.white
                        ),
                        child: Icon(
                          Ionicons.home,
                          size: 24,
                        ),
                      ),
                    ),
                    Tab(
                      child: Container(
                        height: height * 0.5,
                        width: width * 0.3,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(100),
                          color: index == 1 ? AppColors.darkblueTransparent : Colors.white
                        ),
                        child: Icon(
                          Ionicons.search,
                          size: 24,
                        ),
                      ),
                    ),
                    Tab(
                      child: Container(
                      height: height * 0.5,
                      width: width * 0.3,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        color: index == 2 ? AppColors.darkblueTransparent : Colors.white
                      ),
                      child: Icon(
                          Ionicons.calendar,
                          size: 24,
                        ),
                      ),
                    ),
                    Tab(
                      child: Container(
                      height: height * 0.5,
                      width: width * 0.3,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        color: index == 3 ? AppColors.darkblueTransparent : Colors.white
                      ),
                      child: Icon(
                          Ionicons.person,
                          size: 24,
                        ),
                      ),
                    ),
                  ],
                  controller: controller.tabController,
                  onTap: controller.changeTabIndex,
                )
            )
          );
      }),
    );
  }
}
