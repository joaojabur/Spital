import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/controller/controller.dart';
import 'package:Spital/Screens/Shared/controllers/location_controller.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:provider/provider.dart';

class ListDoctors extends StatefulWidget {
  final String area;
  final int page;
  const ListDoctors({
      Key? key,
      required this.area,
      required this.page
  }) : super(key: key);
  @override
  _ListDoctorsState createState() => _ListDoctorsState();
}

class _ListDoctorsState extends State<ListDoctors> {
  ListDoctorController controller = ListDoctorController();

  @override
  Widget build(BuildContext context) {
    LocationController locationController = Provider.of<LocationController>(context);

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Container(
      margin: EdgeInsets.only(bottom: 0),
      height: height * 0.3,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: FutureBuilder(
                future: controller.loadMedics(this.widget.area, locationController.position!, 999, null, this.widget.page),
                builder: (context, snapshot){
                 if (snapshot.connectionState == ConnectionState.done){
                    return ListView.separated(
                      physics: BouncingScrollPhysics(),
                      // physics: BouncingScrollPhysics(),
                      separatorBuilder: (context, index) => Divider(
                        height: 5,
                        color: Colors.white,
                      ),
                      itemCount: controller.medics.length,
                      itemBuilder: (context, index) {
                        var medic = controller.medics[index];
                        return Container(
                          margin: EdgeInsets.only(
                              left: width * 0.03,
                              right: width * 0.03,
                              top: height * 0.0001),
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
                                        horizontal: width * 0.03,
                                        vertical: height * 0.01
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Expanded(
                                      flex: 1,
                                      child: ClipRRect(
                                          borderRadius: BorderRadius.circular(20),
                                          child: Image.asset("images/doctor.jpeg")),
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
                                                      style: AppTextStyles.topicDescriptionDoctor
                                              )
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
                                              Row(
                                                children: [
                                                  Icon(
                                                    Ionicons.time,
                                                    size: 12,
                                                  ),
                                                  Text(
                                                    "10:00 AM - 2:00 PM",
                                                    style: AppTextStyles.topicStar,
                                                  )
                                                ]
                                              )
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
                        );
                      },
                    );
                  }
                  
                  return Center(
                    child: CircularProgressIndicator()
                  );
                },
              )
            ),
          ],
        ),
      ),
    );
  }
}