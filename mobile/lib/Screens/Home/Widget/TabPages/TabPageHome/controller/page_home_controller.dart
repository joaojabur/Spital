import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:mobx/mobx.dart';
part 'page_home_controller.g.dart';

class PageHomeController = _PageHomeControllerBase with _$PageHomeController;

abstract class _PageHomeControllerBase with Store {
  @observable
  AuthController? authController;

  getUserFirstName() => authController!.user!.firstName;
  getUserImage() => authController!.imageActual;
}
