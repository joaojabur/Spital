
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/Screens/Shared/services/dio_instance.dart';

class AppointmentsResponse {
  final AppointmentModel appointment;
  final MedicModel medic;

  AppointmentsResponse({ required this.appointment, required this.medic });
}
class ConsultaRepositoryResponse {
  final bool error;
  final String? message;
  final List<AppointmentsResponse>? response;

  ConsultaRepositoryResponse({required this.error, this.message, this.response});
}
class ListUserAppointmentRepository {
  final dio = DioInstace.dio;

  Future<ConsultaRepositoryResponse> getUserAppointments(int clientID) async {
    try {
      List<AppointmentsResponse> appointments = [];
      final response = await dio.get('/appointments/${clientID}');
      
      for (var data in List.from(response.data)){
        MedicModel medic = MedicModel.fromMap(data);
        AppointmentModel appointment = AppointmentModel.fromMap(data);

        appointments.add(
          AppointmentsResponse(
            appointment: appointment,
             medic: medic
          )
        );
      }
      
      return ConsultaRepositoryResponse(error: false, response: appointments);
    } catch (e) {
      return ConsultaRepositoryResponse(error: true, message: "Ocorreu um erro ao carregar as suas consultas");
    }
  }
}