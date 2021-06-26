import 'package:Spital/Screens/Shared/Widgets/AppBarSliver/controller/controller.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/flutter_svg.dart';

class AppBarSliverPage extends StatefulWidget {
  const AppBarSliverPage(
      {Key? key,
      required this.title,
      required this.text,
      required this.topleftIcon,
      required this.iconLeft,
      required this.image,
      required this.onBackPressed})
      : super(key: key);

  final String title;
  final String text;
  final String image;
  final Function() onBackPressed;

  final bool topleftIcon;

  final IconData iconLeft;

  @override
  _AppBarSliverPageState createState() => _AppBarSliverPageState();
}

class _AppBarSliverPageState extends State<AppBarSliverPage> {
  final SliverAppBarController controller = SliverAppBarController();
  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.only(bottomRight: Radius.circular(40)),
        ),
        backgroundColor: AppColors.blueTransparent,
        expandedHeight: 200,
        pinned: true,
        floating: true,
        centerTitle: true,
        shadowColor: Colors.transparent,
        title: Observer(builder: (_) {
          return Text(
            controller.isExpanded ? '' : widget.text,
            style: AppTextStyles.titleBold2,
          );
        }),
        leading: Container(
          margin: EdgeInsets.only(left: 15, right: 0, top: 5, bottom: 12),
          width: 50,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10), color: Colors.white),
          child: IconButton(
              icon: Padding(
                padding: EdgeInsets.only(right: 15),
                child: Icon(widget.iconLeft),
              ),
              color: AppColors.darkBlue,
              onPressed: this.widget.onBackPressed),
        ),
        flexibleSpace: LayoutBuilder(
            builder: (BuildContext context, BoxConstraints constraints) {
          SchedulerBinding.instance!.addPostFrameCallback((_) {
            controller.changeExpanded((constraints.biggest.height > 100));
          });

          return FlexibleSpaceBar(
              background: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: EdgeInsets.only(top: 30, left: 10),
                child: Center(
                  child: Text(widget.title, style: AppTextStyles.titleBold2),
                ),
              ),
              Container(
                  width: widget.image == "" ? 0 : 200,
                  child: widget.image == ""
                      ? null
                      : SvgPicture.asset(widget.image)),
            ],
          ));
        }));
  }
}
