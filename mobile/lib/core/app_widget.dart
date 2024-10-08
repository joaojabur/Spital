import 'package:Spital/Screens/Home/Widget/TabPages/TabPageConsulta/Widget/appointment_details.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/page_seach.dart';
import 'package:Spital/Screens/Home/home_page.dart';
import 'package:Spital/Screens/Login/login_page.dart';
import 'package:Spital/Screens/Logon/logon.dart';
import 'package:Spital/Screens/MakeReview/MakeReviewPage.dart';
import 'package:Spital/Screens/MedicProfile/MedicProfile.dart';
import 'package:Spital/Screens/Payment/PaymentPage.dart';
import 'package:Spital/Screens/Register/register_page.dart';
import 'package:Spital/Screens/Review/ReviewPage.dart';
import 'package:Spital/Screens/Schedule/SchedulePage.dart';
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
            '/medic': (context) => MedicProfile(),
            '/reviews': (context) => ReviewPage(),
            '/schedule': (context) => SchedulePage(),
            '/seach': (context) => PageSeach(),
            '/payment': (context) => PaymentPage(),
            '/appointmentDetails': (context) => AppointmentDetails(),
            '/makeReview': (context) => MakeReviewPage()
          },
        ));
  }
}
