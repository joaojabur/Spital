import 'package:Spital/Screens/Shared/Widgets/AppBarSliver/controller/controller.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/svg.dart';

import 'package:ionicons/ionicons.dart';

class AppBarSliverPageSeachDoctors extends StatefulWidget {
  const AppBarSliverPageSeachDoctors({
    Key? key,
    required this.title,
    required this.image,
    required this.width,
    required this.height,
  }) : super(key: key);

  final String title;

  final String image;
  final double width;
  final double height;

  @override
  _AppBarSliverPageSeachDoctorsState createState() =>
      _AppBarSliverPageSeachDoctorsState();
}

class _AppBarSliverPageSeachDoctorsState
    extends State<AppBarSliverPageSeachDoctors> {
  final SliverAppBarController controller = SliverAppBarController();
  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
        bottom: PreferredSize(
            child: Observer(
              builder: (_) {
                return Padding(
                    padding:
                        const EdgeInsets.only(top: 0, right: 60, bottom: 10),
                    child: SizedBox(
                      height: 45,
                      width: 300,
                      child: Padding(
                        padding: const EdgeInsets.only(left: 20),
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              color: Colors.white,
                              border:
                                  Border.all(color: Colors.black26, width: 1)),
                          child: TextField(
                            decoration: InputDecoration(
                              focusedBorder: UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(color: Colors.transparent)),
                              errorBorder: UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(color: Colors.transparent)),
                              border: UnderlineInputBorder(
                                borderSide:
                                    BorderSide(color: Colors.transparent),
                              ),
                              enabledBorder: UnderlineInputBorder(
                                borderSide:
                                    BorderSide(color: Colors.transparent),
                              ),
                              disabledBorder: UnderlineInputBorder(
                                borderSide:
                                    BorderSide(color: Colors.transparent),
                              ),
                              hintText: "Pesquisar",
                              hintStyle: AppTextStyles.reviewUserTitle,
                              icon: Padding(
                                padding:
                                    const EdgeInsets.only(left: 10, bottom: 0),
                                child: Icon(
                                  Ionicons.search,
                                  size: 24,
                                  color: AppColors.darkBlue,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ));
              },
            ),
            preferredSize: Size.fromHeight(50.0)),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
              bottomRight: Radius.circular(80), bottomLeft: Radius.circular(0)),
        ),
        backgroundColor: AppColors.blueTransparent,
        expandedHeight: 140,
        toolbarHeight: 10,
        pinned: true,
        floating: false,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: Observer(builder: (_) {
          return Text(
            controller.isExpanded ? '' : "",
            style: AppTextStyles.titleBold2,
          );
        }),
        shadowColor: Colors.transparent,
        /* title: Observer(builder: (_) {
          return Text(
            controller.isExpanded ? '' : widget.text,
            style: AppTextStyles.titleBold2,
          );
        }),*/
        flexibleSpace: LayoutBuilder(
            builder: (BuildContext context, BoxConstraints constraints) {
          SchedulerBinding.instance!.addPostFrameCallback((_) {
            controller.changeExpanded((constraints.biggest.height > 100));
            print(controller.isExpanded);
          });

          return FlexibleSpaceBar(
            background: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 50, right: 0, left: 15),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          height: 40,
                          width: 40,
                          child: Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                                color: Colors.white),
                            child: IconButton(
                                icon: Icon(Ionicons.chevron_back_outline),
                                color: AppColors.black,
                                onPressed: () {
                                  Navigator.pop(context);
                                }),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                            left: 10,
                          ),
                          child: Text(widget.title,
                              textAlign: TextAlign.center,
                              style: AppTextStyles.titleBold3),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(right: 20),
                          child: SizedBox(
                            child: Container(
                                padding: EdgeInsets.all(10),
                                height: 50,
                                width: 50,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(50),
                                    color: Colors.lime[50]),
                                child: widget.image == ""
                                    ? null
                                    : SizedBox(
                                        height: 30,
                                        width: 30,
                                        child: SvgPicture.asset(
                                          widget.image,
                                          height: 30,
                                          width: 30,
                                        ))),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }));
  }
}
