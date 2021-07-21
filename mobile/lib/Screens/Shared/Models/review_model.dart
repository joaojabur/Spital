import 'dart:convert';

class ReviewModel {
  final int id;
  final String firstName;
  final String lastName;
  final double stars;
  final String description;

  ReviewModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.stars,
    required this.description,
  });

  ReviewModel copyWith({
    int? id,
    String? firstName,
    String? lastName,
    double? stars,
    String? description,
  }) {
    return ReviewModel(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      stars: stars ?? this.stars,
      description: description ?? this.description,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'stars': stars,
      'description': description,
    };
  }

  factory ReviewModel.fromMap(Map<String, dynamic> map) {
    return ReviewModel(
      id: map['id'],
      firstName: map['first_name'],
      lastName: map['last_name'],
      stars: map['stars'].toDouble(),
      description: map['description'],
    );
  }

  String toJson() => json.encode(toMap());

  factory ReviewModel.fromJson(String source) =>
      ReviewModel.fromMap(json.decode(source));

  @override
  String toString() {
    return 'ReviewModel(id: $id, firstName: $firstName, lastName: $lastName, stars: $stars, description: $description)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is ReviewModel &&
        other.id == id &&
        other.firstName == firstName &&
        other.lastName == lastName &&
        other.stars == stars &&
        other.description == description;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        firstName.hashCode ^
        lastName.hashCode ^
        stars.hashCode ^
        description.hashCode;
  }
}
