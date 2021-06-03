import 'package:Spital/Screens/Shared/Widgets/AppBarSliver/sliver_appbar.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';

import 'package:ionicons/ionicons.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: NestedScrollView(
        headerSliverBuilder: (context, condition) {
          return <Widget>[
            SliverPage(
                topleftIcon: false,
                iconAddRight: Ionicons.chevron_back_outline,
                topRightIcon: false,
                title: "Resgistrar",
                height: height,
                width: width)
          ];
        },
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 100),
                child: Container(
                  margin: EdgeInsets.only(right: 80, bottom: 30),
                  child: Text(
                    "1.Quem é você",
                    style: AppTextStyles.titleBold,
                  ),
                ),
              ),
              Container(
                  margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
                  child: TextField(
                    decoration: InputDecoration(
                        labelText: 'Email',
                        labelStyle: TextStyle(color: AppColors.gray),
                        border: OutlineInputBorder(),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue)),
                        errorBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue)),
                        disabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue))),
                    //controller:
                  )),
              Container(
                  margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
                  child: TextField(
                    decoration: InputDecoration(
                        labelText: 'Senha',
                        labelStyle: TextStyle(color: AppColors.gray),
                        border: OutlineInputBorder(),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue)),
                        errorBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue)),
                        disabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: AppColors.blue))),
                    //controller:
                  )),
              Container(
                margin: EdgeInsets.only(
                  top: height * 0.05,
                ),
                padding: EdgeInsets.symmetric(
                  horizontal: width * 0.27,
                ),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: AppColors.blueT100),
                child: TextButton(
                  onPressed: () {},
                  child: Text(
                    "Próximo",
                    style: AppTextStyles.warningTitle,
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
