import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/controller/controller.dart';
import 'package:Spital/Screens/Shared/controllers/location_controller.dart';

import 'package:flutter/material.dart';

import 'package:provider/provider.dart';

import 'item_list_doctor.dart';

class ListDoctors extends StatefulWidget {
  final String area;
  final int page;
  const ListDoctors({Key? key, required this.area, required this.page})
      : super(key: key);
  @override
  _ListDoctorsState createState() => _ListDoctorsState();
}

class _ListDoctorsState extends State<ListDoctors> {
  ListDoctorController controller = ListDoctorController();

  @override
  Widget build(BuildContext context) {
    LocationController locationController =
        Provider.of<LocationController>(context);

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
              future: controller.loadMedics(this.widget.area,
                  locationController.position!, 999, null, this.widget.page),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.done) {
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
                      return ItemListDoctors(
                          medic: medic,
                          onpressed: () => Navigator.pushNamed(
                              context, "/medic",
                              arguments: medic));
                    },
                  );
                }

                return Center(child: CircularProgressIndicator());
              },
            )),
          ],
        ),
      ),
    );
  }
}
