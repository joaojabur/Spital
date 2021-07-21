import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';

class AppbarSecundaria extends PreferredSize {
  final String title;
  final void Function()? onpressed;
  final bool topleftIcon;

  final IconData iconLeft;

  AppbarSecundaria(
      {required this.topleftIcon,
      required this.iconLeft,
      required this.onpressed,
      required this.title,
      required double width,
      required double value,
      required double height})
      : super(
          preferredSize: Size.fromHeight(height * 0.34),
          child: Container(
            height: height * value,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(80),
                ),
                color: AppColors.blueTransparent),
            child: Column(
              children: [
                Padding(
                  padding:
                      EdgeInsets.only(top: height * 0.05, left: 20, right: 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 5),
                        child: topleftIcon
                            ? Container(
                                height: 40,
                                width: 45,
                                child: ElevatedButton(
                                  style: ButtonStyle(
                                      padding:
                                          MaterialStateProperty.all<EdgeInsets>(
                                              EdgeInsets.only(right: 20)),
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.white),
                                      shape: MaterialStateProperty.all<
                                              RoundedRectangleBorder>(
                                          RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(10.0),
                                      ))),
                                  onPressed: topleftIcon ? onpressed : null,
                                  child: Padding(
                                    padding: const EdgeInsets.only(left: 7),
                                    child: Icon(
                                      iconLeft,
                                      size: 25,
                                      color: Colors.black,
                                    ),
                                  ),
                                ))
                            : null,
                      ),
                      Text(
                        title,
                        style: AppTextStyles.titleBold2,
                        textAlign: TextAlign.center,
                      ),
                      Container(
                        padding: EdgeInsets.only(right: 50),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
}
