import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class AppbarSecundaria extends PreferredSize {
  final String title;
  final bool topleftIcon;

  final IconData iconLeft;

  AppbarSecundaria(
      {required this.topleftIcon,
      required this.iconLeft,
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
                  padding: EdgeInsets.only(top: height * 0.05),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        child: topleftIcon
                            ? IconButton(
                                icon: Icon(Ionicons.arrow_back),
                                onPressed: () {},
                              )
                            : null,
                      ),
                      Text(
                        title,
                        style: AppTextStyles.titleAppBarSecundaria,
                        textAlign: TextAlign.center,
                      ),
                      Container(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
}
