import 'package:Spital/Screens/Shared/Models/medic_model.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class ItemListDoctors extends StatelessWidget {
  final void Function()? onpressed;
  final MedicModel medic;

  const ItemListDoctors({Key? key, this.onpressed, required this.medic})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return GestureDetector(
      onTap: onpressed,
      child: Container(
        margin: EdgeInsets.only(
            left: width * 0.03, right: width * 0.03, top: height * 0.0001),
        child: PhysicalModel(
          borderRadius: BorderRadius.circular(20),
          color: Colors.black,
          elevation: 3,
          child: Container(
            height: height * 0.1,
            width: width * 0.1,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: Colors.white,
            ),
            child: Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: width * 0.03, vertical: height * 0.01),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Expanded(
                    flex: 2,
                    child: Container(
                      height: 80,
                      width: 80,
                      child: CircleAvatar(
                        radius: 20,
                        backgroundColor: Colors.black,
                        child: Image.asset(
                          "images/doctor.jpeg",
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 4,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "Dr. ${medic.firstName}",
                              style: AppTextStyles.topicNameDoctor,
                            ),
                            Text(
                              "${medic.distance.toStringAsFixed(2)} km",
                              style: TextStyle(
                                  fontSize: 12, color: AppColors.gray),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text("${medic.area}",
                                style: AppTextStyles.topicDescriptionDoctor)
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  Ionicons.star,
                                  color: Colors.yellow,
                                  size: 12,
                                ),
                                Text(
                                  "${medic.rating}",
                                  style: TextStyle(
                                      color: Colors.black, fontSize: 12),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
