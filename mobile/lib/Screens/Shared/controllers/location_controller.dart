import 'package:geolocator/geolocator.dart';
import 'package:mobx/mobx.dart';
part 'location_controller.g.dart';

class LocationController = _LocationControllerBase with _$LocationController;

abstract class _LocationControllerBase with Store {
    @observable
    Position? position;

    @action
    setPosition(Position value){
      position = value;
      print(position!.latitude);
      print(position!.longitude);
    }
}