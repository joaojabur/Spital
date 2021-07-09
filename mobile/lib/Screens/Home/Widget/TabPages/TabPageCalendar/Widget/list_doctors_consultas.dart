import 'package:Spital/Screens/Home/Widget/TabPages/TabPageCalendar/Widget/detalhe_consulta.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';

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
        physics: NeverScrollableScrollPhysics(),
        separatorBuilder: (context, index) => Divider(
          height: 5,
          color: Colors.white,
        ),
        itemCount: 9,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => DetalheConsulta()));
            },
            child: Container(
              color: Colors.white,
              margin: EdgeInsets.only(
                  left: width * 0.05, right: width * 0.05, top: height * 0.01),
              child: PhysicalModel(
                borderRadius: BorderRadius.circular(20),
                color: Colors.white,
                elevation: 3,
                child: Column(
                  children: [
                    Row(
                      children: [
                        Padding(
                          padding: EdgeInsets.symmetric(
                              horizontal: width * 0.009,
                              vertical: height * 0.001),
                          child: Container(
                            margin: EdgeInsets.only(left: 10),
                            width: width * 0.15,
                            child: ClipRRect(
                                borderRadius: BorderRadius.circular(20),
                                child: Image.asset("images/doctor.jpeg")),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.symmetric(
                              horizontal: width * 0.03,
                              vertical: height * 0.025),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text.rich(TextSpan(
                                  text: "Dr. ",
                                  style: AppTextStyles.topicNameDoctor,
                                  children: [
                                    TextSpan(
                                        text: "\n",
                                        style: AppTextStyles
                                            .topicDescriptionDoctor)
                                  ])),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Container(
                        height: 30,
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        decoration: BoxDecoration(
                            color: AppColors.blue,
                            borderRadius: BorderRadius.only(
                                bottomLeft: Radius.circular(20),
                                bottomRight: Radius.circular(20))),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "3 de maio",
                              style: AppTextStyles.titleBold3,
                            ),
                            Text(
                              "2:00 PM",
                              style: AppTextStyles.titleBold3,
                            )
                          ],
                        )),
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
