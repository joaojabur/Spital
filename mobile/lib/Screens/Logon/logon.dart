import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LogonPage extends StatefulWidget {
  @override
  _LogonPageState createState() => _LogonPageState();
}

class _LogonPageState extends State<LogonPage> {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SvgPicture.asset("images/ilustracao_login.svg"),
          Center(
            child: Container(
              padding: EdgeInsets.only(top: height * 0.05),
              child: Text(
                "Os melhores médicos\n você encontra aqui!",
                style: AppTextStyles.titleBold,
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Center(
            child: Container(
              padding: EdgeInsets.only(top: height * 0.01),
              child: Text(
                "Em alguns segundos você agenda suas consultas pelos melhores preços",
                style: AppTextStyles.loginDescription,
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: EdgeInsets.only(top: height * 0.1),
                child: Container(
                  width: width * 0.4,
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, "/resgister");
                    },
                    child: Text(
                      "Registrar",
                      style: TextStyle(color: Colors.white, fontSize: 18),
                    ),
                  ),
                  decoration: BoxDecoration(
                      border: Border.all(color: Colors.black87, width: 0.5),
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(50),
                        topLeft: Radius.circular(50),
                      ),
                      color: Colors.black),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(top: height * 0.1),
                child: Container(
                  width: width * 0.4,
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, "/login");
                    },
                    child: Text(
                      "Entrar",
                      style: TextStyle(color: Colors.black, fontSize: 18),
                    ),
                  ),
                  decoration: BoxDecoration(
                      border: Border.all(color: Colors.black87, width: 0.5),
                      borderRadius: BorderRadius.only(
                        bottomRight: Radius.circular(50),
                        topRight: Radius.circular(50),
                      ),
                      color: Colors.white),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
