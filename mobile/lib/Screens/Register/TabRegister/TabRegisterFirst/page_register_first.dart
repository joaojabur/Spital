import 'package:Spital/Screens/Register/TabRegister/TabFinal/tab_final.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
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
  final _formkey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    RegisterController registercontroller =
        Provider.of<RegisterController>(context);

    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
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
              return Column(
                children: [
                  Form(
                    key: _formkey,
                    child: Column(
                      children: [
                        TextFormField(
                          initialValue: registercontroller.firstName,
                          validator: registercontroller.validateFirstName,
                          onChanged: registercontroller.changeFirstname,
                          decoration: InputDecoration(
                            labelText: "Nome",

                            hintText: "Nome",

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
                          initialValue: registercontroller.lastName,
                          validator: registercontroller.validateLastName,
                          onChanged: registercontroller.changelastName,
                          decoration: InputDecoration(
                            labelText: "Sobrenome",

                            hintText: "Sobrenome",

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
                                      builder: (context) => TabRegisterFinal()))
                              : registercontroller.changePageRegister(
                                  registercontroller.tabRegisterIndex! + 1);
                        }
                      })
                ],
              );
            }))
      ]),
    );
  }
}
