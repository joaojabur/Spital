import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/profile/controller/save_controller.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';


class AppbarProfileMedic extends PreferredSize {
  final void Function()? onpressed;
  final void Function()? onpressed2;
  final bool topleftIcon;
  final bool topRightIcon;
  final String nome;
  final String area;
  final String image;
  final String nota;
  final IconData iconLeft;
  final IconData iconRight;
  final SaveController saveController;
  AppbarProfileMedic(
      {required this.nome,
      required this.saveController,
      required this.area,
      required this.image,
      required this.nota,
      required this.topRightIcon,
      required this.onpressed2,
      required this.iconRight,
      required this.topleftIcon,
      required this.iconLeft,
      required this.onpressed,
      required double width,
      required double value,
      required double height})
      : super(
          preferredSize: Size.fromHeight(height * 0.4),
          child: Stack(
            children: [
              Container(
                height: height * 0.5,
                color: Colors.transparent,
                child: SizedBox(
                  height: height * 0.3,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 50),
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.only(
                            bottomRight: Radius.circular(80),
                          ),
                          color: AppColors.blueTransparent),
                      child: Column(
                        children: [
                          Padding(
                            padding: EdgeInsets.only(
                                top: height * 0.05, left: 15, right: 0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(right: 5),
                                  child: topleftIcon
                                      ? Container(
                                          height: 40,
                                          width: 45,
                                          child: ElevatedButton(
                                              style: ButtonStyle(
                                                  padding: MaterialStateProperty
                                                      .all<EdgeInsets>(
                                                          EdgeInsets.only(
                                                              right: 20)),
                                                  backgroundColor:
                                                      MaterialStateProperty.all<
                                                          Color>(Colors.white),
                                                  shape: MaterialStateProperty
                                                      .all<RoundedRectangleBorder>(
                                                          RoundedRectangleBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            10.0),
                                                  ))),
                                              onPressed: topleftIcon
                                                  ? onpressed
                                                  : null,
                                              child: IconButton(
                                                icon: Icon(
                                                  iconLeft,
                                                  size: 25,
                                                  color: Colors.black,
                                                ),
                                                onPressed: () {},
                                              )))
                                      : null,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(right: 20),
                                  child: topRightIcon
                                      ? Observer(builder: (_) {
                                          return Container(
                                              height: 40,
                                              width: 40,
                                              child: ElevatedButton(
                                                  style: ButtonStyle(
                                                      padding: MaterialStateProperty
                                                          .all<EdgeInsets>(
                                                              EdgeInsets.only(
                                                                  right: 20)),
                                                      backgroundColor:
                                                          MaterialStateProperty
                                                              .all<Color>(
                                                                  Colors.white),
                                                      shape: MaterialStateProperty.all<
                                                              RoundedRectangleBorder>(
                                                          RoundedRectangleBorder(
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(10.0),
                                                      ))),
                                                  onPressed: topRightIcon
                                                      ? onpressed2
                                                      : null,
                                                  child: IconButton(
                                                    icon: Icon(
                                                      saveController.save
                                                          ? Icons.bookmark
                                                          : iconRight,
                                                      size: 25,
                                                      color: AppColors.darkBlue,
                                                    ),
                                                    onPressed: saveController
                                                        .changeValue,
                                                  )));
                                        })
                                      : null,
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 50, left: 30),
                            child: Row(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(27),
                                  child: Container(
                                    height: 100,
                                    width: 100,
                                    child: Image.asset(
                                      "images/doctor.jpeg",
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(left: 20),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        "Dr. ${nome}",
                                        textAlign: TextAlign.start,
                                        style:
                                            AppTextStyles.topicNameDoctorMaior,
                                      ),
                                      Text(area,
                                          textAlign: TextAlign.start,
                                          style: AppTextStyles
                                              .topicDescriptionDoctorMaior),
                                      Padding(
                                        padding: const EdgeInsets.only(top: 3),
                                        child: Row(
                                          children: [
                                            Icon(
                                              Ionicons.star,
                                              color: Colors.yellow,
                                            ),
                                            Icon(
                                              Ionicons.star,
                                              color: Colors.yellow,
                                            ),
                                            Icon(
                                              Ionicons.star,
                                              color: Colors.yellow,
                                            ),
                                            Icon(
                                              Ionicons.star,
                                              color: Colors.yellow,
                                            ),
                                            Icon(
                                              Ionicons.star,
                                              color: Colors.yellow,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 260,
                left: 20,
                child: Container(
                  height: 50,
                  width: width * 0.9,
                  child: ElevatedButton(
                      style: ButtonStyle(
                          padding: MaterialStateProperty.all<EdgeInsets>(
                              EdgeInsets.only(right: 0)),
                          backgroundColor:
                              MaterialStateProperty.all<Color>(AppColors.verde),
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15.0),
                          ))),
                      onPressed: () {},
                      child: Text(
                        "Agendar consulta",
                        style: AppTextStyles.titleBoldWriteMaior,
                      )),
                ),
              ),
            ],
          ),
        );
}
