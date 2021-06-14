import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/buttom_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextField/text_form_field.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

class PageRegisterFirst extends StatefulWidget {
  const PageRegisterFirst({Key? key}) : super(key: key);

  @override
  _PageRegisterFirstState createState() => _PageRegisterFirstState();
}

class _PageRegisterFirstState extends State<PageRegisterFirst> {
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
              margin: EdgeInsets.only(right: 80, bottom: 30),
              child: Text(
                "1.Quem é você",
                style: AppTextStyles.titleBold,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
            child: Observer(builder: (_) {
              return TextFormFieldPage(
                // obscureText: false,
                onchanged: controller.changeFirstname,
                labeltext: "Nome",
                erroText: controller.validateFirstName, maxLength: 0,
              );
            }),
          ),
          Container(
              margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
              child: Observer(builder: (_) {
                return TextFormFieldPage(
                  onchanged: controller.changelastName,
                  labeltext: "Sobrenome",
                  erroText: controller.validateLastName,
                  maxLength: 0,
                );
              })

              //controller:
              ),
          ButtuomWidget(
            textButom: "Próximo",
            erroText: controller.validateNameCompleted,
          )
        ],
      ),
    );
  }
}
