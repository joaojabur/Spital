import 'package:Spital/Screens/Register/controller/register_controller.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class AppBarSliverPage extends StatefulWidget {
  const AppBarSliverPage({
    Key? key,
    required this.title,
    required this.topleftIcon,
    required this.iconLeft,
    required this.image,
  }) : super(key: key);

  final String title;
  final String image;

  final bool topleftIcon;

  final IconData iconLeft;

  @override
  _AppBarSliverPageState createState() => _AppBarSliverPageState();
}

class _AppBarSliverPageState extends State<AppBarSliverPage> {
  @override
  Widget build(BuildContext context) {
    RegisterController controller = Provider.of<RegisterController>(context);
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return SliverAppBar(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.only(bottomRight: Radius.circular(40)),
      ),
      backgroundColor: AppColors.blueTransparent,
      expandedHeight: 200,
      pinned: true,
      floating: true,
      centerTitle: true,
      leading: Container(
        margin: EdgeInsets.only(left: 15, right: 0, top: 5, bottom: 12),
        width: 50,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10), color: Colors.white),
        child: Padding(
          padding: EdgeInsets.only(right: 15),
          child: IconButton(
              icon: Icon(widget.iconLeft),
              color: AppColors.darkBlue,
              onPressed: () {
                controller.tabRegisterIndex == 0
                    ? Navigator.pop(context)
                    : controller
                        .changePageRegister(controller.tabRegisterIndex! - 1);
              }),
        ),
      ),
      flexibleSpace: FlexibleSpaceBar(
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
                width: 200,
                child:
                    widget.image == "" ? null : SvgPicture.asset(widget.image)),
          ],
        ),
        // title: Text(title),
        centerTitle: true,
      ),
    );
  }
}
