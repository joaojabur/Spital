import 'package:Spital/Screens/Register/TabRegister/TabFinal/tab_final.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ButtuomWidget extends StatelessWidget {
  const ButtuomWidget(
      {Key? key, required, this.textButom, required this.erroText})
      : super(key: key);
  final textButom;
  final String Function() erroText;
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    RegisterController controller = Provider.of<RegisterController>(context);
    return GestureDetector(
      onTap: () {
        if (erroText == "") {
          controller.tabRegisterIndex == 4
              ? Navigator.pop(context,
                  MaterialPageRoute(builder: (context) => TabRegisterFinal()))
              : controller.changePageRegister(controller.tabRegisterIndex! + 1);
        } else {
          return print("erro");
        }
      },
      child: Container(
        margin: EdgeInsets.only(
          top: height * 0.05,
        ),
        padding: EdgeInsets.symmetric(
          horizontal: width * 0.27,
        ),
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15), color: AppColors.blueT100),
        child: TextButton(
          onPressed: () {
            controller.tabRegisterIndex == 4
                ? Navigator.pushReplacement(context,
                    MaterialPageRoute(builder: (context) => TabRegisterFinal()))
                : controller
                    .changePageRegister(controller.tabRegisterIndex! + 1);
            //print(erroText);
            /*if (erroText == "true") {
              controller.tabRegisterIndex == 4
                  ? Navigator.pop(context,
                      MaterialPageRoute(builder: (context) => TabFinal()))
                  : controller
                      .changePageRegister(controller.tabRegisterIndex! + 1);
            } else {
              return print(erroText);
            }*/
          },
          child: Text(
            textButom,
            style: AppTextStyles.warningTitle,
          ),
        ),
      ),
    );
  }
}
