import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/Buttom/buttom_widget.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';

class PageRegisterFifth extends StatefulWidget {
  const PageRegisterFifth({Key? key}) : super(key: key);

  @override
  _PageRegisterFifthState createState() => _PageRegisterFifthState();
}

class _PageRegisterFifthState extends State<PageRegisterFifth> {
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
            padding: const EdgeInsets.only(top: 90),
            child: Container(
              margin: EdgeInsets.only(right: 20, bottom: 30),
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
                  dividerColor: Colors.indigo,
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
                                        controller.tabRegisterIndex! - 4);
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
                                  " Email: ${controller.email}\n \nSenha: ${'*' * controller.password!.length}",
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
                      isExpanded: value[1],
                    ),
                    ExpansionPanel(
                      canTapOnHeader: false,
                      headerBuilder: (context, isOpen) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 10, top: 10),
                          child: Text(
                            "Telefone",
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
                                  "Telefone:${controller.phoneNumber}",
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
                      isExpanded: value[2],
                    ),
                    ExpansionPanel(
                      canTapOnHeader: false,
                      headerBuilder: (context, isOpen) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 10, top: 10),
                          child: Text(
                            "Data de nascimento",
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
                                  "Data de nascimento:${controller.birthdate}",
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
                      isExpanded: value[3],
                    ),
                  ],
                  expansionCallback: (i, isOpen) {
                    print("clicado");
                    controller.changeIsOpen(i);
                  },
                );
              },
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(vertical: 0, horizontal: 30),
          ),
          ButtuomWidget(
            textButom: "Cadastrar",
            erroText: controller.validateCadastro,
          )
        ],
      ),
    );
  }
}
