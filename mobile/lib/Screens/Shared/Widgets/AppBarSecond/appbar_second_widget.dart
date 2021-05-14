import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';

class AppbarSecundaria extends PreferredSize {
  final String title;

  AppbarSecundaria({required this.title, double? width, required double height})
      : super(
          preferredSize: Size.fromHeight(height * 0.34),
          child: Container(
            height: height * 0.1,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(80),
                ),
                color: AppColors.blueTransparent),
            child: Padding(
              padding: const EdgeInsets.only(top: 17),
              child: Center(
                child: Text(
                  title,
                  style: AppTextStyles.titleAppBarSecundaria,
                ),
              ),
            ),
          ),
        );
}
