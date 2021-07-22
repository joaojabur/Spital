import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_custom_clippers/flutter_custom_clippers.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

class ChangeImage extends StatefulWidget {
  const ChangeImage(
      {Key? key, required this.change, required this.authController})
      : super(key: key);
  final bool change;
  final AuthController authController;
  @override
  _ChangeImageState createState() => _ChangeImageState();
}

class _ChangeImageState extends State<ChangeImage> {
  /* List images = [
    "images/perfil/1.jpg",
    "images/perfil/2.jpg",
    "images/perfil/3.jpg",
    "images/perfil/4.jpg",
    "images/perfil/5.jpg",
    "images/perfil/6.jpg",
    "images/perfil/7.png",
  ];*/

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.change == true
          ? () {
              showDialog(
                  barrierDismissible: false, //tocando fora
                  context: context,
                  builder: (_) => Observer(builder: (_) {
                        return AlertDialog(
                          title: Text(
                            "Escolha seu Avatar",
                            style: AppTextStyles.titleBold3,
                          ),
                          content: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        widget.authController.imagePadrao =
                                            widget.authController.imageActual;
                                        widget.authController.imageActual =
                                            widget.authController.dataimages[0];
                                        widget.authController.dataimages[0] =
                                            widget.authController.imagePadrao;
                                      });
                                    },
                                    child: SizedBox(
                                      height: 70,
                                      width: 70,
                                      child: ClipPath(
                                        clipper:
                                            HexagonalClipper(reverse: true),
                                        child: Container(
                                          child: Image.asset(widget
                                              .authController.dataimages[0]),
                                          decoration: BoxDecoration(),
                                        ),
                                      ),
                                    ),
                                  ),
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        widget.authController.imagePadrao =
                                            widget.authController.imageActual;
                                        widget.authController.imageActual =
                                            widget.authController.dataimages[1];
                                        widget.authController.dataimages[1] =
                                            widget.authController.imagePadrao;
                                      });
                                    },
                                    child: SizedBox(
                                      height: 70,
                                      width: 70,
                                      child: ClipPath(
                                        clipper:
                                            HexagonalClipper(reverse: true),
                                        child: Container(
                                            child: Image.asset(widget
                                                .authController.dataimages[1]),
                                            decoration: BoxDecoration()),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        widget.authController.imagePadrao =
                                            widget.authController.imageActual;
                                        widget.authController.imageActual =
                                            widget.authController.dataimages[2];
                                        widget.authController.dataimages[2] =
                                            widget.authController.imagePadrao;
                                      });
                                    },
                                    child: SizedBox(
                                      height: 70,
                                      width: 70,
                                      child: ClipPath(
                                        clipper:
                                            HexagonalClipper(reverse: true),
                                        child: Container(
                                          child: Image.asset(widget
                                              .authController.dataimages[2]),
                                          decoration: BoxDecoration(),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.all(5),
                                    child: SizedBox(
                                      height: 80,
                                      width: 80,
                                      child: ClipRRect(
                                        borderRadius:
                                            BorderRadius.circular(100),
                                        child: Container(
                                          child: Image.asset(widget
                                              .authController.imageActual),
                                          decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(100)),
                                        ),
                                      ),
                                    ),
                                  ),
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        widget.authController.imagePadrao =
                                            widget.authController.imageActual;
                                        widget.authController.imageActual =
                                            widget.authController.dataimages[3];
                                        widget.authController.dataimages[3] =
                                            widget.authController.imagePadrao;
                                      });
                                    },
                                    child: SizedBox(
                                      height: 70,
                                      width: 70,
                                      child: ClipPath(
                                        clipper:
                                            HexagonalClipper(reverse: true),
                                        child: Container(
                                          child: Image.asset(widget
                                              .authController.dataimages[3]),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        widget.authController.imagePadrao =
                                            widget.authController.imageActual;
                                        widget.authController.imageActual =
                                            widget.authController.dataimages[4];
                                        widget.authController.dataimages[4] =
                                            widget.authController.imagePadrao;
                                      });
                                    },
                                    child: SizedBox(
                                      height: 70,
                                      width: 70,
                                      child: ClipPath(
                                        clipper:
                                            HexagonalClipper(reverse: true),
                                        child: Container(
                                          child: Image.asset(widget
                                              .authController.dataimages[4]),
                                          decoration: BoxDecoration(),
                                        ),
                                      ),
                                    ),
                                  ),
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        widget.authController.imagePadrao =
                                            widget.authController.imageActual;
                                        widget.authController.imageActual =
                                            widget.authController.dataimages[5];
                                        widget.authController.dataimages[5] =
                                            widget.authController.imagePadrao;
                                      });
                                    },
                                    child: SizedBox(
                                      height: 70,
                                      width: 70,
                                      child: ClipPath(
                                        clipper:
                                            HexagonalClipper(reverse: true),
                                        child: Container(
                                          child: Image.asset(widget
                                              .authController.dataimages[5]),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          actions: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                TextButton(
                                  onPressed: () {},
                                  child: Text(
                                    "Salvar",
                                    style: AppTextStyles.warningTitleblue,
                                  ),
                                ),
                                TextButton(
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                  child: Text(
                                    "Cancelar",
                                    style: AppTextStyles.warningTitleblue,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        );
                      }));
            }
          : null,
      child: Container(
          child: Image.asset(widget.authController.imageActual),
          decoration: BoxDecoration()),
    );
  }
}
