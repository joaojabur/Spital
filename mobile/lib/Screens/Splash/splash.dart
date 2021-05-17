import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';

class SplashPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle(statusBarColor: Colors.transparent));
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Container(
        color: AppColors.blueTransparent,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset("images/splash.svg"),
            Padding(
              padding: EdgeInsets.only(
                  left: width * 0.1, right: width * 0.1, top: height * 0.05),
              child: LinearProgressIndicator(
                value: 0.3,
                backgroundColor: Colors.white,
                valueColor: AlwaysStoppedAnimation<Color>(AppColors.blue),
              ),
            )
          ],
        ),
      ),
    );
  }
}
