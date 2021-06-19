import 'package:Spital/Screens/Register/TabRegister/TabFinal/tab_final.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:provider/provider.dart';

class PageRegisterThird extends StatefulWidget {
  const PageRegisterThird({Key? key}) : super(key: key);

  @override
  _PageRegisterThirdState createState() => _PageRegisterThirdState();
}

class _PageRegisterThirdState extends State<PageRegisterThird> {
  final _formkey = GlobalKey<FormState>();
  final maskFormatterDate = MaskTextInputFormatter(
      mask: '##/##/####', filter: {"#": RegExp(r'[0-9]')});

  final maskFormatterPhoneNumber = MaskTextInputFormatter(
      mask: '(##) ####-#####', filter: {"#": RegExp(r'[0-9]')});

  @override
  Widget build(BuildContext context) {
    RegisterController registercontroller =
        Provider.of<RegisterController>(context);
    RegisterController controller = Provider.of<RegisterController>(context);
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 100),
            child: Container(
              margin: EdgeInsets.only(right: 80, bottom: 10),
              child: Text(
                "3.Seu Telefone",
                style: AppTextStyles.titleBold,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
            child: Observer(
              builder: (_) {
                return Column(
                  children: [
                    Form(
                      key: _formkey,
                      child: Column(
                        children: [
                          TextFormField(
                            inputFormatters: [maskFormatterPhoneNumber],
                            initialValue: controller.phoneNumber,
                            validator: registercontroller.validatePhoneNumber,
                            onChanged: controller.changePhoneNumber,
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              labelText: "Telefone",

                              hintText: "Telefone",

                              //bordas
                              errorBorder: OutlineInputBorder(
                                  borderSide: BorderSide(color: Colors.red)),
                              border: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.blue),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.blue),
                              ),
                              disabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.blue),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 20),
                            child: Container(
                              margin: EdgeInsets.only(left: 0, bottom: 10),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "4.Registro",
                                    style: AppTextStyles.titleBold,
                                  ),
                                ],
                              ),
                            ),
                          ),
                          TextFormField(
                            inputFormatters: [maskFormatterDate],
                            initialValue: controller.birthdate,
                            validator: registercontroller.validateBirthDate,
                            keyboardType: TextInputType.datetime,
                            onChanged: controller.changeBirthDate,
                            decoration: InputDecoration(
                              labelText: "Data de Nascimento",

                              hintText: "Dia/Mês/Ano",

                              //bordas
                              errorBorder: OutlineInputBorder(
                                  borderSide: BorderSide(color: Colors.red)),
                              border: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.blue),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.blue),
                              ),
                              disabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.blue),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    ButtonWidget(
                        textButon: "Próximo",
                        onpressed: () {
                          if (_formkey.currentState!.validate()) {
                            registercontroller.tabRegisterIndex == 3
                                ? Navigator.pushReplacement(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            TabRegisterFinal()))
                                : registercontroller.changePageRegister(
                                    registercontroller.tabRegisterIndex! + 1);
                          }
                        })
                  ],
                );
              },
            ),
          )
        ],
      ),
    );
  }
}
