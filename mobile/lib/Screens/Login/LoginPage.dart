import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/screens/Login/controller/controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late LoginController controller;
  @override
  Widget build(BuildContext context) {
    controller = LoginController(
      Provider.of<AuthController>(context)
    );
    return Scaffold(
      body: Observer(builder: (_){
        if (controller.logged){
          Navigator.popAndPushNamed(context, '/');
        }
        return Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              onChanged: controller.changeEmail,
            ),
            TextField(
              onChanged: controller.changePassword,
            ),
            ElevatedButton(
              child: Text("Logar"),
              onPressed: controller.login,
            )
          ],
        );
      })
    );
  }
}