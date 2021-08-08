import 'package:Spital/Screens/Home/Widget/TabPages/TabPageConsulta/Widget/controller/list_doctor_repository.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:Spital/Screens/Shared/ultils/date.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class AppointmentDetails extends StatefulWidget {
  const AppointmentDetails({Key? key}) : super(key: key);

  @override
  _AppointmentDetailsState createState() => _AppointmentDetailsState();
}

class _AppointmentDetailsState extends State<AppointmentDetails> {
  @override
  Widget build(BuildContext context) {
    final AppointmentsResponse appointmentResponse =  ModalRoute.of(context)!.settings.arguments as AppointmentsResponse;
    final MedicModel medic = appointmentResponse.medic;

    final AppointmentModel appointment = appointmentResponse.appointment;
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
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.symmetric(vertical: 16),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: Container(
                      width: width * 0.25,
                      decoration: BoxDecoration(
                        color: AppColors.gray,
                        shape: BoxShape.circle,
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20),
                        child: Image.network(medic.url)
                      ),
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Dr. ${medic.lastName}', style: AppTextStyles.titleBold3),
                      Text('${medic.area}', style: AppTextStyles.titleBold3Cinza)
                    ],
                  ),
                  Expanded(
                    child: GestureDetector(
                      onTap: () => Navigator.pushNamed(context, '/medic', arguments: medic),
                      child: Container(
                        alignment: Alignment.center,
                        child: Text("Ver Perfil", style: TextStyle(color: AppColors.darkBlue, fontWeight: FontWeight.w600))
                      ),
                    ),
                  )
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 16, bottom: 4),
              alignment: Alignment.bottomLeft,
              child: Text('Pago às${formatDate(appointment.createdAt!, FormatDateType.fromIsoTohhmmDDMMYY)}', style: TextStyle( color: Colors.black54, fontWeight:  FontWeight.w300),)
            ),
            Container(
              width: width,
              child: ElevatedButton(
                onPressed: () => {},
                child: Text("Consulta paga às${formatDate(appointment.createdAt!, FormatDateType.fromIsoTohhmm)}"),
                style: ButtonStyle(
                  padding: MaterialStateProperty.all<EdgeInsets>(
                    EdgeInsets.symmetric(horizontal: 8, vertical: 16)
                  ),
                  backgroundColor: MaterialStateProperty.all<Color>(Color(0x2416697A)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: BorderSide(width: 1, color: Color(0x2516697A))
                    )
                  )
                ),
              ),
            ),
            SizedBox(
              height: 16,
            ),
            Text("N° da consulta ${appointment.scheduleID}"),
            Divider(),
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
            Divider(),
            Row(
              children: [
                Text("Pago pelo app"),
                Expanded(child: Container()),
              ],
            ),
            Divider(),
            Container(
              alignment: Alignment.centerLeft,
              child: Text("Endereço de Entrega", style: AppTextStyles.titleBold3Cinza),
            ),
            Container(
              alignment: Alignment.centerLeft,
              child:  Text("${medic.address} - ${medic.number}", style: AppTextStyles.titleBold3),
            ),
            Divider(),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 32),
              child: Container(
                alignment: Alignment.center,
                child: Text("Consultar Novamente", style: AppTextStyles.warningTitleblue,),
              ),
            ),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: appointment.rated! ? () => {} : () => {
                      Navigator.pushNamed(context, '/makeReview', arguments: appointmentResponse)
                    }, 
                    child: Text(appointment.rated! ? "Você já avaliou essa consulta!" : "Avalie a sua consulta"),
                    style:  ButtonStyle(
                      padding:MaterialStateProperty.all<EdgeInsets>(
                        EdgeInsets.only(right: 0)
                      ),
                      backgroundColor:MaterialStateProperty.all<Color>(
                        AppColors.verde
                      ),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.0),
                        )
                      )
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
