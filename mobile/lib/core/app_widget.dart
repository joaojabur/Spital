import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/profile_medic/profile_agend.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/page_seach.dart';
import 'package:Spital/Screens/Home/home_page.dart';
import 'package:Spital/Screens/Login/login_page.dart';
import 'package:Spital/Screens/Logon/logon.dart';
import 'package:Spital/Screens/Register/register_page.dart';
import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/Screens/Shared/controllers/location_controller.dart';
import 'package:Spital/Screens/Splash/splash.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

class AppWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          Provider<AuthController>(
            create: (context) => AuthController(),
          ),
          Provider<LocationController>(
              create: (context) => LocationController())
        ],
        child: MaterialApp(
          title: "Spital",
          debugShowCheckedModeBanner: false,
          initialRoute: '/splash',
          routes: {
            '/splash': (context) => SplashPage(),
            '/': (context) => HomePage(),
            '/logon': (context) => LogonPage(),
            '/login': (context) => LoginPage(),
            '/resgister': (context) => RegisterPage(),
            '/medic': (context) => ProfileAgend(),
            '/client': (context) => ProfileAgend(),
            '/seach': (context) => PageSeach(),
          },
        ));
  }
}
