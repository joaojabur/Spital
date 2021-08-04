import 'package:mobx/mobx.dart';
part 'payment_page_controller.g.dart';

class PaymentPageController = _PaymentPageControllerBase with _$PaymentPageController;

abstract class _PaymentPageControllerBase with Store {
  @observable
  String cardNumber = "";
  @observable
  String expiryDate = ""; 
  @observable
  String cardHolderName = "";
  @observable
  String cvvCode = "";
  @observable
  bool isCvvFocused = false;

  @action
  changeCardNumber(String value){
    cardNumber = value;
  }

  @action
  changeExpiryDate(String value){
    expiryDate = value;
  }

  @action
  changeCardHolderName(String value){
    cardHolderName = value;
  }

  @action
  changeCvvCode(String value){
    cvvCode = value;
  }

  @action
  toggleBackView(bool value){
    isCvvFocused = value;
  }
}