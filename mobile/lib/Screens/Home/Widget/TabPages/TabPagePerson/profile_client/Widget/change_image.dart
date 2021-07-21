import 'dart:math';

import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_custom_clippers/flutter_custom_clippers.dart';

class ChangeImage extends StatefulWidget {
  const ChangeImage({Key? key, required this.change}) : super(key: key);
  final bool change;

  @override
  _ChangeImageState createState() => _ChangeImageState();
}

class _ChangeImageState extends State<ChangeImage> {
  List images = [
    "images/perfil/1.jpg",
    "images/perfil/2.jpg",
    "images/perfil/3.jpg",
    "images/perfil/4.jpg",
    "images/perfil/5.jpg",
    "images/perfil/6.jpg",
    "images/perfil/7.png",
  ];

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.change == true
          ? () {
              showDialog(
                  barrierDismissible: true, //tocando fora
                  context: context,
                  builder: (_) => AlertDialog(
                        title: Text(
                          "Escolha seu Avatar",
                          style: AppTextStyles.titleBold3,
                        ),
                        content: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                SizedBox(
                                  height: 70,
                                  width: 70,
                                  child: ClipPath(
                                    clipper: HexagonalClipper(reverse: true),
                                    child: Container(
                                      child: Image.asset(images[0]),
                                      decoration: BoxDecoration(
                                        color: Colors.green,
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  height: 70,
                                  width: 70,
                                  child: ClipPath(
                                    clipper: HexagonalClipper(reverse: true),
                                    child: Container(
                                        child: Image.asset(images[1]),
                                        decoration: BoxDecoration(
                                          color: Colors.deepOrange,
                                        )),
                                  ),
                                ),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                SizedBox(
                                  height: 70,
                                  width: 70,
                                  child: ClipPath(
                                    clipper: HexagonalClipper(reverse: true),
                                    child: Container(
                                      child: Image.asset(images[2]),
                                      decoration: BoxDecoration(
                                        color: Colors.amber,
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(5),
                                  child: SizedBox(
                                    height: 80,
                                    width: 80,
                                    child: Container(
                                      child: Image.asset(images[6]),
                                      decoration: BoxDecoration(
                                          color: Colors.blue,
                                          borderRadius:
                                              BorderRadius.circular(100)),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  height: 70,
                                  width: 70,
                                  child: ClipPath(
                                    clipper: HexagonalClipper(reverse: true),
                                    child: Container(
                                      child: Image.asset(images[4]),
                                      color: Colors.brown,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                SizedBox(
                                  height: 70,
                                  width: 70,
                                  child: ClipPath(
                                    clipper: HexagonalClipper(reverse: true),
                                    child: Container(
                                      child: Image.asset(images[5]),
                                      decoration: BoxDecoration(
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  height: 70,
                                  width: 70,
                                  child: ClipPath(
                                    clipper: HexagonalClipper(reverse: true),
                                    child: Container(
                                      child: Image.asset(images[3]),
                                      color: Colors.indigo,
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
                                onPressed: () {},
                                child: Text(
                                  "Cancelar",
                                  style: AppTextStyles.warningTitleblue,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ));
            }
          : null,
      child:
          Container(child: Image.asset(images[6]), decoration: BoxDecoration()),
    );
  }
}
