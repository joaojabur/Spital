import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class SplashPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    AuthController controller = Provider.of<AuthController>(context);

    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent
      )
    );

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      body: FutureBuilder(
        future: controller.getToken(),
        builder: (context, snapshot){
          if (snapshot.connectionState == ConnectionState.done){
            if(snapshot.data != ''){
              SchedulerBinding.instance!.addPostFrameCallback((_) {
                 Navigator.pushReplacementNamed(context, '/logon');
              });
            } else {
              SchedulerBinding.instance!.addPostFrameCallback((_) {
                 Navigator.pushReplacementNamed(context, '/');
              });
            }

          }
          return Container(
            color: AppColors.blueTransparent,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SvgPicture.asset("images/splash.svg"),
                Padding(
                  padding: EdgeInsets.only(
                      left: width * 0.1,
                      right: width * 0.1,
                      top: height * 0.05
                  ),
                  child: LinearProgressIndicator(
                    backgroundColor: Colors.white,
                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.blue),
                  ),
                )
              ],
            ),
          );
        },
      )
    );
  }
}
