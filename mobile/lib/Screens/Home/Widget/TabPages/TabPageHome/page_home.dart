import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/list_category.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/list_doctors.dart';

import 'package:Spital/Screens/Shared/Widgets/AppBarMain/appbar_main_widget.dart';

import 'package:flutter/material.dart';

class PageHome extends StatefulWidget {
  @override
  _PageHomeState createState() => _PageHomeState();
}

class _PageHomeState extends State<PageHome> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppbarWidget(width: width, height: height),
      body: Container(
        height: height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 10, left: 20),
                  child: Text(
                    "Categorias",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: Text(
                    "Ver mais",
                    style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFFBCBCBC)),
                  ),
                ),
              ],
            ),
            ListCategory(),
            ListDoctors(),
          ],
        ),
      ),
    );
  }
}
