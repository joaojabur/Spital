import 'package:Spital/Screens/Register/TabRegister/TabRegisterFifth/tab_page_fifth.dart';
import 'package:Spital/Screens/Register/TabRegister/TabRegisterFirst/page_register_first.dart';
import 'package:Spital/Screens/Register/TabRegister/TabRegisterFourth/tab_page_fourth.dart';
import 'package:Spital/Screens/Register/TabRegister/TabRegisterThird/tab_page_third.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSliver/sliver_appbar.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';
import 'TabRegister/TabRegisterSecond/page_register_second.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage>
    with SingleTickerProviderStateMixin {
  late RegisterController register_controller;

  @override
  void initState() {
    super.initState();
    register_controller = RegisterController(length: 5, tickerProvider: this);
  }

  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<RegisterController>(create: (_) => register_controller)
      ],
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        body: NestedScrollView(
          headerSliverBuilder: (context, condition) {
            return <Widget>[
              AppBarSliverPage(
                topleftIcon: false,
                title: "Crie aqui\n sua conta!",
                iconLeft: Ionicons.chevron_back_outline,
                image: "images/register.svg",
              )
            ];
          },
          body: TabBarView(
            physics: NeverScrollableScrollPhysics(),
            children: <Widget>[
              PageRegisterFirst(),
              PageRegisterSecond(),
              PageRegisterThird(),
              PageRegisterFourth(),
              PageRegisterFifth(),
            ],
            controller: register_controller.tabRegisterController,
          ),
        ),
      ),
    );
  }
}
