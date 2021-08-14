import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/controller.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/list/list_doctor_by_area.dart';
import 'package:Spital/Screens/Shared/Widgets/FilterDialog/filter_dialog.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

import 'appbar/sliver_app_bar_seach_doctors.dart';

class PageSeachDoctors extends StatefulWidget {
  const PageSeachDoctors({Key? key, required this.texto, required this.image})
      : super(key: key);
  final String texto;
  final String image;

  @override
  _PageSeachDoctorsState createState() => _PageSeachDoctorsState();
}

class _PageSeachDoctorsState extends State<PageSeachDoctors> {
  final PageSearchController controller = PageSearchController();
  @override
  Widget build(BuildContext context) {
    String texto = widget.texto;
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;


    return Scaffold(
        body: NestedScrollView(
            physics: BouncingScrollPhysics(),
            headerSliverBuilder:
                (BuildContext context, bool innerBoxIsScrolled) {
              return <Widget>[
                AppBarSliverPageSeachDoctors(
                  title: "$texto",
                  image: "${widget.image}",
                  width: width,
                  height: height,
                  onFilterClick: (){
                    showDialog(
                      context: context,
                      builder: (_) => Observer(
                        builder: (_) {
                          return FilterDialog(
                            currentPrice: controller.price,
                            currentDistance: controller.distance,
                            onFilter: (int distance, int price){
                              controller.changeDistance(distance);
                              controller.changePrice(price);
                              Navigator.pop(_);
                            }
                          );
                        }
                      )
                    );
                  },
                  onTextChange: controller.changeName,
                ),
              ];
            },
            body: Observer(
              builder: (_) {
                return Column(
                  children: [
                  ListDoctors(
                      area: texto, 
                      distance: controller.distance,
                      name: controller.name,
                      page: controller.pages,
                      price: controller.price,
                      pageSearchController: controller,
                    ),
                    if (controller.lastSize == (30 * controller.pages)) ...([
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () => controller.changePage(controller.pages + 1),
                          child: Text("Carregar mais"),
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
                    ])
                  ]
                );
              }
            )
          )
        );
  }
}
