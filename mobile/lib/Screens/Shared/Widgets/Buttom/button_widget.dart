import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';

class ButtonWidget extends StatelessWidget {
  final void Function()? onpressed;
  final String textButon;
  const ButtonWidget({
    Key? key,
    required this.textButon,
    required this.onpressed,
  }) : super(key: key);

  //final String Function() validateNext;
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Container(
        margin: EdgeInsets.only(
          top: height * 0.05,
        ),
        child: SizedBox(
          width: 280,
          height: 50,
          child: ElevatedButton(
              style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(AppColors.blueT100),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ))),
              onPressed: onpressed,
              child: Text(
                textButon,
                style: AppTextStyles.warningTitle,
              )),
        ));
  }
}
