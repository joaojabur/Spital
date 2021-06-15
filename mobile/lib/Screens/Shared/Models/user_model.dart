import 'dart:convert';

class UserModel {
  String firstName;
  String lastName;
  String email;
  String phoneNumber;

  String image;
  int xp;
  bool confirmed;

  UserModel(
      {required this.firstName,
      required this.lastName,
      required this.email,
      required this.phoneNumber,
      required this.image,
      required this.xp,
      required this.confirmed});

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

  factory UserModel.fromJson(String source) =>
      UserModel.fromMap(json.decode(source));
}
