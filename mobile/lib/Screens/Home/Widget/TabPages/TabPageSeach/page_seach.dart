import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/Widget/PageSeachDoctors/Widgets/page_seach_doctors.dart';
import 'package:Spital/Screens/Home/Widget/TabPages/TabPageSeach/controllers/controller.dart';
import 'package:Spital/Screens/Shared/Widgets/AppbarThird/sliver_appbar_bottom.dart';
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/svg.dart';
import 'package:mobx/mobx.dart';

class PageSeach extends StatefulWidget {
  @override
  _PageSeachState createState() => _PageSeachState();
}

class _PageSeachState extends State<PageSeach> {
  final SearchPageController controller = SearchPageController();
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    
    return Scaffold(
      body: Container(
        color: Colors.white,
        child: Observer(
          builder: (_){
            return CustomScrollView(
              slivers: [
                AppBarSliverPageWithBottom(
                  image: 'images/ilustracao_seach.svg',
                  title: "Busque médicos\npor categoria",
                  height: height,
                  width: width,
                  onTextChange: controller.changeSearchTerm,
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
                                            texto: controller.categorias[index],
                                            image: controller.categorias_imagens[index],
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
                                        controller.categorias_imagens[index],
                                        height: 50,
                                        width: 50,
                                      ),
                                      Text(
                                        controller.categorias[index],
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
                    childCount: controller.categorias.length,
                  ),
                ),
              ],
            );
          }
        )
      )
    );
  }
}
