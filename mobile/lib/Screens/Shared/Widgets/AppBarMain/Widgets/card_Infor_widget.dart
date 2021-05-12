import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class CardInforWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Container(
          width: width * 0.8,
          height: height * 0.164,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: AppColors.purpleTransparent),
          child: Row(
            children: [
              Expanded(
                flex: 3,
                child: Padding(
                  padding: const EdgeInsets.only(top: 5, left: 20),
                  child: Padding(
                    padding: const EdgeInsets.all(4.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Fique em casa!",
                          style: AppTextStyles.warningTitle,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 5),
                          child: Text(
                            "Agende uma visita eletrônica e discuta o plano com um médico",
                            style: AppTextStyles.warningDescription,
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
              Expanded(
                flex: 2,
                child: Container(
                  height: height * 0.115,
                  child: SvgPicture.asset("images/card.svg"),
                ),
              )
            ],
          ),
        ),
      ],
    );
  }
}
