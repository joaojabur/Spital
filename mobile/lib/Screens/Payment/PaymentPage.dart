import 'package:Spital/Screens/Payment/controller/payment_page_controller.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_credit_card_brazilian/flutter_credit_card.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

class PaymentPage extends StatefulWidget {
  PaymentPage({Key? key}) : super(key: key);

  @override
  _PaymentPageState createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> { 
  final PaymentPageController controller = PaymentPageController();
  FocusNode _focus = new FocusNode();
  final maskFormatterExpiration = new MaskTextInputFormatter(mask: 'MM/MM', filter: { "M": RegExp(r'[0-9]')});
  final maskFormatterCardNumber = new MaskTextInputFormatter(mask: 'XXXX XXXX XXXX XXXX', filter: { "X": RegExp(r'[0-9]')});

  @override
  void initState(){
    super.initState();
    _focus.addListener(() {
      controller.toggleBackView(_focus.hasFocus);
    });
  }
  @override
  Widget build(BuildContext context) {
    final appointment =  ModalRoute.of(context)!.settings.arguments as AppointmentModel;
    print(appointment);
    
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar:  AppbarSecundaria(
          topleftIcon: true,
          iconLeft: Ionicons.chevron_back_outline,
          onpressed: () {
            Navigator.pop(context);
          },
          title: "Agendar Consultar",
          width: width,
          value: 0.13,
          height: height
      ),
      body: Center(
        child: Observer(
          builder: (_) {
            return Column(
              children: [
                CreditCardWidget(
                  cardNumber: controller.cardNumber,
                  expiryDate: controller.expiryDate, 
                  cardHolderName: controller.cardHolderName,
                  cvvCode: controller.cvvCode,
                  showBackView: controller.isCvvFocused,
                  animationDuration: Duration(milliseconds: 700),
                ),
                SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: TextField(
                            decoration: InputDecoration(
                              labelText: "Nome Completo",
                              border: OutlineInputBorder()
                            ),
                            onChanged: controller.changeCardHolderName,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                           child: TextField(
                              decoration: InputDecoration(
                                labelText: "Número do cartão",
                                border: OutlineInputBorder()
                              ),
                              onChanged: controller.changeCardNumber,
                          ),
                        ),
                        Padding(
                           padding: const EdgeInsets.only(top: 8.0),
                           child: TextField(
                            inputFormatters: [maskFormatterExpiration],
                            decoration: InputDecoration(
                              labelText: "Data de Vencimento",
                              border: OutlineInputBorder()
                            ),
                            onChanged: controller.changeExpiryDate,
                           ),
                         ),
                         Padding(
                           padding: const EdgeInsets.only(top: 8.0),
                           child: TextField(
                            decoration: InputDecoration(
                              labelText: "Código de Segurança",
                              border: OutlineInputBorder()
                            ),
                            focusNode: _focus,
                            onChanged: controller.changeCvvCode,
                           ),
                         ),
                      ],
                    ),
                  ),
                )
              ],
            );
          }
        )
      )
    );
  }
}