import 'package:Spital/Screens/Shared/Widgets/AppBarMain/appbar_main_widget.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class PageHome extends StatefulWidget {
  @override
  _PageHomeState createState() => _PageHomeState();
}

class _PageHomeState extends State<PageHome> {
  List _imagesCatergorias = [
    "images/icons/hospital/svg/012-swollen.svg",
    "images/icons/hospital/svg/016-heart.svg",
    "images/icons/hospital/svg/051-dentist.svg",
    "images/icons/hospital/svg/023-ear.svg",
    "images/icons/hospital/svg/014-broken bone.svg",
    "images/icons/hospital/svg/041-lungs.svg",
    "images/icons/hospital/svg/026-brain.svg",
    "images/icons/hospital/svg/015-sick.svg",
    "images/icons/hospital/svg/052-kidney.svg",
    "images/icons/hospital/svg/053-urology.svg",
    "images/icons/hospital/svg/044-blood bag.svg",
    "images/icons/hospital/svg/005-virus.svg",
    "images/icons/hospital/svg/054-colon.svg",
    "images/icons/hospital/svg/055-dermis.svg",
    "images/icons/hospital/svg/056-endocrinology.svg",
    "images/icons/hospital/svg/057-stomach.svg",
    "images/icons/hospital/svg/058-gynecology.svg",
    "images/icons/hospital/svg/059-bacteria.svg",
    "images/icons/hospital/svg/060-nutrology.svg",
    "images/icons/hospital/svg/061-obstetrics.svg",
    "images/icons/hospital/svg/062-pediatrician.svg",
    "images/icons/hospital/svg/025-x ray.svg",
    "images/icons/hospital/svg/063-radiotherapy.svg",
    "images/icons/hospital/svg/064-muscle.svg",
    "images/icons/hospital/svg/065-globulos-vermelhos.svg",
  ];
  List _categorias = [
    "Oftalmologista",
    "Cardiologista",
    "Dentista",
    "Otorrinolaringologista",
    "Ortopedista",
    "Pneumologista",
    "Nefrologista",
    "Geriatra",
    "Neurologista",
    "Urologista",
    "Hematologista",
    "Alergista \ne\n Imunologista",
    "Coloproctologista",
    "Dermatologista",
    "Endocrinologista",
    "Gastroenterologista",
    "Ginecologista",
    "Infectologista",
    "Nutrologista",
    "Obstetricista",
    "Pediatra",
    "Radiologista",
    "Radioterapista",
    "Reumatologista",
    "Angiologista",
  ];
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppbarWidget(width: width, height: height),
      body: Container(
        height: height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 10, left: 15),
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
            Expanded(
                child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _categorias.length,
              itemBuilder: (context, index) {
                return Container(
                  margin: EdgeInsets.only(left: 20, bottom: 20),
                  child: PhysicalModel(
                    borderRadius: BorderRadius.circular(35),
                    color: Colors.black,
                    //shadowColor: Colors.grey,
                    elevation: 10,
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(35),
                          color: Colors.white),
                      width: 90,
                      height: 70,
                      child: Padding(
                        padding: const EdgeInsets.all(5),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            GestureDetector(
                              child: SvgPicture.asset(
                                _imagesCatergorias[index],
                                height: 40,
                                width: 40,
                              ),
                            ),
                            Text(
                              _categorias[index],
                              style: AppTextStyles.categoriesTitle,
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              },
            )),
            Container(
              margin: EdgeInsets.only(bottom: 5),
              height: height * 0.3,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(bottom: 20),
                      child: Text(
                        "Doutores",
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                    ),
                    Expanded(
                      child: ListView.separated(
                        separatorBuilder: (context, index) => Divider(
                          height: 5,
                          color: Colors.white,
                        ),
                        itemCount: 3,
                        itemBuilder: (context, index) {
                          return Container(
                            height: 80,
                            width: 50,
                            color: Colors.black,
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
