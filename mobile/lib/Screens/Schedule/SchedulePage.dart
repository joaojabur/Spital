import 'package:Spital/Screens/Schedule/controllers/schedule_page_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:table_calendar/table_calendar.dart';

class SchedulePage extends StatefulWidget {
  SchedulePage({Key? key}) : super(key: key);

  @override
  _SchedulePageState createState() => _SchedulePageState();
}

class _SchedulePageState extends State<SchedulePage> {
  SchedulePageController controller = SchedulePageController();
  @override
  Widget build(BuildContext context) {
    final medicID = ModalRoute.of(context)!.settings.arguments as int;

    return Scaffold(
      body: SafeArea(
        child: Observer(
          builder: (context){
            return  Column(
              children: [
                TableCalendar(
                  firstDay: DateTime.utc(2021, 1, 1),
                  lastDay: DateTime.utc(2030, 3, 14),
                  focusedDay: DateTime.now(),
                  onDaySelected: (selectedDay, _){
                    if (!isSameDay(controller.focusedDay, selectedDay)){
                      controller.changeFocusedDay(selectedDay);
                    }
                  },
                  selectedDayPredicate: (day) {
                    return isSameDay(controller.focusedDay, day);
                  },
                  onPageChanged: (focusedDay) {
                    controller.changeFocusedDay(focusedDay);
                  },
                )
              ],
            );
          }
        )
      )
    );
  }
}