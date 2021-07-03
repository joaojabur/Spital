import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/page_seach_doctors.dart';
import 'package:Spital/Screens/Shared/Widgets/AppbarThird/sliver_appbar_bottom.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class PageSeach extends StatefulWidget {
  @override
  _PageSeachState createState() => _PageSeachState();
}

class _PageSeachState extends State<PageSeach> {
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
    "Alergista e\n Imunologista",
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
        /* appBar: AppbarThird(
        title: "Encontre os\nmelhores médicos\nda sua região",
        width: width,
        height: height,
        topleftIcon: false,
        iconLeft: Ionicons.chevron_back_outline,
        value: 0.3,
      ),*/
        body: Container(
      color: Colors.white,
      child: CustomScrollView(
        slivers: [
          AppBarSliverPageWithBottom(
            image: 'images/ilustracao_seach.svg',
            title: "Busque médicos\npor categoria",
            height: height,
            width: width,
          ),
          SliverPadding(padding: EdgeInsets.only(top: 10)),
          SliverGrid(
            gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 200, //largura
              mainAxisSpacing: 0.0,
              crossAxisSpacing: 0.0,
              childAspectRatio: 2,
              mainAxisExtent: 150,
            ),
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                return Padding(
                  padding: EdgeInsets.all(12),
                  child: PhysicalModel(
                    color: Colors.black26,
                    borderRadius: BorderRadius.circular(20),
                    elevation: 3,
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => PageSeachDoctors(
                                      texto: _categorias[index],
                                      image: _imagesCatergorias[index],
                                    )));
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: Colors.white,
                        ),
                        child: Center(
                          child: Container(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SvgPicture.asset(
                                  _imagesCatergorias[index],
                                  height: 50,
                                  width: 50,
                                ),
                                Text(
                                  _categorias[index],
                                  style: AppTextStyles.categoriesTitle2,
                                  textAlign: TextAlign.center,
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
              childCount: 25,
            ),
          ),
        ],
      ),
    ));
  }
}
