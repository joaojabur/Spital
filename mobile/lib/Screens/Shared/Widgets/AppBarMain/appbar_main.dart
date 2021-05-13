import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import 'dart:core';

import 'Widgets/card_Infor_widget.dart';

class AppbarWidget extends PreferredSize {
  AppbarWidget({double width, double height})
      : super(
            preferredSize: Size.fromHeight(height * 0.34),
            child: Container(
                child: Stack(
              children: [
                Container(
                  height: height * 0.314,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        bottomRight: Radius.circular(80),
                      ),
                      color: AppColors.blueTransparent),
                ),
                Container(
                    margin:
                        EdgeInsets.only(top: height * 0.04, left: width * 0.05),
//padding: ,
                    width: width * 0.16,
                    height: height * 0.1,
                    child: SvgPicture.asset("images/logo.svg")),
                Positioned(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                          margin: EdgeInsets.only(
                              top: height * 0.01,
                              left: width * 0.1,
                              right: width * 0.01),
                          height: 55,
                          width: 55,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(100),
                              image: DecorationImage(
                                image: NetworkImage(
                                    "https://i.pinimg.com/736x/a6/60/a5/a660a51eac30c2d625d7983aeb06f454.jpg"),
                              ))),
                      Text.rich(TextSpan(
                          text: "Olá",
                          style: AppTextStyles.topicName,
                          children: [
                            TextSpan(
                                text: "\n Carlos!",
                                style: AppTextStyles.subtitle)
                          ])),
                      Container(
                        margin: EdgeInsets.only(
                            bottom: height * 0.08, left: width * 0.03),
                        height: height * 0.26, //0.27
                        width: width * 0.5,
                        child: SvgPicture.asset(
                          "images/ilustracao_home.svg",
                        ),
                      )
                    ],
                  ),
                ),
                Align(alignment: Alignment(0.0, 1.0), child: CardInforWidget()),
              ],
            )));
}
