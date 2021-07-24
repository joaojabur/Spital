import 'package:Spital/Screens/Schedule/controllers/schedule_page_controller.dart';
import 'package:Spital/Screens/Schedule/controllers/schedule_page_repository.dart';
import 'package:Spital/Screens/Shared/Models/consult_model.dart';
import 'package:Spital/Screens/Shared/Models/schedule_model.dart';
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
          future: controller.loadInitialData(medicID),
          builder: (context, snapshot){
            if (snapshot.connectionState == ConnectionState.done){
                return Observer(builder: (context) {
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
                        },
                      ),
                      FutureBuilder(
                        future: controller.loadCurrentAppointment(medicID, controller.formatTime()),
                        builder: (context, snapshot){
                          if (snapshot.connectionState == ConnectionState.done){
                            print(controller.medicSchedule);
                            print(controller.currentAppointment);
                            try {
                              ScheduleModel currentSchedule = controller.medicSchedule.firstWhere(
                                (element) => element.weekDay == controller.getWeekDay()
                              );
                             
                              List<String> timeRange = controller.scheduleToTimeRange(currentSchedule);
                              return Expanded(
                                child: GridView.builder(
                                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 2,
                                    childAspectRatio: 5
                                  ),
                                  itemCount: timeRange.length,
                                  itemBuilder: (context, index){
                                    String range = timeRange[index];
                                    bool isReserved = false;
                                    try {
                                      var reserve = controller.currentAppointment.firstWhere((element) => element.time == range);
                                      isReserved = true;
                                    } catch(err){
                                      
                                    }
                                    print(isReserved);

                                    return Container(
                                      child: isReserved ? Text("$range - Reservado") : Text(range)
                                    );
                                  },
                                ),
                              );

                            } catch(err){
                              return Text("Não possui consultas nesse dia");
                            }                            
                          }

                          return Center(
                            child: CircularProgressIndicator()
                          );
                        },
                      ),
                      Expanded(
                        child: ListView.builder(
                            itemCount: controller.consultsType.length,
                            itemBuilder: (context, index) {
                              ConsultModel consult = controller.consultsType[index];
                              return Container(
                                child: Row(
                                  children: [
                                    Text("${consult.type}")
                                  ],
                                ),
                              );
                            }
                          ),
                      )
                    ],
                  );
                }
              );
            }

            return Center(
              child: CircularProgressIndicator()
            );
        }
      )
    );
  }
}
