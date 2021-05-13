import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';

class PagePerson extends StatefulWidget {
  @override
  _PagePersonState createState() => _PagePersonState();
}

class _PagePersonState extends State<PagePerson> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppbarSecundaria(
        title: "Meu Perfil",
        width: width,
        height: height,
      ),
      body: Center(child: Text("Perfil")),
    );
  }
}
