import 'package:Spital/Screens/Shared/Widgets/AppBarSliver/controller/controller.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ionicons/ionicons.dart';

class AppBarSliverPageWithBottom extends StatefulWidget {
  const AppBarSliverPageWithBottom({
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
  _AppBarSliverPageWithBottomState createState() =>
      _AppBarSliverPageWithBottomState();
}

class _AppBarSliverPageWithBottomState
    extends State<AppBarSliverPageWithBottom> {
  final SliverAppBarController controller = SliverAppBarController();
  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
        bottom: PreferredSize(
            child: Observer(
              builder: (_) {
                return Padding(
                  padding: const EdgeInsets.only(top: 0, right: 20, bottom: 10),
                  child: SizedBox(
                    height: 45,
                    width: 500,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 20),
                      child: Container(
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: AppColors.texfield,
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
                              borderSide: BorderSide(color: Colors.transparent),
                            ),
                            enabledBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.transparent),
                            ),
                            disabledBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.transparent),
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
                  ),
                );
              },
            ),
            preferredSize: Size.fromHeight(50.0)),
        shape: RoundedRectangleBorder(
            /*borderRadius: BorderRadius.only(
              bottomRight: Radius.circular(100),
              bottomLeft: Radius.circular(10)),*/
            ),
        backgroundColor: Colors.white,
        expandedHeight: 200,
        toolbarHeight: 10,
        pinned: true,
        floating: false,
        centerTitle: true,
        automaticallyImplyLeading: false,
        leading: Row(
          children: [],
        ),
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
            background: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 20),
                  child: Text(
                    widget.title,
                    style: TextStyle(fontSize: 25),
                    textAlign: TextAlign.justify,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 5),
                  child: widget.image == ""
                      ? null
                      : Container(
                          width: widget.width * 0.35,
                          height: widget.height * 0.15,
                          child: SvgPicture.asset(
                            widget.image,
                            fit: BoxFit.fill,
                          ),
                        ),
                ),
              ],
            ),
          );
        }));
  }
}
