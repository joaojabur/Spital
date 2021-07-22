import 'dart:convert';

class ReviewModel {
  final int id;
  final String firstName;
  final String lastName;
  final double stars;
  final String description;
  final String createdAt;

  ReviewModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.stars,
    required this.description,
    required this.createdAt
  });

  ReviewModel copyWith({
    int? id,
    String? firstName,
    String? lastName,
    double? stars,
    String? description,
    String? createdAt,
  }) {
    return ReviewModel(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      stars: stars ?? this.stars,
      description: description ?? this.description,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'stars': stars,
      'description': description,
      'createdAt': createdAt,
    };
  }

  factory ReviewModel.fromMap(Map<String, dynamic> map) {
    return ReviewModel(
      id: map['id'],
      firstName: map['first_name'],
      lastName: map['last_name'],
      stars: map['stars'].toDouble(),
      description: map['description'],
      createdAt: map['created_at'],
    );
  }

  String toJson() => json.encode(toMap());

  factory ReviewModel.fromJson(String source) => ReviewModel.fromMap(json.decode(source));

  @override
  String toString() {
    return 'ReviewModel(id: $id, firstName: $firstName, lastName: $lastName, stars: $stars, description: $description, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is ReviewModel &&
      other.id == id &&
      other.firstName == firstName &&
      other.lastName == lastName &&
      other.stars == stars &&
      other.description == description &&
      other.createdAt == createdAt;
  }

  @override
  int get hashCode {
    return id.hashCode ^
      firstName.hashCode ^
      lastName.hashCode ^
      stars.hashCode ^
      description.hashCode ^
      createdAt.hashCode;
  }
}
