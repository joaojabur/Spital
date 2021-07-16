import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'Controller/consulta_controller.dart';
import 'Widget/list_doctors_consultas.dart';

class PageConsulta extends StatefulWidget {
  @override
  _PageConsultaState createState() => _PageConsultaState();
}

class _PageConsultaState extends State<PageConsulta> {
  CalendarController calendarController = CalendarController();
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return SingleChildScrollView(
      child: SizedBox(
        height: 970,
        child: Scaffold(
            appBar: AppbarSecundaria(
              title: "Consultas",
              width: width,
              height: height,
              topleftIcon: false,
              iconLeft: Ionicons.chevron_back_outline,
              value: 0.12,
              onpressed: () {},
            ),
            body: SizedBox(child: ListDoctorsConsultas())

            /*
          
           Container(
            color: Colors.white,
            child: Padding(
              padding: const EdgeInsets.only(right: 20, left: 20),
              child: Column(
                children: [
                  SizedBox(
                    height: 50,
                  ),
                  /* Padding(
                    padding: const EdgeInsets.only(left: 0),
                    child: Container(
                      width: 310,
                      height: 30,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.black12, width: 1),
                        borderRadius: BorderRadius.circular(30),
                        color: Colors.white,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Observer(builder: (_) {
                            return GestureDetector(
                                onTap: () {
                                  print("chamado 1 ");

                                  calendarController.changeOnColor(0);
                                  calendarController.changeOffColor(1);
                                  calendarController.changeOffColor(2);
                                },
                                child: SizedBox(
                                  height: 18,
                                  width: 80,
                                  child: Container(
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(20),
                                        color: calendarController.isColor[0] ==
                                                true
                                            ? AppColors.orange
                                            : Colors.white),
                                    child: Text(
                                      "Online",
                                      style:
                                          calendarController.isColor[0] == true
                                              ? AppTextStyles.titleBold4
                                              : AppTextStyles.titleBold5,
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ));
                          }),
                          Observer(builder: (_) {
                            return GestureDetector(
                                onTap: () {
                                  print("chamado 2");
                                  calendarController.changeOnColor(1);
                                  calendarController.changeOffColor(2);
                                  calendarController.changeOffColor(0);
                                },
                                child: SizedBox(
                                  height: 18,
                                  width: 80,
                                  child: Container(
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(20),
                                        color: calendarController.isColor[1] ==
                                                true
                                            ? AppColors.orange
                                            : Colors.white),
                                    child: Text(
                                      "Pendente",
                                      style:
                                          calendarController.isColor[1] == true
                                              ? AppTextStyles.titleBold4
                                              : AppTextStyles.titleBold5,
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ));
                          }),
                          Observer(builder: (_) {
                            return GestureDetector(
                                onTap: () {
                                  print("chamado 3");
                                  calendarController.changeOnColor(2);
                                  calendarController.changeOffColor(1);
                                  calendarController.changeOffColor(0);
                                },
                                child: SizedBox(
                                  height: 18,
                                  width: 80,
                                  child: Container(
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(20),
                                        color: calendarController.isColor[2] ==
                                                true
                                            ? AppColors.orange
                                            : Colors.white),
                                    child: Text(
                                      "Concluída",
                                      style:
                                          calendarController.isColor[2] == true
                                              ? AppTextStyles.titleBold4
                                              : AppTextStyles.titleBold5,
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ));
                          }),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),*/
                  ListDoctorsConsultas()
                ],
              ),
            ),
          ),*/
            ),
      ),
    );
  }
}
