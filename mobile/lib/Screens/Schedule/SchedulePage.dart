import 'package:Spital/Screens/Schedule/Widget/TimeButton.dart';
import 'package:Spital/Screens/Schedule/controllers/schedule_page_controller.dart';
import 'package:Spital/Screens/Shared/Models/consult_model.dart';
import 'package:Spital/Screens/Shared/Models/schedule_model.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:Spital/core/core.dart';
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
    final medicID = 1;

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
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return Observer(builder: (context) {
                  return SingleChildScrollView(
                    child: Column(
                      children: [
                        TableCalendar(
                          firstDay: DateTime.utc(2021, 1, 1),
                          lastDay: DateTime.utc(2030, 3, 14),
                          focusedDay: controller.focusedDay,
                          onDaySelected: (selectedDay, _) {
                            if (!isSameDay(
                                controller.focusedDay, selectedDay)) {
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
                          future: controller.loadCurrentAppointment(
                              medicID, controller.formatTime()),
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.done) {
                              print(controller.medicSchedule);
                              print(controller.currentAppointment);
                              try {
                                ScheduleModel currentSchedule = controller
                                    .medicSchedule
                                    .firstWhere((element) =>
                                        element.weekDay ==
                                        controller.getWeekDay());

                                List<String> timeRange = controller
                                    .scheduleToTimeRange(currentSchedule);
                                String date = controller.formatTime();
                                return Column(
                                  children: [
                                    Text(
                                      "Horários Disponíveis",
                                      style: AppTextStyles.titleBold3,
                                    ),
                                    ConstrainedBox(
                                      constraints: BoxConstraints(
                                          maxHeight: timeRange.length * 31),
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 10, vertical: 15),
                                        child: GridView.builder(
                                          physics: BouncingScrollPhysics(),
                                          gridDelegate:
                                              SliverGridDelegateWithFixedCrossAxisCount(
                                                  crossAxisCount: 2,
                                                  childAspectRatio: 4.5,
                                                  crossAxisSpacing: 10,
                                                  mainAxisSpacing: 20),
                                          itemCount: timeRange.length,
                                          itemBuilder: (context, index) {
                                            String range = timeRange[index];
                                            bool isReserved = false;
                                            print(
                                                controller.currentAppointment);
                                            print(
                                                "controller.currentAppointment");
                                            try {
                                              var reserve = controller
                                                  .currentAppointment
                                                  .firstWhere((element) =>
                                                      element.time == range &&
                                                      element.date == date);
                                              isReserved = true;
                                            } catch (err) {}

                                            return Container(
                                                child: TimeButton(
                                              text: range,
                                              onPressed: () {
                                                controller
                                                    .changedSelectedTime(range);
                                              },
                                              reserved: isReserved,
                                              selected:
                                                  controller.selectedTime ==
                                                      range,
                                            ));
                                          },
                                        ),
                                      ),
                                    ),
                                  ],
                                );
                              } catch (err) {
                                return Text("Não possui consultas nesse dia");
                              }
                            }

                            return Center(child: CircularProgressIndicator());
                          },
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 10),
                          child: Text(
                            "Tipos de consultas",
                            style: AppTextStyles.titleBold3,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: Container(
                            height: controller.consultsType.length * 90,
                            child: Expanded(
                              child: ListView.builder(
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount: controller.consultsType.length,
                                  itemBuilder: (context, index) {
                                    ConsultModel consult =
                                        controller.consultsType[index];
                                    return Padding(
                                      padding: const EdgeInsets.all(15),
                                      child: PhysicalModel(
                                        color: Colors.black,
                                        elevation: 2,
                                        borderRadius: BorderRadius.circular(10),
                                        child: Container(
                                          decoration: BoxDecoration(
                                              color: Colors.white,
                                              borderRadius:
                                                  BorderRadius.circular(10)),
                                          child: Padding(
                                            padding: const EdgeInsets.all(10),
                                            child: ElevatedButton(
                                                style: ButtonStyle(
                                                    backgroundColor:
                                                        MaterialStateProperty
                                                            .all<Color>(
                                                                AppColors
                                                                    .darkBlue),
                                                    shape: MaterialStateProperty
                                                        .all<RoundedRectangleBorder>(
                                                            RoundedRectangleBorder(
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              10.0),
                                                    ))),
                                                onPressed: () {
                                                  controller.changeSelectedType(
                                                      consult.type);
                                                },
                                                child: Container(
                                                  margin: EdgeInsets.only(
                                                      left: 10,
                                                      right: 0,
                                                      top: 10,
                                                      bottom: 10),
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Text(
                                                        "${consult.type}",
                                                        textAlign:
                                                            TextAlign.start,
                                                      ),
                                                      Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                .only(left: 90),
                                                        child: Text(
                                                          "R\$: 150,00",
                                                          textAlign:
                                                              TextAlign.start,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                )),
                                          ),
                                        ),
                                      ),
                                    );
                                  }),
                            ),
                          ),
                        )
                      ],
                    ),
                  );
                });
              }

              return Center(child: CircularProgressIndicator());
            }));
  }
}
