import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class AppWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Spital",
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => Container()
      },
    );
  }
}