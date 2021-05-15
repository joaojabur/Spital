import 'package:Spital/Screens/Home/home_page.dart';
import 'package:Spital/screens/Login/LoginPage.dart';
import 'package:Spital/screens/Shared/Auth/auth_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
class AppWidget extends StatelessWidget {
  
  Widget initialize(BuildContext context){
    AuthController controller = Provider.of<AuthController>(context);

    return FutureBuilder(
      future: controller.getToken(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done){
          if (controller.isAuthenticated){
            SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
              Navigator.pushReplacementNamed(context, '/');
            });
            return Scaffold(
              body: Center(
                child: CircularProgressIndicator()
              )
            );
          } else {
            SchedulerBinding.instance!.addPostFrameCallback((timeStamp) {
              Navigator.pushReplacementNamed(context, '/login');
            });
            return Container();
          }
        } else {
          return Scaffold(
            body: Center(
              child: CircularProgressIndicator()
            )
          );
        }
      },
    );
  }
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          Provider<AuthController>(create: (_) => AuthController(),)
        ],
        child: MaterialApp(
        title: "Spital",
        debugShowCheckedModeBanner: false,
        initialRoute: '/splash',
        routes: {
          '/splash' : (context) => initialize(context),
          '/': (context) => HomePage(),
          '/login' : (context) => LoginPage(),
        },
      )
    );
  }
}
