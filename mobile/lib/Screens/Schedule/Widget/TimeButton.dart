import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';

class TimeButton extends StatelessWidget {
  final Function() onPressed;
  final String text;
  final bool reserved;
  final bool selected;
  const TimeButton(
      {Key? key,
      required this.onPressed,
      required this.text,
      this.reserved = false,
      this.selected = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      child: Text(reserved ? '$text - Reservado' : text),
      onPressed: reserved ? () {} : onPressed,
      style: reserved
          ? ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(Colors.red),
              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                  RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              )))
          : selected == true
              ? ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(AppColors.blueT100),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  )))
              : ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(AppColors.darkBlue),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ))),
    );
  }
}
