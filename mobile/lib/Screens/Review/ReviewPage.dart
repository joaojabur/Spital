import 'package:Spital/Screens/Review/Widget/list_review.dart';
import 'package:Spital/Screens/Review/controller/review_controller.dart';
import 'package:Spital/Screens/Shared/Widgets/AppBarSecond/appbar_second_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:ionicons/ionicons.dart';

class ReviewPage extends StatefulWidget {
  ReviewPage({Key? key}) : super(key: key);

  @override
  _ReviewPageState createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage> {
  final ReviewController controller = ReviewController();
  @override
  Widget build(BuildContext context) {
    final medicID = ModalRoute.of(context)!.settings.arguments as int;
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      appBar: AppbarSecundaria(
          topleftIcon: true,
          iconLeft: Ionicons.chevron_back_outline,
          onpressed: () {
            Navigator.pop(context);
          },
          title: "Avaliações",
          width: width,
          value: 0.12,
          height: height),
      body: FutureBuilder(
        future: controller.loadReviews(medicID),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            print(controller.reviews);
            return Observer(builder: (_) {
              print("controller.reviews");
              print(controller.reviews.length);
              return ListReview(
                reviews: controller.reviews,
              );
            });
          }

          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
