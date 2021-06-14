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
      required double height})
      : super(
          preferredSize: Size.fromHeight(height * 0.34),
          child: Container(
            height: height * 0.1,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(80),
                ),
                color: AppColors.blueTransparent),
            child: Column(
              children: [
                Padding(
                  padding: EdgeInsets.only(top: height * 0.03),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        child: topleftIcon
                            ? IconButton(
                                icon: Icon(Ionicons.arrow_back),
                                onPressed: () {},
                              )
                            : null,
                      ),
                      Center(
                        child: Text(
                          title,
                          style: AppTextStyles.titleAppBarSecundaria,
                        ),
                      ),
                      Container(
                        child: topleftIcon
                            ? IconButton(
                                icon: (Icon(iconLeft)),
                                onPressed: () {},
                              )
                            : null,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
}
