
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageConsulta/Widget/controller/list_doctor_controller.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageConsulta/Widget/appointment_details.dart';
import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';
import 'package:Spital/Screens/Shared/Models/appointment_model.dart';
import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/Screens/Shared/ultils/date.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ListDoctorsConsultas extends StatefulWidget {
  const ListDoctorsConsultas({Key? key}) : super(key: key);

  @override
  _ListDoctorsConsultasState createState() => _ListDoctorsConsultasState();
}

class _ListDoctorsConsultasState extends State<ListDoctorsConsultas> {
  ListUserAppointmentController controller = ListUserAppointmentController();
  @override
  Widget build(BuildContext context) {
    AuthController auth = Provider.of<AuthController>(context);
    
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return FutureBuilder(
      future: controller.loadUserAppointments(auth.user!.id!),
      builder: (context, snapshot){

        if (snapshot.connectionState == ConnectionState.done){
          if (controller.hasError){
            return Center(
              child: Text("Ocorreu um Erro ao carregar suas consultas!")
            );
          }

          if (controller.appointments.isEmpty){
            return Center(
              child: Text("Você ainda não marcou nenhuma consulta!"),
            );
          }

          return Expanded(
            child: ListView.separated(
              physics: NeverScrollableScrollPhysics(),
              itemBuilder: (context, index){
                MedicModel medic = controller.appointments[index].medic;
                AppointmentModel appointment = controller.appointments[index].appointment;

                return GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/appointmentDetails', arguments: controller.appointments[index]);
                    },
                    child: Container(
                      color: Colors.white,
                      margin: EdgeInsets.only(
                          left: width * 0.05, right: width * 0.05, top: height * 0.01),
                      child: PhysicalModel(
                        borderRadius: BorderRadius.circular(20),
                        color: Colors.white,
                        elevation: 3,
                        child: Column(
                          children: [
                            Row(
                              children: [
                                Padding(
                                  padding: EdgeInsets.symmetric(
                                      horizontal: width * 0.009,
                                      vertical: height * 0.001),
                                  child: Container(
                                    margin: EdgeInsets.only(left: 10),
                                    width: width * 0.15,
                                    child: ClipRRect(
                                        borderRadius: BorderRadius.circular(20),
                                        child: Image.network(medic.url)
                                      ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsets.symmetric(
                                      horizontal: width * 0.03,
                                      vertical: height * 0.025),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text.rich(TextSpan(
                                          text: "Dr. ${medic.lastName}",
                                          style: AppTextStyles.topicNameDoctor,
                                          children: [
                                            TextSpan(
                                                text: "\n",
                                                style: AppTextStyles
                                                    .topicDescriptionDoctor)
                                          ])),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            Container(
                                height: 30,
                                padding: EdgeInsets.symmetric(horizontal: 20),
                                decoration: BoxDecoration(
                                  color: AppColors.blue,
                                  borderRadius: BorderRadius.only(
                                    bottomLeft: Radius.circular(20),
                                    bottomRight: Radius.circular(20)
                                  )
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      "${formatDate(appointment.date, FormatDateType.withMonth)}",
                                      style: AppTextStyles.titleBold3,
                                    ),
                                    Text(
                                      "${appointment.time}",
                                      style: AppTextStyles.titleBold3,
                                    )
                                  ],
                                )
                              ),
                          ],
                        ),
                      ),
                    ),
                );
              },
              separatorBuilder: (context, index) => Divider(
                height: 5,
                color: Colors.white,
              ), 
              itemCount: controller.appointments.length
            )
          );
        }
        return CircularProgressIndicator();
      }
    );
  }
}