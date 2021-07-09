
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:dio/dio.dart';
import 'package:geolocator/geolocator.dart';


class ResponseListDoctor {
  final bool error;
  final String? message;
  final List<MedicModel>? medics;

  ResponseListDoctor({
    required this.error, 
    this.message, 
    this.medics
  });
}

class ListDoctorRepository {
  final Dio dio = Dio(BaseOptions(baseUrl: "http://192.168.1.10:3333"));

  Future<ResponseListDoctor> loadMedicsByArea(String area, Position location, int maxDistance, String? name, int offset ) async {
    try {
      List<MedicModel> medics = [];
      area = area.replaceAll(' ', '-').replaceAll('\n', '');
      final response = await dio.get(
          '/medics/$area/?offset=$offset&lat=${location.latitude}&lon=${location.longitude}&distance=${maxDistance}', 
          options: Options(
            followRedirects: false,
            validateStatus: (status) {
              return status! < 500;
            },
          )
      );

      for (var medic in List.from(response.data)){
        medics.add(MedicModel.fromMap(medic));
      }

      return ResponseListDoctor(
        error: false,
        medics: medics
      );
    } catch(e){
      return ResponseListDoctor(
        error: true,
        message: "Um erro ocorreu" 
      );
    }
  }

}