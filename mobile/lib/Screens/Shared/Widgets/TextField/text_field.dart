import 'package:Spital/Screens/Shared/Widgets/TextField/controller/text_field_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';

class TextFormFieldPage extends StatefulWidget {
  final onchanged;
  TextInputType keyboard;
  bool obscureText;
  int maxLength;
  final String labeltext;

  final String Function() erroText;

  TextFormFieldPage({
    Key? key,
    required this.onchanged,
    this.obscureText = false,
    this.keyboard = TextInputType.multiline,
    this.maxLength = 0,
    required this.labeltext,
    required this.erroText,
  }) : super(key: key);

  @override
  _TextFormFieldPageState createState() => _TextFormFieldPageState();
}

class _TextFormFieldPageState extends State<TextFormFieldPage> {
  TextFieldController controller = TextFieldController();

  @override
  Widget build(BuildContext context) {
    bool obscureText = this.widget.obscureText;
    int maxLength = this.widget.maxLength;

    return Observer(builder: (_) {
      return Column(
        children: [
          TextFormField(
            maxLength: maxLength == 0 ? null : maxLength,
            onChanged: widget.onchanged,
            obscureText: obscureText ? controller.obscure : false,
            keyboardType: this.widget.keyboard,
            decoration: InputDecoration(
              labelText: widget.labeltext,
              errorText: widget.erroText() == "" ? null : widget.erroText(),
              hintText: widget.labeltext,
              prefixText: "",

              //bordas
              errorBorder:
                  OutlineInputBorder(borderSide: BorderSide(color: Colors.red)),
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
        ],
      );
    });
  }
}
