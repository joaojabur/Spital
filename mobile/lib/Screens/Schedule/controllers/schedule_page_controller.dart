import 'package:Spital/Screens/Schedule/controllers/schedule_page_repository.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/consult_model.dart';
import 'package:Spital/Screens/Shared/Models/schedule_model.dart';
import 'package:mobx/mobx.dart';
part 'schedule_page_controller.g.dart';

class SchedulePageController = _SchedulePageControllerBase with _$SchedulePageController;

abstract class _SchedulePageControllerBase with Store {
  final SchedulePageRepository repository = SchedulePageRepository();

  @observable
  DateTime focusedDay = DateTime.now();

  @observable
  ObservableList<ScheduleModel> medicSchedule = ObservableList<ScheduleModel>();

  @observable
  ObservableList<AppointmentModel> currentAppointment = ObservableList<AppointmentModel>();

  @observable
  ObservableList<ConsultModel> consultsType = ObservableList<ConsultModel>();

  @action
  changeFocusedDay(DateTime value){
    focusedDay = value;
  }

  Future<String> loadSchedule(int medicID, WeekDay weekDay) async {
    final response = await repository.loadSchedule(medicID, weekDay);

    if (response.error){
      return response.message!;
    }

    medicSchedule = response.schedule!.asObservable();

    return '';
  }

  Future<String> loadConsultTypes(int medicID) async {
    final response = await repository.loadConsults(medicID);

    if (response.error){
      return response.message!;
    }

    consultsType = response.consults!.asObservable();

    return '';
  }

  Future<String> loadCurrentAppointment(int medicID, String date) async {
    final response = await repository.loadDayAppointments(medicID, date);

    if (response.error){
      return response.message!;
    }

    currentAppointment = response.appointments!.asObservable();

    return '';
  }
}