import 'package:Spital/Screens/MedicProfile/appbar_medic_profile/appbar_profile_medic.dart';
import 'package:Spital/Screens/MedicProfile/controller/save_controller.dart';
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class MedicProfile extends StatefulWidget {
  const MedicProfile({
    Key? key,
  }) : super(key: key);

  @override
  _MedicProfileState createState() => _MedicProfileState();
}

class _MedicProfileState extends State<MedicProfile> {
  openGoogleMaps(String address) async {
    const endereco = "joão zacarias";
    const urlMap = "https://www.google.com/maps/place/${endereco}";
    if (await canLaunch(urlMap)) {
      await launch(urlMap);
    } else {
      throw 'Could not launch Maps';
    }
  }

  @override
  Widget build(BuildContext context) {
    SaveController saveController = SaveController();
    final medic = ModalRoute.of(context)!.settings.arguments as MedicModel;

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    print(medic.masterDegree);
    print(medic.masterDegree.runtimeType);
    return SingleChildScrollView(
      child: SizedBox(
        height: 1100,
        child: Scaffold(
          /* floatingActionButton: FloatingActionButton.extended(
              backgroundColor: AppColors.verde,
              onPressed: () {},
              icon: Icon(Icons.event),
              label: Text(
                "Agendar",
                style: AppTextStyles.titleBoldWrite,
              )),*/
          appBar: AppBarMedicProfile(
            topleftIcon: true,
            iconLeft: Ionicons.chevron_back_outline,
            onpressed: () => Navigator.pop(context),
            width: width,
            value: 100,
            height: height,
            iconRight: Icons.bookmark_border_outlined,
            topRightIcon: true,
            onpressed2: () {},
            area: medic.area,
            image: '',
            nome: medic.firstName,
            nota: '',
            saveController: saveController,
            medicModel: medic,
          ),
          body: Container(
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(top: 20),
                          child: Container(
                            width: width * 0.85,
                            height: 30,
                            decoration: BoxDecoration(
                                border:
                                    Border.all(color: Colors.black12, width: 1),
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Row(
                                  children: [
                                    Text("Horário de trabalho hoje: "),
                                    Text("8:00 AM - 4:30 PM"),
                                  ],
                                )
                              ],
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 30),
                          child: Container(
                            padding: EdgeInsets.only(
                                top: 20, bottom: 20, right: 20, left: 20),
                            decoration: BoxDecoration(
                                border:
                                    Border.all(color: Colors.black38, width: 1),
                                borderRadius: BorderRadius.circular(20)),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Onde estou ?",
                                  style: AppTextStyles.titleBold3,
                                ),
                                Row(
                                  children: [
                                    Icon(Icons.location_on),
                                    Container(
                                        width: width * 0.6,
                                        child: Text(
                                            "${medic.address} ${medic.number}",
                                            textAlign: TextAlign.left))
                                  ],
                                ),
                                Row(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.only(left: 5),
                                      child: Row(
                                        children: [
                                          Icon(Icons.square_foot),
                                          Text(
                                            "${medic.distance.toStringAsFixed(2)} km",
                                            style: TextStyle(
                                                fontSize: 14,
                                                color: AppColors.black),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.only(left: 70),
                                      child: Row(
                                        children: [
                                          Icon(
                                            Icons.explore,
                                            color: AppColors.darkBlue,
                                          ),
                                          InkWell(
                                            child: new Text('Ver no mapa'),
                                            onTap: () => launch(
                                                'https://www.google.com/maps/place/${medic.address} ${medic.number}'),
                                          ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 20,
                        ),
                        PhysicalModel(
                          color: Colors.black,
                          elevation: 3,
                          shadowColor: Colors.black,
                          borderRadius: BorderRadius.circular(20),
                          child: Container(
                            child: Column(
                              children: [
                                Container(
                                    padding: EdgeInsets.only(
                                        left: 30,
                                        right: 30,
                                        top: 15,
                                        bottom: 10),
                                    decoration: BoxDecoration(
                                        color: AppColors.darkBlue,
                                        borderRadius: BorderRadius.only(
                                            topLeft: Radius.circular(20),
                                            topRight: Radius.circular(20))),
                                    child: Column(
                                      children: [
                                        RatingBar.builder(
                                          ignoreGestures: true,
                                          initialRating:
                                              double.parse(medic.rating),
                                          minRating: 1,
                                          direction: Axis.horizontal,
                                          allowHalfRating: true,
                                          itemCount: 5,
                                          itemPadding: EdgeInsets.symmetric(
                                              horizontal: 4.0),
                                          itemBuilder: (context, _) => Icon(
                                            Icons.star,
                                            color: Colors.amber,
                                          ),
                                          onRatingUpdate: (rating) {
                                            print(rating);
                                          },
                                        ),
                                        Text(
                                          medic.rating,
                                          style: AppTextStyles
                                              .titleBoldWriteMaiorPlus,
                                        )
                                      ],
                                    )),
                                GestureDetector(
                                  onTap: () {
                                    Navigator.pushNamed(context, "/reviews",
                                        arguments: medic.id);
                                  },
                                  child: Container(
                                    padding: EdgeInsets.only(
                                        left: 80, right: 80, bottom: 10),
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.only(
                                          bottomLeft: Radius.circular(20),
                                          bottomRight: Radius.circular(20)),
                                    ),
                                    child: Row(
                                      children: [
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(top: 10),
                                          child: Text(
                                            "Ver avaliações",
                                            style: AppTextStyles.titleBold3,
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 20,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 20, right: 50),
                          child: Container(
                            padding: EdgeInsets.symmetric(
                                horizontal: 10, vertical: 10),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Text(
                                      "Sobre Dr. ${medic.firstName}:",
                                      style: AppTextStyles.titleBold2,
                                    )
                                  ],
                                ),
                                SizedBox(
                                  height: 10,
                                ),
                                Row(
                                  children: [
                                    Text(
                                      "Graduação: ",
                                      style: AppTextStyles.titleBold3,
                                    ),
                                    Text(
                                      "${medic.graduation}",
                                      style: AppTextStyles.information,
                                    ),
                                  ],
                                ),
                                if (medic.masterDegree != null)
                                  if (medic.masterDegree!.isNotEmpty)
                                    ...([
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Row(
                                        children: [
                                          Text(
                                            "Mestrado: ",
                                            style: AppTextStyles.titleBold3,
                                          ),
                                          Text(
                                            "${medic.masterDegree}",
                                            style: AppTextStyles.information,
                                          ),
                                        ],
                                      )
                                    ]),
                                if (medic.doctorateDegree != null)
                                  if (medic.doctorateDegree!.isNotEmpty)
                                    ...([
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Row(
                                        children: [
                                          Text(
                                            "Doutorado: ",
                                            style: AppTextStyles.titleBold3,
                                          ),
                                          Text(
                                            "${medic.doctorateDegree}",
                                            style: AppTextStyles.information,
                                          ),
                                        ],
                                      ),
                                    ])
                              ],
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 30),
                          child: Container(
                            height: 50,
                            width: width * 0.9,
                            child: ElevatedButton(
                                style: ButtonStyle(
                                    padding:
                                        MaterialStateProperty.all<EdgeInsets>(
                                            EdgeInsets.only(right: 0)),
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                            AppColors.verde),
                                    shape: MaterialStateProperty.all<
                                            RoundedRectangleBorder>(
                                        RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(15.0),
                                    ))),
                                onPressed: () {
                                   Navigator.pushNamed(context, "/schedule",
                                        arguments: medic.id);
                                },
                                child: Text(
                                  "Agendar consulta",
                                  style: AppTextStyles.titleBoldWriteMaior,
                                )),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
