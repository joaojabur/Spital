import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';

class ProfileClient extends StatefulWidget {
  const ProfileClient({Key? key}) : super(key: key);

  @override
  _ProfileClientState createState() => _ProfileClientState();
}

class _ProfileClientState extends State<ProfileClient> {
  final _formkey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    AuthController authController = Provider.of<AuthController>(context);
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Container(
        child: Column(
          children: [
            /*
            SizedBox(
                width: 100,
                height: 100,
                child: PhysicalModel(
                  color: Colors.grey,
                  elevation: 50,
                  child: Container(
                      decoration: BoxDecoration(
                    image: DecorationImage(
                      fit: BoxFit.fill,
                      image: NetworkImage(
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8XHqFiMUSI-60HzeGGPXSr1iTl89nxktLrw&usqp=CAU"),
                    ),
                  )),
                )),*/
            Form(
              key: _formkey,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    TextFormField(
                      initialValue:
                          "${authController.user!.firstName} ${authController.user!.lastName}",
                      validator: (value) {
                        if (value == "") {
                          return "campo obrigatorio";
                        }
                        return "";
                      },
                      onChanged: null,
                      decoration: InputDecoration(
                          labelText: "Nome",

                          //bordas
                          errorBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.red)),
                          border: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          disabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide:
                                BorderSide(color: AppColors.blueTransparent),
                          )),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      initialValue: "${authController.user!.phoneNumber} ",
                      validator: (value) {
                        if (value == "") {
                          return "campo obrigatorio";
                        }
                        return "";
                      },
                      onChanged: null,
                      decoration: InputDecoration(
                          labelText: "Número de Telefone",

                          //bordas
                          errorBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.red)),
                          border: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          disabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide:
                                BorderSide(color: AppColors.blueTransparent),
                          )),
                    ),
                    TextFormField(
                      initialValue: "${authController.user!.email}",
                      validator: (value) {
                        if (value == "") {
                          return "campo obrigatorio";
                        }
                        return "";
                      },
                      onChanged: null,
                      decoration: InputDecoration(
                          labelText: "Email",

                          //bordas
                          errorBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.red)),
                          border: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          disabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.grey),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide:
                                BorderSide(color: AppColors.blueTransparent),
                          )),
                    ),
                    ButtonWidget(
                        textButon: "Salvar",
                        onpressed: () {
                          if (_formkey.currentState!.validate()) {}
                        })
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
