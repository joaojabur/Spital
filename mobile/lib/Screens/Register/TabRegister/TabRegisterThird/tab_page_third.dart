import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextField/text_field.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

class PageRegisterThird extends StatefulWidget {
  const PageRegisterThird({Key? key}) : super(key: key);

  @override
  _PageRegisterThirdState createState() => _PageRegisterThirdState();
}

class _PageRegisterThirdState extends State<PageRegisterThird> {
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
                "3.Seu Telefone",
                style: AppTextStyles.titleBold,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
            child: Observer(builder: (_) {
              return TextFormFieldPage(
                // obscureText: false,
                onchanged: controller.changePhoneNumber,
                labeltext: "Telefone",
                erroText: controller.validatePhoneNumber,
                keyboard: TextInputType.number,
                maxLength: 11,
              );
            }),
          ),
          ButtuomWidget(
            textButom: "Próximo",
            erroText: controller.validatePhoneNumber,
          )
        ],
      ),
    );
  }
}
