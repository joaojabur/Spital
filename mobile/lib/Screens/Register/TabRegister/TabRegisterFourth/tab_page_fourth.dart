import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/buttom_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextField/text_form_field.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

class PageRegisterFourth extends StatefulWidget {
  const PageRegisterFourth({Key? key}) : super(key: key);

  @override
  _PageRegisterFourthState createState() => _PageRegisterFourthState();
}

class _PageRegisterFourthState extends State<PageRegisterFourth> {
  @override
  Widget build(BuildContext context) {
    RegisterController controller = Provider.of<RegisterController>(context);
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 100),
            child: Container(
              margin: EdgeInsets.only(left: 30, bottom: 30),
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
          Container(
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
            child: Observer(builder: (_) {
              return TextFormFieldPage(
                // obscureText: false,
                onchanged: controller.changeBirthDate,
                labeltext: "Dia/Mês/Ano",
                erroText: controller.validateBirthDate,
                keyboard: TextInputType.datetime,
                maxLength: 8,
              );
            }),
          ),
          ButtuomWidget(
            textButom: "Próximo",
            erroText: controller.validateBirthDate,
          )
        ],
      ),
    );
  }
}
