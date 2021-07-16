import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTextStyles {
  static final TextStyle titleBold = GoogleFonts.quicksand(
      color: AppColors.black, fontSize: 33, fontWeight: FontWeight.bold);
  static final TextStyle titleBoldWriteMaiorPlus = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 33, fontWeight: FontWeight.bold);
  static final TextStyle titleBoldRegistered = GoogleFonts.quicksand(
      color: AppColors.verde, fontSize: 28, fontWeight: FontWeight.bold);
  static final TextStyle titleBoldWrite = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold);
  static final TextStyle titleBoldWriteMaior = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold);
  static final TextStyle titleBold2 = GoogleFonts.quicksand(
      color: AppColors.black, fontSize: 28, fontWeight: FontWeight.bold);
  static final TextStyle titleBold3 = GoogleFonts.quicksand(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);
  static final TextStyle titleBold4 = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold);

  static final TextStyle titleBold5 = GoogleFonts.quicksand(
      color: AppColors.black, fontSize: 14, fontWeight: FontWeight.bold);
  static final TextStyle loginDescription = GoogleFonts.quicksand(
    color: AppColors.gray,
    fontSize: 18,
  );
  static final TextStyle information = GoogleFonts.quicksand(
    color: AppColors.black,
    fontSize: 15,
  );

  static final TextStyle subtitle = GoogleFonts.quicksand(
    color: AppColors.blue,
    fontSize: 20,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle warningTitle = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold);
  static final TextStyle reviewUserTitle = GoogleFonts.quicksand(
    color: Colors.black,
    fontSize: 20,
  );
  static final TextStyle descriptionRegistered = GoogleFonts.quicksand(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);

  static final TextStyle warningDescription = GoogleFonts.quicksand(
      color: Colors.white, fontSize: 15, fontWeight: FontWeight.w400);

  static final TextStyle categoriesTitle = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 10, fontWeight: FontWeight.w300);
  static final TextStyle categoriesTitle2 = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 15, fontWeight: FontWeight.w300);

  static final TextStyle topicTitle = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);
  static final TextStyle titleAppBarSecundaria = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 25, fontWeight: FontWeight.bold);

  static final TextStyle topicName = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);
  static final TextStyle topicNameDoctorMaior = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 20, fontWeight: FontWeight.bold);
  static final TextStyle topicNameDoctor = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 14, fontWeight: FontWeight.bold);

  static final TextStyle topicDescription = GoogleFonts.roboto(
      color: AppColors.lighGray, fontSize: 12, fontWeight: FontWeight.w500);
  static final TextStyle topicDescriptionDoctor = GoogleFonts.roboto(
      color: AppColors.gray, fontSize: 12, fontWeight: FontWeight.w500);
  static final TextStyle topicDescriptionDoctorMaior = GoogleFonts.roboto(
      color: AppColors.gray, fontSize: 16, fontWeight: FontWeight.w500);

  static final TextStyle topicDistance = GoogleFonts.roboto(
    color: AppColors.lighGray,
    fontSize: 14,
    fontWeight: FontWeight.w500,
  );

  static final TextStyle topicStar = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 10, fontWeight: FontWeight.w500);

  static final TextStyle topicTime = GoogleFonts.roboto(
      color: AppColors.black, fontSize: 12, fontWeight: FontWeight.w500);
}
