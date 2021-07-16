import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class DetalheConsulta extends StatefulWidget {
  const DetalheConsulta({Key? key}) : super(key: key);

  @override
  _DetalheConsultaState createState() => _DetalheConsultaState();
}

class _DetalheConsultaState extends State<DetalheConsulta> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppbarSecundaria(
        title: "Detalhes da Consulta",
        width: width,
        height: height,
        topleftIcon: true,
        iconLeft: Ionicons.chevron_back_outline,
        value: 0.12,
        onpressed: () {
          Navigator.pop(context);
        },
      ),
      body: Container(),
    );
  }
}
