import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class PageSeach extends StatefulWidget {
  @override
  _PageSeachState createState() => _PageSeachState();
}

class _PageSeachState extends State<PageSeach> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppbarSecundaria(
        iconAddRight: Ionicons.save,
        title: "Chats",
        width: width,
        height: height,
        topleftIcon: false,
        topRightIcon: false,
      ),
      body: Center(child: Text("Seach")),
    );
  }
}
