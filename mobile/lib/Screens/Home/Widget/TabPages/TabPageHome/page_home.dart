import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/Widgets/list_category.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/Widgets/list_doctors.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/controller/page_home_controller.dart';
import 'package:Spital/Screens/Shared/controllers/location_controller.dart';

import 'package:Spital/Screens/Shared/Widgets/AppBarMain/appbar_main_widget.dart';
import 'package:Spital/Screens/Shared/Auth/auth_controller.dart';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:geolocator/geolocator.dart';

class PageHome extends StatefulWidget {
  @override
  _PageHomeState createState() => _PageHomeState();
}

class _PageHomeState extends State<PageHome> {
  PageHomeController pageHomeController = PageHomeController();

  getLocationPermission(LocationController controller) async {
    bool serviceEnabled;
    LocationPermission permission;
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
    return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      return Future.error('Location permissions are denied');
    }
    }

    if (permission == LocationPermission.deniedForever) { 
    return Future.error(
      'Location permissions are permanently denied, we cannot request permissions.');
    } 

    controller.setPosition(await Geolocator.getCurrentPosition());
  }

  @override
  Widget build(BuildContext context) {
    pageHomeController.authController = Provider.of<AuthController>(context);
    LocationController location = Provider.of<LocationController>(context);
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

   getLocationPermission(location);
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppbarWidget(
          width: width,
          height: height,
          name: pageHomeController.getUserFirstName(),
          image: pageHomeController.getUserImage()),
      body: Container(
        height: height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 10, left: 20),
                  child: Text(
                    "Categorias",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: Text(
                    "Ver mais",
                    style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFFBCBCBC)),
                  ),
                ),
              ],
            ),
            ListCategory(),
            ListDoctors(),
          ],
        ),
      ),
    );
  }
}
