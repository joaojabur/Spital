import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/controller/repository.dart';
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/Screens/Shared/controllers/location_controller.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class ListDoctorController = _ListDoctorControllerBase with _$ListDoctorController;

abstract class _ListDoctorControllerBase with Store {
  ListDoctorRepository _repository = ListDoctorRepository();
  @observable
  ObservableList<MedicModel> medics = ObservableList<MedicModel>();

  @action
  loadMedics(String area, Position location, int maxDistance, String? name, int offset) async {
    ResponseListDoctor response = await _repository.loadMedicsByArea(area, location, maxDistance, name, offset);

    if (response.error){

    } else {
      medics = response.medics!.asObservable();
    }
  }
}