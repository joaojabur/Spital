import 'package:Spital/Screens/Schedule/controllers/schedule_page_repository.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/consult_model.dart';
import 'package:Spital/Screens/Shared/Models/schedule_model.dart';
import 'package:mobx/mobx.dart';
part 'schedule_page_controller.g.dart';

class SchedulePageController = _SchedulePageControllerBase
    with _$SchedulePageController;

abstract class _SchedulePageControllerBase with Store {
  final SchedulePageRepository repository = SchedulePageRepository();

  @observable
  DateTime focusedDay = DateTime.now();

  @observable
  ObservableList<ScheduleModel> medicSchedule = ObservableList<ScheduleModel>();

  @observable
  ObservableList<AppointmentModel> currentAppointment =
      ObservableList<AppointmentModel>();

  @observable
  ObservableList<ConsultModel> consultsType = ObservableList<ConsultModel>();

  @observable
  String? selectedTime;

  @observable
  String? selectedType;

  @action
  changeFocusedDay(DateTime value) {
    focusedDay = value;
  }

  @action
  changedSelectedTime(String value){
    selectedTime = value;
  }

  @action
  changeSelectedType(String value){
    selectedType = value;
  }

  Future<String> loadSchedule(int medicID) async {
    final response = await repository.loadSchedule(medicID);

    if (response.error) {
      return response.message!;
    }
    
    medicSchedule = response.schedule!.asObservable();

    return '';
  }

  Future<String> loadConsultTypes(int medicID) async {
    final response = await repository.loadConsults(medicID);

    if (response.error) {
      return response.message!;
    }

    consultsType = response.consults!.asObservable();

    return '';
  }

  Future<String> loadCurrentAppointment(int medicID, String date) async {
    final response = await repository.loadDayAppointments(medicID, date);

    if (response.error) {
      return response.message!;
    }

    currentAppointment = response.appointments!.asObservable();

    return '';
  }

  Future<void> loadInitialData(int medicID) async {
    await loadSchedule(medicID);
    await loadConsultTypes(medicID);
  }

  formatTime() {
    String day = focusedDay.day.toString();
    String month = focusedDay.month.toString();
    String year = focusedDay.year.toString();
    String dataFormatted = "${month}/${day}/${year}";
    
    return dataFormatted;
  }

  List<String> scheduleToTimeRange(ScheduleModel schedule) {
    List<String> hours = [];

    int initialHour = int.parse(schedule.from) ~/ 60;
    int initialMinutes = int.parse(schedule.from) % 60;
    int lastHour =  int.parse(schedule.to) ~/ 60;
    int lastMinutes = int.parse(schedule.to) % 60;
    int rangeSize = ((int.parse(schedule.to) - int.parse(schedule.from)) / 60 * 2 - 1).toInt();
    print('range: $rangeSize');

    hours.add('$initialHour:${initialMinutes.toString().padLeft(2, '0')}');
    for (int i = 0; i < rangeSize; i++){
      int currentTime = int.parse(schedule.from) + 30 * (i + 1);
      int currentHour = currentTime ~/ 60;
      int currentMinutes = currentTime % 60;

      hours.add('$currentHour:${currentMinutes.toString().padLeft(2, '0')}');
    }
    hours.add('$lastHour:${lastMinutes.toString().padLeft(2, '0')}');
    return hours;
  }

  getWeekDay(){
    int weekDay = focusedDay.weekday;
    
    if (weekDay == 7){
      return 0;
    }

    return weekDay;
  }
}
