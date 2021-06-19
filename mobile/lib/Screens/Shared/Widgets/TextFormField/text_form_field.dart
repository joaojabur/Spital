import 'package:Spital/Screens/Register/TabRegister/TabFinal/tab_final.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextFormField/controller/text_form_field_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';

class TextFormFieldPage extends StatefulWidget {
  final void Function()? onpressed;
  final onchanged;
  final String textButon;
  TextInputType keyboard;
  bool obscureText;

  int maxLength;
  final String labeltext;

  final String Function() erroText;

  String? Function(String?) validator;

  TextFormFieldPage({
    Key? key,
    required this.onchanged,
    this.obscureText = false,
    this.keyboard = TextInputType.multiline,
    this.maxLength = 0,
    required this.labeltext,
    required this.erroText,
    required this.validator,
    this.onpressed,
    required this.textButon,
  }) : super(key: key);

  @override
  _TextFormFieldPageState createState() => _TextFormFieldPageState();
}

class _TextFormFieldPageState extends State<TextFormFieldPage> {
  final _formkey = GlobalKey<FormState>();

  TextFieldController controller = TextFieldController();

  @override
  Widget build(BuildContext context) {
    RegisterController registercontroller =
        Provider.of<RegisterController>(context);
    bool obscureText = this.widget.obscureText;
    int maxLength = this.widget.maxLength;
    String? Function(String?)? validator = widget.validator;

    return Observer(builder: (_) {
      return Column(
        children: [
          Form(
            key: _formkey,
            child: TextFormField(
              validator: (value) {
                if (value!.isEmpty) return "campo Obrigatorio";
              },
              maxLength: maxLength == 0 ? null : maxLength,
              onChanged: widget.onchanged,
              obscureText: obscureText ? controller.obscure : false,
              keyboardType: this.widget.keyboard,
              decoration: InputDecoration(
                labelText: widget.labeltext,
                // errorText: widget.erroText() == "" ? null : widget.erroText(),
                hintText: widget.labeltext,

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
                suffixIcon: widget.obscureText
                    ? IconButton(
                        splashColor: Colors.transparent,
                        hoverColor: Colors.transparent,
                        highlightColor: Colors.transparent,
                        focusColor: Colors.transparent,
                        icon: (Icon(controller.obscure
                            ? Ionicons.eye_off_outline
                            : Ionicons.eye_outline)),
                        onPressed: controller.toggleObscure,
                      )
                    : null,
              ),
            ),
          ),
          Container(
              child: widget.textButon == ""
                  ? null
                  : ButtonWidget(
                      textButon: widget.textButon,
                      onpressed: () {
                        if (_formkey.currentState!.validate()) {
                          registercontroller.tabRegisterIndex == 4
                              ? Navigator.pushReplacement(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => TabRegisterFinal()))
                              : registercontroller.changePageRegister(
                                  registercontroller.tabRegisterIndex! + 1);
                        }
                      },
                    ))
        ],
      );
    });
  }
}
