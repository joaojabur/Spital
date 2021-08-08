import 'package:Spital/Screens/Home/Widget/TabPages/TabPageConsulta/Widget/controller/list_doctor_repository.dart';
import 'package:mobx/mobx.dart';
part 'list_doctor_controller.g.dart';

class ListUserAppointmentController = _ListUserAppointmentControllerBase with _$ListUserAppointmentController;

abstract class _ListUserAppointmentControllerBase with Store {
  @observable
  ListUserAppointmentRepository _repository = ListUserAppointmentRepository();

  @observable
  ObservableList<AppointmentsResponse> appointments = ObservableList<AppointmentsResponse>();

  @observable
  bool hasError = false;

  @action
  changeAppointments(List<AppointmentsResponse> value){
    appointments = value.asObservable();
  }

  Future<void> loadUserAppointments(int clientID) async {
    ConsultaRepositoryResponse response = await _repository.getUserAppointments(clientID);

    if (response.error){
      hasError = true;
      return;
    }
    
    appointments = response.response!.asObservable();
  }
}