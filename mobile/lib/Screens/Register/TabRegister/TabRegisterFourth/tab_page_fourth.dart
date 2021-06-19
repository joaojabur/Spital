import 'package:Spital/Screens/Register/TabRegister/TabFinal/tab_final.dart';
import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/button_widget.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';

class PageRegisterFourth extends StatefulWidget {
  const PageRegisterFourth({Key? key}) : super(key: key);

  @override
  _PageRegisterFourthState createState() => _PageRegisterFourthState();
}

class _PageRegisterFourthState extends State<PageRegisterFourth> {
  @override
  Widget build(BuildContext context) {
    RegisterController registercontroller =
        Provider.of<RegisterController>(context);
    RegisterController controller = Provider.of<RegisterController>(context);

    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 100),
            child: Container(
              margin: EdgeInsets.only(right: 0, bottom: 30),
              child: Text(
                "5.Revise seus dados",
                style: AppTextStyles.titleBold,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(horizontal: 30),
            child: Observer(
              builder: (_) {
                var value = controller.isOpen;

                print(value);
                return ExpansionPanelList(
                  expandedHeaderPadding: EdgeInsets.all(8),
                  animationDuration: Duration(seconds: 1),
                  elevation: 1,
                  children: [
                    ExpansionPanel(
                      canTapOnHeader: false,
                      headerBuilder: (context, isOpen) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 10, top: 10),
                          child: Text(
                            "Nome",
                            style: AppTextStyles.reviewUserTitle,
                          ),
                        );
                      },
                      body: Column(
                        children: [
                          Row(
                            children: [
                              Padding(
                                padding:
                                    const EdgeInsets.only(left: 20, bottom: 5),
                                child: Text(
                                  " Nome: ${controller.firstName} ${controller.lastName}",
                                ),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Container(
                                width: 50,
                                margin: EdgeInsets.only(right: 20, bottom: 15),
                                decoration: BoxDecoration(
                                  color: AppColors.darkBlue,
                                  borderRadius: BorderRadius.circular(100),
                                ),
                                child: IconButton(
                                  onPressed: () {
                                    controller.changePageRegister(
                                        controller.tabRegisterIndex! - 3);
                                  },
                                  icon: Icon(Ionicons.pencil),
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      isExpanded: value[0],
                    ),
                    ExpansionPanel(
                      canTapOnHeader: false,
                      headerBuilder: (context, isOpen) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 10, top: 10),
                          child: Text(
                            "Credenciais",
                            style: AppTextStyles.reviewUserTitle,
                          ),
                        );
                      },
                      body: Column(
                        children: [
                          Row(
                            children: [
                              Padding(
                                padding:
                                    const EdgeInsets.only(left: 20, bottom: 5),
                                child: Text(
                                  "Email: ${controller.email}\n \nSenha: ${'*' * controller.password!.length}",
                                ),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Container(
                                width: 50,
                                margin: EdgeInsets.only(right: 20, bottom: 15),
                                decoration: BoxDecoration(
                                  color: AppColors.darkBlue,
                                  borderRadius: BorderRadius.circular(100),
                                ),
                                child: IconButton(
                                  onPressed: () {
                                    controller.changePageRegister(
                                        controller.tabRegisterIndex! - 2);
                                  },
                                  icon: Icon(Ionicons.pencil),
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      isExpanded: value[1],
                    ),
                    ExpansionPanel(
                      canTapOnHeader: false,
                      headerBuilder: (context, isOpen) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 10, top: 10),
                          child: Text(
                            "Telefone e Registro",
                            style: AppTextStyles.reviewUserTitle,
                          ),
                        );
                      },
                      body: Column(
                        children: [
                          Row(
                            children: [
                              Padding(
                                padding:
                                    const EdgeInsets.only(left: 20, bottom: 5),
                                child: Text(
                                  "Telefone: ${controller.phoneNumber}\n\nData de nascimento: ${controller.birthdate}",
                                ),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Container(
                                width: 50,
                                margin: EdgeInsets.only(right: 20, bottom: 15),
                                decoration: BoxDecoration(
                                  color: AppColors.darkBlue,
                                  borderRadius: BorderRadius.circular(100),
                                ),
                                child: IconButton(
                                  onPressed: () {
                                    controller.changePageRegister(
                                        controller.tabRegisterIndex! - 1);
                                  },
                                  icon: Icon(Ionicons.pencil),
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      isExpanded: value[2],
                    ),
                  ],
                  expansionCallback: (i, isOpen) {
                    if (i == 0) {
                      controller.changeIsOpen(0);
                      if (value[0] == true) {
                        controller.changeIsClosed(1);
                        controller.changeIsClosed(2);
                      }
                    } else if (i == 1) {
                      controller.changeIsOpen(1);
                      if (value[1] == true) {
                        controller.changeIsClosed(0);
                        controller.changeIsClosed(2);
                      }
                    } else if (i == 2) {
                      controller.changeIsOpen(2);
                      if (value[2] == true) {
                        controller.changeIsClosed(0);
                        controller.changeIsClosed(1);
                      }
                    }
                  },
                );
              },
            ),
          ),
          Container(
            child: ButtonWidget(
              textButon: "Cadastrar",
              onpressed: () {
                registercontroller.tabRegisterIndex == 3
                    ? Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => TabRegisterFinal()))
                    : registercontroller.changePageRegister(
                        registercontroller.tabRegisterIndex! + 1);
              },
            ),
            margin: EdgeInsets.symmetric(vertical: 0, horizontal: 30),
          ),
        ],
      ),
    );
  }
}
