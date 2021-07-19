import 'package:Spital/Screens/Review/controller/review_controller.dart';
import 'package:flutter/material.dart';

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

    return Scaffold(
      body: FutureBuilder(
        future: controller.loadReviews(medicID),
        builder: (context, snapshot){
         if (snapshot.connectionState == ConnectionState.done) {
            print(controller.reviews);
            return Text("Carregado com Sucesso");
          }

          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}