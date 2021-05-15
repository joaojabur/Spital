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
    loginController.authController = Provider.of<AuthController>(context);
    return Scaffold(
      body: Observer(builder: (_){
        if (loginController.logged){
          SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
            Navigator.popAndPushNamed(context, '/splash');
          });
        }
        return Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              onChanged: loginController.changeEmail,
            ),
            TextField(
              onChanged: loginController.changePassword,
            ),
            ElevatedButton(
              child: Text("Logar"),
              onPressed: (){
                loginController.login();
              },
            )
          ],
        );
      })
    );
  }
}