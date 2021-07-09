import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/list_doctor_by_area.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/sliver_app_bar_seach_doctors.dart';
import 'package:flutter/material.dart';

class PageSeachDoctors extends StatefulWidget {
  const PageSeachDoctors({Key? key, required this.texto, required this.image})
      : super(key: key);
  final String texto;
  final String image;

  @override
  _PageSeachDoctorsState createState() => _PageSeachDoctorsState();
}

class _PageSeachDoctorsState extends State<PageSeachDoctors> {
  @override
  Widget build(BuildContext context) {
    String texto = widget.texto;
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
        body: NestedScrollView(
            physics: BouncingScrollPhysics(),
            headerSliverBuilder:
                (BuildContext context, bool innerBoxIsScrolled) {
              return <Widget>[
                AppBarSliverPageSeachDoctors(
                  title: "$texto",
                  image: "${widget.image}",
                  width: width,
                  height: height,
                ),
              ];
            },
            body: Column(
              children: [
                Expanded(
                  child: ListDoctors(area: texto, page: 0),
                ),
              ],
            )));
  }
}
