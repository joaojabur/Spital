import 'package:Spital/Screens/Home/Widget/TabPages/TabPageConsulta/Widget/controller/list_doctor_repository.dart';
import 'package:Spital/Screens/MakeReview/controller/make_review_page_controller.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:Spital/Screens/Shared/ultils/date.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:ionicons/ionicons.dart';

class MakeReviewPage extends StatefulWidget {
  MakeReviewPage({Key? key}) : super(key: key);

  @override
  _MakeReviewPageState createState() => _MakeReviewPageState();
}

class _MakeReviewPageState extends State<MakeReviewPage> {
  MakeReviewPageController controller = MakeReviewPageController();

  @override
  Widget build(BuildContext context) {
    final AppointmentsResponse appointmentResponse =  ModalRoute.of(context)!.settings.arguments as AppointmentsResponse;
    final MedicModel medic = appointmentResponse.medic;
    final AppointmentModel appointment = appointmentResponse.appointment;

    
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppbarSecundaria(
        title: "       Avaliação",
        width: width,
        height: height,
        topleftIcon: true,
        iconLeft: Ionicons.chevron_back_outline,
        value: 0.12,
        onpressed: () {
          Navigator.pop(context);
        },
      ),
      body: Padding(
        padding: EdgeInsets.only(left: 15, right: 15, top: 15),
        child: SingleChildScrollView(
          child: Observer(
            builder: (_) => Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Avalie sua consulta", style: AppTextStyles.titleBold2.merge(TextStyle( fontSize: 24))),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Text("${formatDate(appointment.date, FormatDateType.ddmmyy)} | Dr. ${medic.lastName} | ${medic.area}"),
                ),
                Divider(thickness: 1),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 15),
                  child: Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        child: Container(
                          decoration: BoxDecoration(
                            color: AppColors.blue,
                            shape: BoxShape.circle
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(12),
                            child: Text("1"),
                          ),
                        ),
                      ),
                      Text(appointment.type),
                      Expanded(child: Container()),
                      Text('R\$ ${appointment.price}')
                    ],
                  ),          
                ),
                Divider(thickness: 1),
                Text("O que você achou da consulta?", style: AppTextStyles.titleBold2.merge(TextStyle( fontSize:  16))),
                Text("Escolha de 1 a 5 estrelas para classificar!", style: AppTextStyles.titleBold3Cinza.merge(TextStyle(fontSize: 12))),
                RatingBar.builder(
                    initialRating: 2.5,
                    minRating: 1,
                    direction: Axis.horizontal,
                    allowHalfRating: true,
                    unratedColor: Colors.amber.withAlpha(50),
                    itemCount: 5,
                    itemSize: 50.0,
                    itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
                    itemBuilder: (context, _) => Icon(
                      Icons.star,
                      color: Colors.amber,
                    ),
                    onRatingUpdate: controller.changeRating,
                    updateOnDrag: true,
                ),
                Divider(thickness: 1),
                Padding(
                  padding: const EdgeInsets.only(top: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(Icons.speaker_notes),
                      Text("Avalie com suas próprias palavras", style: AppTextStyles.titleBold5.merge(TextStyle(fontSize: 14))),
                      Observer(
                        builder: (_) {
                          return Text("${controller.text.length} / 300");
                        }
                      )
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    style: TextStyle(fontSize: 14),
                    keyboardType: TextInputType.multiline,
                    maxLines: null,
                    maxLength: 300,
                    onChanged: controller.changeText,
                    decoration: InputDecoration(
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: AppColors.gray.withOpacity(0.5),
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(16))
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: AppColors.gray.withOpacity(0.5)
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(16))
                      ),
                      fillColor: Colors.white,
                      filled: true,
                      hintText: "Conte-nos como foi sua experiência! (opcional)",
                      counterText: ""
                    ),
                  ),
                ),
                Divider(thickness: 1),
                Text("Você gostou do médico ?", style: AppTextStyles.titleBold3.merge(TextStyle(fontSize: 16))),
                Divider(thickness: 1),
                Observer(
                  builder: (_) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("Sim, gostei"),
                        Radio(
                          value: 0,                        
                          groupValue: controller.liked, 
                          onChanged: (value) => controller.changeLiked(0),
                        ),
                      ],
                    );
                  }
                ),
                Divider(thickness: 1),
                Observer(builder: (_) {
                  return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("Não, esperava mais..."),
                        Radio(
                          value: 1, 
                          groupValue: controller.liked, 
                          onChanged: (value) => controller.changeLiked(1)
                        ),
                      ],
                    );
                  }
                ),
                Divider(thickness: 1),
                Text("Aproveite e avalie o Spital também!", style: AppTextStyles.titleBold3.merge(TextStyle(fontSize:  16)),),
                Text("Nós informe o que achou em uma escala de 0 a 10", style: AppTextStyles.titleBold3Cinza.merge(TextStyle(fontSize: 12))),
                 Observer(
                  builder: (_) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: List<Widget>.generate(10, 
                        (index) => GestureDetector(
                          onTap: () => controller.changeSpitalGrade(index + 1),
                          child: Container(
                            padding: EdgeInsets.all((2 - (index + 1) ~/ 10) * 5 ),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: controller.spitalGrade == (index + 1) ? AppColors.blue : AppColors.gray
                            ),
                            child: Text('${index + 1}', style: TextStyle(color: Colors.white),),
                          ),
                        )
                      ),
                    );
                  }
                ),
                Container(
                  margin: EdgeInsets.only(top: 16),
                  width: width,
                  child: ElevatedButton(
                    onPressed: () => {},
                    child: Text("Avaliar"),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(AppColors.darkBlue),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        )
                      )
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}