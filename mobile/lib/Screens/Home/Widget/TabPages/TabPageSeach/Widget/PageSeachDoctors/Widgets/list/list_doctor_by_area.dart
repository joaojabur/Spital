import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/controller.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/controller/controller.dart';
import 'package:Spital/Screens/Shared/controllers/location_controller.dart';

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import 'package:provider/provider.dart';

import 'item_list_doctor.dart';

class ListDoctors extends StatefulWidget {
  final String area;
  final int page;
  final int distance;
  final String? name;
  final int price;
  final PageSearchController pageSearchController;
  const ListDoctors({
    Key? key, 
    required this.area, 
    required this.page,
     required this.distance, 
     required this.pageSearchController,
     this.name, required this.price
  }): super(key: key);
  @override
  _ListDoctorsState createState() => _ListDoctorsState();
}

class _ListDoctorsState extends State<ListDoctors> {
  ListDoctorController controller = ListDoctorController();

  @override
  Widget build(BuildContext context) {
    LocationController locationController = Provider.of<LocationController>(context);
    PageSearchController pageSearchController = this.widget.pageSearchController;

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.only(bottom: 5),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: FutureBuilder(
            future: controller.loadMedics(this.widget.area,
            locationController.position!, this.widget.distance, this.widget.name, this.widget.page),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                SchedulerBinding.instance!.addPostFrameCallback((_) {
                  if (this.widget.page == (pageSearchController.pages - 1)){
                    if (controller.medics.length != pageSearchController.lastSize){
                      pageSearchController.changeLastSize(controller.medics.length);
                    }
                  }
                });
                return NotificationListener<OverscrollIndicatorNotification>(
                  onNotification: (overscroll){
                    overscroll.disallowGlow();

                    return true;
                  },
                  child: ListView.separated(
                    shrinkWrap: true,
                    physics: BouncingScrollPhysics(),
                    separatorBuilder: (context, index) => Divider(
                      height: 10,
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
                  )
                );
              }

              return Center(child: CircularProgressIndicator());
            },
          ),
        ),
      ),
    );
  }
}
