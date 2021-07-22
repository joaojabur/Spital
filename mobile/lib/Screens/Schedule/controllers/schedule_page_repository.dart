import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/consult_model.dart';
import 'package:Spital/Screens/Shared/Models/schedule_model.dart';
import 'package:Spital/Screens/Shared/services/dio_instance.dart';
import 'package:dio/dio.dart';

class ScheduleRepositoryResponse {
  final bool error;
  final List<ScheduleModel>? schedule;
  final List<AppointmentModel>? appointments;
  final List<ConsultModel>? consults;
  final String? message;

  ScheduleRepositoryResponse({
    required this.error,
    this.schedule,
    this.appointments,
    this.message,
    this.consults
  });
}

enum WeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thrusday,
  Friday,
  Saturday,
  Sunday
}

class SchedulePageRepository {
  final dio = DioInstace.dio;

  Future<ScheduleRepositoryResponse> loadSchedule(int medicID, WeekDay weekDay ) async {
    try {
      List<ScheduleModel> schedules = [];
      final response = await dio.get('/medic-schedule?medicID=$medicID&week_day=$weekDay', 
        options: Options(
          followRedirects: false,
          validateStatus: (status) {
            return status! < 500;
          },
        )
      );

      for (var schedule in List.from(response.data)) {
        schedules.add(ScheduleModel.fromMap(schedule));
      }

      return ScheduleRepositoryResponse(
        error: false,
        schedule: schedules
      );
    } catch (error) {
      return ScheduleRepositoryResponse(error: true, message: "Ocorreu um Erro");
    }
  }

  Future<ScheduleRepositoryResponse> loadConsults(int medicID) async {
    try {
      List<ConsultModel> consults = [];
      final response = await dio.get('/consult-type?medicID=$medicID',
          options: Options(
            followRedirects: false,
            validateStatus: (status) {
              return status! < 500;
            },
          )
        );

      for (var consult in List.from(response.data)) {
        consults.add(ConsultModel.fromMap(consult));
      }

      return ScheduleRepositoryResponse(
        error: false,
        consults: consults
      );
    } catch (error) {
      return ScheduleRepositoryResponse(
        error: true,
        message: "Ocorreu um Erro"
      );
    }
  }

  Future<ScheduleRepositoryResponse> loadDayAppointments(int medicID, String date) async {
    // Date =>  01/31/2021 mes-dia-ano
    try {
      List<AppointmentModel> appointments = [];

      final response = await dio.get('/appointments?medicID=$medicID&date=$date',
        options: Options(
          followRedirects: false,
          validateStatus: (status) {
            return status! < 500;
          },
        )
      );

      for (var appointment in List.from(response.data)){
        appointments.add(AppointmentModel.fromMap(appointment));
      }

      return ScheduleRepositoryResponse(error: false, appointments: appointments);
    } catch (error) {
      return ScheduleRepositoryResponse(error: true, message: "Ocorreu um erro");
    }
  }
}