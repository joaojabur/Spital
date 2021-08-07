import 'package:Spital/Screens/Home/Widget/TabPages/TabPagePerson/profile_client/Widget/change_image.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPagePerson/profile_client/controller/controller.dart';
import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';

import 'package:provider/provider.dart';

class ProfileClient extends StatefulWidget {
  const ProfileClient({Key? key}) : super(key: key);

  @override
  _ProfileClientState createState() => _ProfileClientState();
}

class _ProfileClientState extends State<ProfileClient> {
  bool ativo = false;
  final _formkey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    AuthController auth = Provider.of<AuthController>(context);
    ControllerEditdataBaseProfileClient editcontroller =
        ControllerEditdataBaseProfileClient();
    AuthController authController = Provider.of<AuthController>(context);
    return SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Observer(builder: (_) {
          return Container(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 20),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                              padding: const EdgeInsets.only(top: 0),
                              child: ativo == true
                                  ? Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              right: 30, bottom: 20, top: 10),
                                          child: PhysicalModel(
                                            color: ativo == false
                                                ? Colors.grey
                                                : Colors.blue,
                                            elevation: 3,
                                            borderRadius:
                                                BorderRadius.circular(50),
                                            child: Container(
                                              decoration: BoxDecoration(
                                                  color: Colors.white,
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          50)),
                                              child: IconButton(
                                                  onPressed: () {},
                                                  icon: Icon(
                                                    Icons.done,
                                                    size: 30,
                                                  )),
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              right: 30, bottom: 0),
                                          child: PhysicalModel(
                                            color: ativo == false
                                                ? Colors.grey
                                                : Colors.blue,
                                            elevation: 3,
                                            borderRadius:
                                                BorderRadius.circular(50),
                                            child: Container(
                                              decoration: BoxDecoration(
                                                  color: Colors.white,
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          50)),
                                              child: IconButton(
                                                  onPressed: () {
                                                    print(ativo);
                                                    setState(() {
                                                      ativo = false;
                                                    });
                                                  },
                                                  icon: Icon(
                                                    Ionicons.close,
                                                    size: 30,
                                                  )),
                                            ),
                                          ),
                                        ),
                                      ],
                                    )
                                  : SizedBox(
                                      width: 78,
                                    )),
                          Padding(
                            padding: const EdgeInsets.only(top: 0, left: 0),
                            child: SizedBox(
                                width: 170,
                                height: 170,
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(100),
                                  child: ChangeImage(
                                    change: true,
                                    authController: authController,
                                  ),
                                )),
                          ),
                          Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(
                                    left: 20, bottom: 20, top: 10),
                                child: PhysicalModel(
                                  color: ativo == false
                                      ? Colors.grey
                                      : Colors.blue,
                                  elevation: 3,
                                  borderRadius: BorderRadius.circular(50),
                                  child: Container(
                                    decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius:
                                            BorderRadius.circular(50)),
                                    child: IconButton(
                                        onPressed: () async {
                                          await auth.logout();

                                          Navigator.pushReplacementNamed(context, '/splash');
                                        },
                                        icon: Icon(
                                          Icons.logout_outlined,
                                          size: 30,
                                        )),
                                  ),
                                ),
                              ),
                              Padding(
                                  padding: const EdgeInsets.only(
                                      left: 20, bottom: 0),
                                  child: ativo == false
                                      ? PhysicalModel(
                                          color: ativo == false
                                              ? Colors.grey
                                              : Colors.blue,
                                          elevation: 3,
                                          borderRadius:
                                              BorderRadius.circular(50),
                                          child: Container(
                                            decoration: BoxDecoration(
                                                color: Colors.white,
                                                borderRadius:
                                                    BorderRadius.circular(50)),
                                            child: IconButton(
                                                onPressed: () {
                                                  print(ativo);
                                                  setState(() {
                                                    ativo = true;
                                                  });
                                                },
                                                icon: Icon(
                                                  Ionicons.pencil_outline,
                                                  size: 30,
                                                )),
                                          ),
                                        )
                                      : null),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 10, bottom: 50),
                  child: Form(
                    key: _formkey,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        children: [
                          TextFormField(
                            initialValue:
                                "${authController.user!.firstName} ${authController.user!.lastName}",
                            validator: (value) {
                              if (value == "") {
                                return "campo obrigatorio";
                              }
                              return null;
                            },
                            onChanged: null,
                            decoration: InputDecoration(
                                enabled: ativo,
                                labelText: "Nome",
                                labelStyle: TextStyle(
                                    color: ativo == false
                                        ? Colors.black
                                        : AppColors.blue),
                                //bordas
                                errorBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.red)),
                                border: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                disabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: AppColors.blueTransparent),
                                )),
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          TextFormField(
                            initialValue:
                                "${authController.user!.phoneNumber} ",
                            validator: (value) {
                              if (value == "") {
                                return "campo obrigatorio";
                              }
                              return null;
                            },
                            onChanged: null,
                            decoration: InputDecoration(
                                enabled: ativo,
                                labelText: "Número de Telefone",
                                labelStyle: TextStyle(
                                    color: ativo == false
                                        ? Colors.black
                                        : AppColors.blue),
                                //bordas
                                errorBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.red)),
                                border: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                disabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: AppColors.blueTransparent),
                                )),
                          ),
                          TextFormField(
                            initialValue: "${authController.user!.email}",
                            validator: (value) {
                              if (value == "") {
                                return "campo obrigatorio";
                              }
                              return null;
                            },
                            onChanged: null,
                            decoration: InputDecoration(
                                labelText: "Email",
                                labelStyle: TextStyle(color: Colors.black),
                                enabled: false,
                                //bordas
                                errorBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.red)),
                                border: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: ativo == false
                                          ? Colors.grey
                                          : AppColors.blue),
                                ),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.grey),
                                ),
                                disabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.grey),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: AppColors.blueTransparent),
                                )),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        }));
  }
}
