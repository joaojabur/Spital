import 'package:Spital/Screens/Home/Widget/TabPages/TabPageCalendar/Widget/list_doctors_consultas.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/Widgets/list_doctors.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/sliver_app_bar_seach_doctors.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';

import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class PageCalendar extends StatefulWidget {
  @override
  _PageCalendarState createState() => _PageCalendarState();
}

class _PageCalendarState extends State<PageCalendar> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppbarSecundaria(
        title: "Consultas",
        width: width,
        height: height,
        topleftIcon: false,
        iconLeft: Ionicons.chevron_back_outline,
        value: 0.12,
      ),
      body: Container(
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.only(right: 20, left: 20),
          child: Column(
            children: [
              SizedBox(
                height: 50,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 0),
                child: Container(
                  width: 310,
                  height: 30,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    color: Colors.black12,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      GestureDetector(
                          child: SizedBox(
                        height: 18,
                        width: 80,
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: AppColors.orange),
                          child: Text(
                            "Online",
                            style: AppTextStyles.titleBold4,
                            textAlign: TextAlign.center,
                          ),
                        ),
                      )),
                      GestureDetector(
                          child: SizedBox(
                        height: 18,
                        width: 80,
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: AppColors.orange),
                          child: Text(
                            "Pendente",
                            style: AppTextStyles.titleBold4,
                            textAlign: TextAlign.center,
                          ),
                        ),
                      )),
                      GestureDetector(
                          child: SizedBox(
                        height: 18,
                        width: 80,
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: AppColors.orange),
                          child: Text(
                            "Concluída",
                            style: AppTextStyles.titleBold4,
                            textAlign: TextAlign.center,
                          ),
                        ),
                      )),
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: 30,
              ),
              ListDoctorsConsultas()
            ],
          ),
        ),
      ),
    );
  }
}
