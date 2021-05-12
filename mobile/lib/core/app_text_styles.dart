import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTextStyles {
  static final TextStyle titleBold = GoogleFonts.quicksand(
      color: AppColors.black, fontSize: 36, fontWeight: FontWeight.bold);

  static final TextStyle subtitle = GoogleFonts.quicksand(
    color: AppColors.blue,
    fontSize: 20,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle warningTitle = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold);

  static final TextStyle warningDescription = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 15, fontWeight: FontWeight.w400);

  static final TextStyle categoriesTitle = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 8, fontWeight: FontWeight.w300);

  static final TextStyle topicTitle = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);
  static final TextStyle titleAppBarSecundaria = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 30, fontWeight: FontWeight.bold);

  static final TextStyle topicName = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);

  static final TextStyle topicDescription = GoogleFonts.roboto(
      color: AppColors.lighGray, fontSize: 12, fontWeight: FontWeight.w500);

  static final TextStyle topicDistance = GoogleFonts.roboto(
    color: AppColors.lighGray,
    fontSize: 14,
    fontWeight: FontWeight.w500,
  );

  static final TextStyle topicStar = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 12, fontWeight: FontWeight.w500);

  static final TextStyle topicTime = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 12, fontWeight: FontWeight.w500);
}
