import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class ListDoctorsConsultas extends StatefulWidget {
  const ListDoctorsConsultas({Key? key}) : super(key: key);

  @override
  _ListDoctorsConsultasState createState() => _ListDoctorsConsultasState();
}

class _ListDoctorsConsultasState extends State<ListDoctorsConsultas> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Expanded(
      child: ListView.separated(
        physics: BouncingScrollPhysics(),
        separatorBuilder: (context, index) => Divider(
          height: 5,
          color: Colors.white,
        ),
        itemCount: 9,
        itemBuilder: (context, index) {
          return Container(
            margin: EdgeInsets.only(
                left: width * 0.03, right: width * 0.03, top: height * 0.0001),
            child: PhysicalModel(
              borderRadius: BorderRadius.circular(20),
              color: Colors.black,
              elevation: 3,
              child: Container(
                height: height * 0.1,
                width: width * 0.1,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.white,
                ),
                child: Row(
                  children: [
                    Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: width * 0.009, vertical: height * 0.001),
                      child: Container(
                        width: width * 0.2,
                        child: ClipRRect(
                            borderRadius: BorderRadius.circular(20),
                            child: Image.asset("images/doctor.jpeg")),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: width * 0.03, vertical: height * 0.01),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: EdgeInsets.only(bottom: height * 0.015),
                            child: Text.rich(TextSpan(
                                text: "Dr. Jaison",
                                style: AppTextStyles.topicNameDoctor,
                                children: [
                                  TextSpan(
                                      text: "\nPulmonologist",
                                      style:
                                          AppTextStyles.topicDescriptionDoctor)
                                ])),
                          ),
                          Row(
                            children: [
                              Icon(
                                Ionicons.star,
                                color: Colors.yellow,
                                size: 12,
                              ),
                              Text(
                                "5.0",
                                style: TextStyle(
                                    color: Colors.black, fontSize: 12),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                          right: width * 0.03,
                          left: width * 0.01,
                          top: height * 0.01),
                      child: Column(
                        children: [
                          Padding(
                            padding: EdgeInsets.only(
                              bottom: 30,
                              left: width * 0.14,
                            ),
                            child: Text(
                              "1.5 km",
                              style: TextStyle(
                                  fontSize: 12, color: AppColors.gray),
                            ),
                          ),
                          Row(
                            children: [
                              Icon(
                                Ionicons.time,
                                size: 12,
                              ),
                              Text(
                                "10:00 AM",
                                style: AppTextStyles.topicStar,
                              )
                            ],
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
