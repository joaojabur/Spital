import 'package:Spital/Screens/Shared/Widgets/TextField/text_field.dart';
import 'package:Spital/core/core.dart';
import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/screens/Login/controller/controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

import 'package:provider/provider.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late LoginController loginController = LoginController();
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.height;
    loginController.authController = Provider.of<AuthController>(context);
    return Scaffold(
        body: NestedScrollView(
      headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
        return <Widget>[];
      },
      body: Container(
        child: Observer(builder: (_) {
          if (loginController.logged) {
            SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
              Navigator.popAndPushNamed(context, '/splash');
            });
          }
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                margin: EdgeInsets.only(right: 180),
                child: Text(
                  "Entrar",
                  style: AppTextStyles.titleBold,
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
                child: TextFormFieldPage(
                  erroText: loginController.validateEmail,
                  labeltext: 'Email',
                  onchanged: loginController.changeEmail,
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
                child: TextFormFieldPage(
                  obscureText: true,
                  erroText: loginController.validatePassWord,
                  labeltext: 'senha',
                  onchanged: loginController.changePassword,
                ),
              ),
              Center(
                child: SizedBox(
                  child: Container(
                    margin: EdgeInsets.only(
                      top: height * 0.05,
                    ),
                    padding: EdgeInsets.symmetric(
                      vertical: height * 0.015,
                      horizontal: width * 0.16,
                    ),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        color: AppColors.blueT100),
                    child: Text(
                      "Logar",
                      style: AppTextStyles.warningTitle,
                    ),
                  ),
                ),
              )
            ],
          );
        }),
      ),
    ));
  }
}
