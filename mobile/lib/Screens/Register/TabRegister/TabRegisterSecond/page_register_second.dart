import 'package:Spital/Screens/Register/TabRegister/TabFinal/tab_final.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextFormField/controller/text_form_field_controller.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';

class PageRegisterSecond extends StatefulWidget {
  const PageRegisterSecond({Key? key}) : super(key: key);

  @override
  _PageRegisterSecondState createState() => _PageRegisterSecondState();
}

class _PageRegisterSecondState extends State<PageRegisterSecond> {
  bool obscureText = true;

  bool obscureText2 = true;
  final _formkey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    RegisterController registercontroller =
        Provider.of<RegisterController>(context);
    TextFieldController obscureControler = TextFieldController();

    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
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
                return Column(
                  children: [
                    Form(
                      key: _formkey,
                      child: Column(
                        children: [
                          TextFormField(
                            initialValue: registercontroller.email,
                            validator: registercontroller.validateEmail,
                            onChanged: registercontroller.changeEmail,
                            decoration: InputDecoration(
                              labelText: "Email",
                              hintText: "Email",

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
                          SizedBox(
                            height: 20,
                          ),
                          TextFormField(
                            initialValue: registercontroller.password,
                            validator: registercontroller.validatePassWord,
                            onChanged: registercontroller.changePassoword,
                            obscureText:
                                obscureText ? obscureControler.obscure : false,
                            decoration: InputDecoration(
                              labelText: "Senha",

                              hintText: "Senha",
                              suffixIcon: obscureText
                                  ? IconButton(
                                      splashColor: Colors.transparent,
                                      hoverColor: Colors.transparent,
                                      highlightColor: Colors.transparent,
                                      focusColor: Colors.transparent,
                                      icon: (Icon(obscureControler.obscure
                                          ? Ionicons.eye_off_outline
                                          : Ionicons.eye_outline)),
                                      onPressed: obscureControler.toggleObscure,
                                    )
                                  : null,

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
                          SizedBox(
                            height: 20,
                          ),
                          TextFormField(
                            initialValue: registercontroller.confirmPassword,
                            validator:
                                registercontroller.validateConfirmPassWord,
                            onChanged:
                                registercontroller.changeConfirmPassoword,
                            obscureText: obscureText2
                                ? obscureControler.obscure2
                                : false,
                            decoration: InputDecoration(
                              suffixIcon: obscureText2
                                  ? IconButton(
                                      splashColor: Colors.transparent,
                                      hoverColor: Colors.transparent,
                                      highlightColor: Colors.transparent,
                                      focusColor: Colors.transparent,
                                      icon: (Icon(obscureControler.obscure2
                                          ? Ionicons.eye_off_outline
                                          : Ionicons.eye_outline)),
                                      onPressed:
                                          obscureControler.toggleObscure2,
                                    )
                                  : null,
                              labelText: "Confirma senha",

                              hintText: "Confirma senha",

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
              }))
        ],
      ),
    );
  }
}
