import 'package:Spital/Screens/Home/Widget/TabPages/TabPageHome/list_doctors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

class AppBarTeste extends PreferredSize {
  final String title;

  AppBarTeste({this.title, double width, double height})
      : super(
          preferredSize: Size.fromHeight(height * 0.34),
          child: CustomScrollView(
            slivers: [
              SliverAppBar(
                backgroundColor: Colors.indigo,
                expandedHeight: 200,
                pinned: true,
                floating: true,
                flexibleSpace: FlexibleSpaceBar(
                  title: Text(title),
                  background: Image.network(
                      "https://img.ibxk.com.br/2018/07/31/31170152427155.jpg?w=328&h=218&mode=crop&scale=both&quality=80"),
                ),
              ),
              SliverFillRemaining(
                child: ListDoctors(),
              )
            ],
          ),
        );
}
