import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class TabRegisterFinal extends StatelessWidget {
  const TabRegisterFinal({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: AppColors.blueT10,
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                "Cadastro realizado com sucesso!",
                style: AppTextStyles.titleBoldRegistered,
                textAlign: TextAlign.center,
              ),
              SvgPicture.asset("images/registered.svg"),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                child: Text(
                  "Precisamos agora que você confirme seu e-mail para realizar-mos o login.",
                  style: AppTextStyles.descriptionRegistered,
                  textAlign: TextAlign.center,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Text(
                  "Leia vosso e-mail e clique em confirmar e-mail",
                  style: AppTextStyles.information,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  top: 30,
                ),
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(primary: AppColors.verde),
                    onPressed: () {
                      Navigator.pushNamed(context, "/logon");
                    },
                    child: Text(
                      "Entrar na conta",
                      style: AppTextStyles.warningTitle,
                    )),
              )
            ],
          ),
        ),
      ),
    );
  }
}
