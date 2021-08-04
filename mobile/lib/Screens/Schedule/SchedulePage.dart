import 'package:Spital/Screens/Schedule/Widget/TimeButton.dart';
import 'package:Spital/Screens/Schedule/controllers/schedule_page_controller.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
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
    final medicID =  ModalRoute.of(context)!.settings.arguments as int;

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
                      Padding(
                        padding: const EdgeInsets.only(top: 20, bottom: 10),
                        child: PhysicalModel(
                          color: Colors.black,
                          elevation: 2,
                          borderRadius: BorderRadius.circular(50),
                          child: Container(
                            decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(50)),
                            child: SizedBox(
                              height: 390,
                              width: 320,
                              child: TableCalendar(
                                  locale: "pt-br",
                                  availableCalendarFormats: {
                                    CalendarFormat.month: 'Mês',
                                  },
                                  firstDay: DateTime.utc(2021, 1, 1),
                                  lastDay: DateTime.utc(2030, 3, 14),
                                  focusedDay: controller.focusedDay,
                                  onDaySelected: (selectedDay, _) {
                                    if (!isSameDay(
                                        controller.focusedDay, selectedDay)) {
                                      controller
                                          .changeFocusedDay(selectedDay);
                                    }
                                  },
                                  selectedDayPredicate: (day) {
                                    return isSameDay(
                                        controller.focusedDay, day);
                                  },
                                  onPageChanged: (focusedDay) {
                                    controller.changeFocusedDay(focusedDay);
                                  },
                                  calendarBuilders: CalendarBuilders(

                                      //  outsideBuilder: (context, day, focusedDay) => Text(""),
                                      ),
                                  calendarStyle: CalendarStyle(
                                      outsideTextStyle:
                                          AppTextStyles.titleBold3Cinza,
                                      weekendTextStyle:
                                          AppTextStyles.titleBold5,
                                      defaultTextStyle:
                                          AppTextStyles.titleBold5,
                                      cellMargin: EdgeInsets.all(7)),
                                  headerStyle: HeaderStyle(
                                      leftChevronIcon: Container(
                                          padding: EdgeInsets.all(5),
                                          decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              color: AppColors.darkBlue),
                                          child: Padding(
                                            padding: const EdgeInsets.only(
                                                right: 5),
                                            child: Icon(
                                              Ionicons.chevron_back_outline,
                                              color: Colors.white,
                                            ),
                                          )),
                                      rightChevronIcon: Container(
                                          padding: EdgeInsets.all(5),
                                          decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              color: AppColors.darkBlue),
                                          child: Padding(
                                            padding: const EdgeInsets.only(
                                                left: 5),
                                            child: Icon(
                                              Ionicons
                                                  .chevron_forward_outline,
                                              color: Colors.white,
                                            ),
                                          )),
                                      //   titleTextFormatter: (date, locale) {
                                      //       return "";
                                      //   }, lugar onde fiz nome do mês
                                      formatButtonVisible: true,
                                      formatButtonShowsNext: true,
                                      titleTextStyle:
                                          AppTextStyles.titleBold3,
                                      headerPadding: EdgeInsets.all(0),
                                      titleCentered: true),
                                  daysOfWeekStyle: DaysOfWeekStyle(
                                    weekdayStyle:
                                        AppTextStyles.calendarDayAndWeekend,
                                    weekendStyle:
                                        AppTextStyles.calendarDayAndWeekend,
                                  )),
                            ),
                          ),
                        ),
                      ),
                      FutureBuilder(
                        future: controller.loadCurrentAppointment(
                            medicID, controller.formatTime()),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.done) {
                            try {
                              ScheduleModel currentSchedule = controller
                                  .medicSchedule
                                  .firstWhere((element) =>
                                      element.weekDay ==
                                      controller.getWeekDay());

                              List<String> timeRange = controller
                                  .scheduleToTimeRange(currentSchedule);
                              String date = controller.formatTime();
                              return Container(
                                color: AppColors.lighGray,
                                padding: const EdgeInsets.all(15),
                                child: Column(
                                  children: [
                                    Text(
                                      "Horários Disponíveis",
                                      style: AppTextStyles.titleBold3,
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(top: 16),
                                      child: PhysicalModel(
                                        color: Colors.black,
                                        elevation: 2,
                                        borderRadius: BorderRadius.circular(10),
                                        child: Container(
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.circular(10)
                                          ),
                                          child: ConstrainedBox(
                                            constraints: BoxConstraints(
                                                maxHeight: timeRange.length * 31
                                            ),
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
                                                  try {
                                                    var reserve = controller
                                                        .currentAppointment
                                                        .firstWhere((element) =>
                                                            element.time == range &&
                                                            element.date == date);
                                                    isReserved = true;
                                                  } catch (err) {}

                                                  return Observer(
                                                    builder: (context) {
                                                      return Container(
                                                          child: TimeButton(
                                                        text: range,
                                                        onPressed: () {
                                                          controller
                                                              .changeSelectedTime(range);
                                                        },
                                                        reserved: isReserved,
                                                        selected:
                                                            controller.selectedTime ==
                                                                range,
                                                      ));
                                                    }
                                                  );
                                                },
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
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
                        child: Center(
                          child: Container(
                            padding: const EdgeInsets.all(15),
                            height: controller.consultsType.length * 90,
                            child: PhysicalModel(
                                color: Colors.black,
                                elevation: 2,
                                borderRadius: BorderRadius.circular(10),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(10)
                                  ),
                                  padding: const EdgeInsets.all(15),
                                  child: ListView.builder(
                                      physics: NeverScrollableScrollPhysics(),
                                      itemCount: controller.consultsType.length,
                                      itemBuilder: (context, index) {
                                        ConsultModel consult =
                                            controller.consultsType[index];
                                        return Observer(
                                          builder: (context) {
                                            return Padding(
                                                padding: const EdgeInsets.all(5),
                                                child: ElevatedButton(
                                                    style: ButtonStyle(
                                                        backgroundColor:
                                                            MaterialStateProperty
                                                                .all<Color>(
                                                                    consult == controller.selectedType ? AppColors.blueT100 : AppColors.darkBlue),
                                                        shape: MaterialStateProperty
                                                            .all<RoundedRectangleBorder>(
                                                                RoundedRectangleBorder(
                                                          borderRadius:
                                                              BorderRadius.circular(
                                                                  10.0),
                                                        ))),
                                                    onPressed: () {
                                                      controller.changeSelectedType(consult);
                                                    },
                                                    child: Container(
                                                      child: Row(
                                                        mainAxisAlignment:
                                                            MainAxisAlignment.spaceBetween,
                                                        children: [
                                                          Text(
                                                            "${consult.type}",
                                                            textAlign:
                                                                TextAlign.start,
                                                          ),
                                                          Text(
                                                            "R\$ ${consult.price}",
                                                            textAlign:
                                                                TextAlign.end,
                                                          ),
                                                        ],
                                                      ),
                                                    )),
                                              );
                                          }
                                        );
                                      }
                                    ),
                                ),
                            ),
                          ),
                        ),
                      ),
                      if (controller.selectedType != null && controller.selectedTime != null) ...([
                        Container(
                          width: width,
                          margin: EdgeInsets.all(10),
                          child: ElevatedButton(
                            onPressed: (){
                              AppointmentModel appointment = AppointmentModel(controller.formatTime(), controller.selectedTime!, "MEDICO", controller.selectedType!.type, controller.selectedType!.price.toString());

                              Navigator.pushNamed(context, '/payment', arguments: appointment);
                            }, 
                            child: Text("Agendar horário."),
                             style: ButtonStyle(
                                  padding: MaterialStateProperty.all<EdgeInsets>(EdgeInsets.only(right: 0)),
                                  backgroundColor: MaterialStateProperty.all<Color>(AppColors.verde),
                                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(15.0),
                                  )
                              ),
                            ),
                          ),
                        )
                      ])
                    ],
                  ),
                );
              });
            }

            return Center(child: CircularProgressIndicator());
          }
        )
      );
  }
}
