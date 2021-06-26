import 'package:Spital/Screens/Home/home_page.dart';
import 'package:Spital/Screens/Login/login_page.dart';
import 'package:Spital/Screens/Logon/logon.dart';
import 'package:Spital/Screens/Register/register_page.dart';
import 'package:Spital/Screens/Splash/splash.dart';
import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

class AppWidget extends StatelessWidget {
  Widget initialize(BuildContext context) {
    AuthController controller = Provider.of<AuthController>(context);

    if (controller.isAuthenticated) {
      SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
        Navigator.pushReplacementNamed(context, '/');
      });
      return Scaffold(
        body: SplashPage(),
      );
    }
    return Scaffold(
        body: Center(
            child: FutureBuilder(
      future: controller.getToken(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (controller.isAuthenticated) {
            SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
              Navigator.pushReplacementNamed(context, '/'); //muda para /
            });
            return SplashPage();
          } else {
            SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
              Navigator.pushReplacementNamed(context, '/logon');
            });
            return SplashPage();
          }
        } else {
          return SplashPage();
        }
      },
    )));
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          Provider<AuthController>(
            create: (_) => AuthController(),
          )
        ],
        child: MaterialApp(
          title: "Spital",
          debugShowCheckedModeBanner: false,
          initialRoute: '/splash',
          routes: {
            '/splash': (context) => initialize(context),
            '/': (context) => HomePage(),
            '/logon': (context) => HomePage(),
            '/login': (context) => LoginPage(),
            '/resgister': (context) => RegisterPage(),
          },
        ));
  }
}
