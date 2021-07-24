import 'package:Spital/Screens/Schedule/controllers/schedule_page_controller.dart';
import 'package:Spital/Screens/Schedule/controllers/schedule_page_repository.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:table_calendar/table_calendar.dart';

class SchedulePage extends StatefulWidget {
  SchedulePage({Key? key}) : super(key: key);

  @override
  _SchedulePageState createState() => _SchedulePageState();
}

class _SchedulePageState extends State<SchedulePage> {
  SchedulePageController controller = SchedulePageController();
  convert() {
    String dia = controller.focusedDay.day.toString();
    String mes = controller.focusedDay.month.toString();
    String ano = controller.focusedDay.year.toString();
    String datatime = "${mes}/${dia}/${ano}";
    print(datatime);
    return datatime;
  }

  @override
  Widget build(BuildContext context) {
    final medicID = ModalRoute.of(context)!.settings.arguments as int;

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
        appBar: AppbarSecundaria(
            topleftIcon: true,
            iconLeft: Ionicons.chevron_back_outline,
            onpressed: () {
              Navigator.pop(context);
            },
            title: "Agendar Consultar",
            width: width,
            value: 0.13,
            height: height),
        body: FutureBuilder(
            future: controller.loadInitialData(medicID, WeekDay.Friday),
            builder: (context, snapshot) {
              return SafeArea(child: Observer(builder: (context) {
                return Column(
                  children: [
                    TableCalendar(
                      firstDay: DateTime.utc(2021, 1, 1),
                      lastDay: DateTime.utc(2030, 3, 14),
                      focusedDay: controller.focusedDay,
                      onDaySelected: (selectedDay, _) {
                        if (!isSameDay(controller.focusedDay, selectedDay)) {
                          controller.changeFocusedDay(selectedDay);
                        }
                      },
                      selectedDayPredicate: (day) {
                        return isSameDay(controller.focusedDay, day);
                      },
                      onPageChanged: (focusedDay) {
                        controller.changeFocusedDay(focusedDay);
                        controller.loadCurrentAppointment(medicID, convert());
                      },
                    ),

                    //  ElevatedButton(onPressed: convert, child: Text("Converte")),
                    Expanded(
                      child: ListView.builder(
                          itemCount: controller.consultsType.length,
                          itemBuilder: (context, index) {
                            return Container(
                              child: Row(
                                children: [Text("Aaaaaaaaaaaaa")],
                              ),
                            );
                          }),
                    )
                  ],
                );
              }));
            }));
  }
}
