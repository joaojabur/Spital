import 'package:Spital/Screens/Home/Widget/TabPages/TabPageCalendar/page_calendar.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/page_home.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPagePerson/page_person.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/page_seach.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/services.dart';
import 'package:ionicons/ionicons.dart';

import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
        length: 4 //quantidade de botões na bottom
        ,
        vsync: this);
    _tabController.addListener(_handleTabSelection);
  }

  void _handleTabSelection() {
    setState(() {});
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
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
        controller: _tabController,
      ),
      bottomNavigationBar: Container(
        padding: EdgeInsets.only(
            bottom: height * 0.02, right: width * 0.060, left: width * 0.060),
        child: Container(
          padding: EdgeInsets.only(
              right: width * 0.01,
              left: width * 0.01,
              top: height * 0.01,
              bottom: height * 0.01),
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
                    color: Colors
                        .transparent)), //cor da linha inferior quando selecionado
            labelColor: Colors.white, //cor selecionado

            tabs: <Widget>[
              Tab(
                child: Container(
                  height: height * 0.5,
                  width: width * 0.3,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(100),
                      color: _tabController.index == 0
                          ? AppColors.darkblueTransparent
                          : Colors.white),
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
                      color: _tabController.index == 1
                          ? AppColors.darkblueTransparent
                          : Colors.white),
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
                      color: _tabController.index == 2
                          ? AppColors.darkblueTransparent
                          : Colors.white),
                  child: Icon(
                    Ionicons.calendar,
                    size: 24,
                  ),
                ),
              ),

              /* Tab(
                icon: Icon(Icons.sms, size: 30),
              ),*/
              Tab(
                child: Container(
                  height: height * 0.5,
                  width: width * 0.3,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(100),
                      color: _tabController.index == 3
                          ? AppColors.darkblueTransparent
                          : Colors.white),
                  child: Icon(
                    Ionicons.person,
                    size: 24,
                  ),
                ),
              ),
            ],
            controller: _tabController,
          ),
        ),
      ),
    );
  }
}
