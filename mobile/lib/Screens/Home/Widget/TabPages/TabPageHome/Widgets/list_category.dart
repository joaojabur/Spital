import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class ListCategory extends StatefulWidget {
  @override
  _ListCategoryState createState() => _ListCategoryState();
}

class _ListCategoryState extends State<ListCategory> {
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
    return Expanded(
        child: ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: _categorias.length,
      itemBuilder: (context, index) {
        return Container(
          margin: EdgeInsets.only(left: width * 0.05, bottom: height * 0.02),
          child: PhysicalModel(
            borderRadius: BorderRadius.circular(35),
            color: Colors.black,
            //shadowColor: Colors.grey,
            elevation: 3,
            child: Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(35), color: Colors.white),
              width: width * 0.26,
              height: height * 0.2,
              child: Padding(
                padding: const EdgeInsets.all(5),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    GestureDetector(
                      child: SvgPicture.asset(
                        _imagesCatergorias[index],
                        height: height * 0.053,
                        width: width * 0.05,
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
    ));
  }
}
