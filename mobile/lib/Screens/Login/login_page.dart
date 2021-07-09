import 'package:Spital/Screens/Login/controller/controller.dart';
import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/Screens/Shared/Widgets/TextFormField/controller/text_form_field_controller.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool obscureText = true;

  final _formKey = GlobalKey<FormState>();
  late LoginController loginController = LoginController();
  @override
  Widget build(BuildContext context) {
    TextFieldController obscureControler = TextFieldController();
    loginController.form = _formKey;
    loginController.authController = Provider.of<AuthController>(context);
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: NestedScrollView(
        physics: NeverScrollableScrollPhysics(),
        headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
          return <Widget>[
            SliverAppBar(
              shape: RoundedRectangleBorder(
                borderRadius:
                    BorderRadius.only(bottomRight: Radius.circular(40)),
              ),
              shadowColor: Colors.transparent,
              backgroundColor: AppColors.blueTransparent,
              expandedHeight: 200,
              pinned: true,
              floating: true,
              centerTitle: true,
              leading: Container(
                margin: EdgeInsets.only(left: 15, right: 0, top: 5, bottom: 12),
                width: 50,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: Colors.white),
                child: Padding(
                  padding: EdgeInsets.only(right: 15),
                  child: IconButton(
                      icon: Icon(Ionicons.chevron_back_outline),
                      color: AppColors.darkBlue,
                      onPressed: () {
                        Navigator.pop(context);
                      }),
                ),
              ),
              flexibleSpace: FlexibleSpaceBar(
                background: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(top: 35, right: 30),
                      child: Center(
                        child: Text(
                            "Entre na sua conta\npara intermediarmos\nsua consulta",
                            style: AppTextStyles.titleBold2),
                      ),
                    ),
                  ],
                ),
                // title: Text(title),
                centerTitle: true,
              ),
            ),
          ];
        },
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 100),
                child: Container(
                  margin: EdgeInsets.only(right: 20, bottom: 30),
                  child: Text(
                    "Entrar",
                    style: AppTextStyles.titleBold,
                  ),
                ),
              ),
              Container(
                  margin: EdgeInsets.symmetric(vertical: 10, horizontal: 30),
                  child: Observer(builder: (_) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              TextFormField(
                                validator: (value) {
                                  if (value!.isEmpty) {
                                    return "Este campo é obrigatorio";
                                  } else if (!value.contains("@")) {
                                    return "Este não é um email valido";
                                  }
                                },
                                onChanged: loginController.changeEmail,
                                decoration: InputDecoration(
                                  labelText: "Email",
                                  hintText: "Email",

                                  //bordas
                                  errorBorder: OutlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.red)),
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
                              Observer(builder: (_) {
                                return TextFormField(
                                  validator: (value) {
                                    if (value!.isEmpty) {
                                      return "Este campo é obrigatorio";
                                    } //else if (value.length <= 7) {
                                    //return "A senha deve conter no mínimo 8 caracteres";
                                    // }
                                  },
                                  onChanged: loginController.changePassword,
                                  obscureText: obscureText
                                      ? obscureControler.obscure
                                      : false,
                                  decoration: InputDecoration(
                                    suffixIcon: obscureText
                                        ? IconButton(
                                            splashColor: Colors.transparent,
                                            hoverColor: Colors.transparent,
                                            highlightColor: Colors.transparent,
                                            focusColor: Colors.transparent,
                                            icon: (Icon(obscureControler.obscure
                                                ? Ionicons.eye_off_outline
                                                : Ionicons.eye_outline)),
                                            onPressed:
                                                obscureControler.toggleObscure,
                                          )
                                        : null,

                                    labelText: "senha",

                                    hintText: "senha",

                                    //bordas
                                    errorBorder: OutlineInputBorder(
                                        borderSide:
                                            BorderSide(color: Colors.red)),
                                    border: OutlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.blue),
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.blue),
                                    ),
                                    disabledBorder: OutlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.blue),
                                    ),
                                  ),
                                );
                              })
                            ],
                          ),
                        ),
                        ButtonWidget(
                            textButon: "Login",
                            onpressed: () async {
                              if (_formKey.currentState!.validate()) {
                                if (await loginController.login() == ''){
                                  Navigator.pushReplacementNamed(context, '/');
                                }
                              }
                            })
                      ],
                    );
                  }))
            ],
          ),
        ),
      ),
    );
  }
}
