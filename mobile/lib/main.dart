import 'package:Spital/core/app_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_svg/svg.dart';
import 'package:intl/date_symbol_data_local.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  Future.wait([
    precachePicture(
      ExactAssetPicture(SvgPicture.svgStringDecoder, "images/splash.svg"),
      null,
    ),
    precachePicture(
      ExactAssetPicture(
          SvgPicture.svgStringDecoder, "images/ilustracao_login.svg"),
      null,
    ),
  ]);
  initializeDateFormatting().then((_) => runApp(AppWidget()));
}
