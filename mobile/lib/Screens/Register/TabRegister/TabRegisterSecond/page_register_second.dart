import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextField/text_field.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

class PageRegisterSecond extends StatefulWidget {
  const PageRegisterSecond({Key? key}) : super(key: key);

  @override
  _PageRegisterSecondState createState() => _PageRegisterSecondState();
}

class _PageRegisterSecondState extends State<PageRegisterSecond> {
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
              margin: EdgeInsets.only(right: 20, bottom: 30),
              child: Text(
                "2.Suas credenciais",
                style: AppTextStyles.titleBold,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
            child: Observer(builder: (_) {
              return TextFormFieldPage(
                // obscureText: false,
                onchanged: controller.changeEmail,
                labeltext: "Email",
                erroText: controller.validateEmail, maxLength: 0,
              );
            }),
          ),
          Container(
              margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
              child: Observer(builder: (_) {
                return TextFormFieldPage(
                  obscureText: controller.obscureText,
                  onchanged: controller.changePassoword,
                  labeltext: "senha",
                  erroText: controller.validatePassWord,
                  maxLength: 0,
                );
              })

              //controller:
              ),
          Container(
              margin: EdgeInsets.only(top: 10, left: 30, right: 30),
              child: Observer(builder: (_) {
                return TextFormFieldPage(
//obscureText: true,

                  onchanged: controller.changeConfirmPassoword,
                  labeltext: "Confirma senha",
                  erroText: controller.validateConfirmPassWord,

                  obscureText: true, maxLength: 0,
                );
              })

              //controller:
              ),
          ButtuomWidget(
            textButom: "Próximo",
            erroText: controller.validateCredenciais,
          )
        ],
      ),
    );
  }
}
