import 'package:Spital/Screens/Shared/Models/review_model.dart';
import 'package:Spital/core/app_colors.dart';
import 'package:Spital/core/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class ListReview extends StatelessWidget {
  const ListReview({
    Key? key,
    required this.reviews,
  }) : super(key: key);
  final List<ReviewModel> reviews;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Container(
        child: ListView.builder(
          physics: BouncingScrollPhysics(),
          itemBuilder: (context, index) {
            ReviewModel review = reviews[index];
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
              child: Container(
                padding: EdgeInsets.all(10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: AppColors.blueTransparent,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      child: Text(
                        review.firstName,
                        style: AppTextStyles.titleBold5,
                      ),
                    ),
                    Row(
                      children: [
                        Container(
                          child: Text(review.stars.toString()),
                        ),
                        Container(
                          child: RatingBar.builder(
                            ignoreGestures: true,
                            initialRating: review.stars,
                            minRating: 1,
                            direction: Axis.horizontal,
                            allowHalfRating: true,
                            itemCount: 5,
                            itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
                            itemSize: 20,
                            itemBuilder: (context, _) => Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            onRatingUpdate: (rating) {
                              print(rating);
                            },
                          ),
                        ),
                        Container(
                          child: Text(
                            "20/07/2021",
                            style: AppTextStyles.information,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      child: Text(
                        review.description,
                        style: AppTextStyles.information,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
          itemCount: reviews.length,
        ),
      ),
    );
  }
}
