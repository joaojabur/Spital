import 'package:Spital/Screens/Home/Widget/TabPages/TabPagePerson/profile_cleinte/profile_cliente.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

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
      resizeToAvoidBottomInset: true,
      appBar: AppbarSecundaria(
        title: "Editar Perfil",
        width: width,
        height: height,
        topleftIcon: false,
        iconLeft: Ionicons.chevron_back_outline,
        value: 0.12,
        onpressed: () {},
      ),
      body: ProfileCliente(),
    );
  }
}
