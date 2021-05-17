import 'dart:convert';

class UserModel {
  final String firstName;
  final String lastName;
  final String email;
  final String phoneNumber;
  final String image;
  final int xp;
  final bool confirmed;

  UserModel({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phoneNumber,
    required this.image,
    required this.xp,
    required this.confirmed
  });
  
  Map<String, dynamic> toMap() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phoneNumber': phoneNumber,
      'image': image,
      'xp': xp,
      'confirmed': confirmed,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      firstName: map['firstName'],
      lastName: map['lastName'],
      email: map['email'],
      phoneNumber: map['phoneNumber'],
      image: map['image'],
      xp: map['xp'],
      confirmed: map['confirmed'],
    );
  }

  String toJson() => json.encode(toMap());

  factory UserModel.fromJson(String source) => UserModel.fromMap(json.decode(source));
}
