import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_svg/flutter_svg.dart';

class SliverPage extends PreferredSize {
  final String title;
  final size;
  final bool topleftIcon;
  final bool topRightIcon;
  final IconData iconAddRight;

  SliverPage(
      {required this.topleftIcon,
      required this.size,
      required this.iconAddRight,
      required this.topRightIcon,
      required this.title,
      required double height,
      required double width})
      : super(
          preferredSize: Size.fromHeight(height * 0.34),
          child: SliverAppBar(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.only(bottomRight: Radius.circular(40)),
            ),
            backgroundColor: AppColors.blueTransparent,
            expandedHeight: 200,
            pinned: true,
            floating: true,
            centerTitle: true,
            leading: Container(
              margin: EdgeInsets.only(left: 15, right: 0, top: 5, bottom: 12),
              width: 50,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10), color: Colors.white),
              child: Padding(
                padding: EdgeInsets.only(right: 15),
                child: IconButton(
                    icon: Icon(iconAddRight),
                    color: AppColors.darkBlue,
                    onPressed: () {}),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: EdgeInsets.only(top: 30, left: 10),
                    child: Center(
                      child: Text(" Crie aqui\n sua conta!",
                          style: AppTextStyles.titleBold2),
                    ),
                  ),
                  Container(
                      width: 200,
                      child: SvgPicture.asset("images/register.svg")),
                ],
              ),
              title: Text(
                title,
                style: TextStyle(color: Colors.transparent),
              ),
              centerTitle: true,
            ),
          ),
        );
}
