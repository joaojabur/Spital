import 'dart:convert';

class MedicModel {
  final int userID;
  final int number;
  final String address;
  final double distance;
  final int id;
  final String phoneNumber;
  final String area;
  final String graduation;
  final String? masterDegree;
  final String? doctorateDegree;
  final String crm;
  final String cpf;
  final String rg;
  final String moipAccountID;
  final String bankAccountID;
  final bool configured;
  final String email;
  final int xp;
  final bool confirmed;
  final String birthDate;
  final String createdAt;
  final String firstName;
  final String lastName;
  final String rating;

  MedicModel({
      required  this.userID,
      required  this.number,
      required  this.address,
      required  this.distance,
      required  this.id,
      required  this.phoneNumber,
      required  this.area,
      required  this.graduation,
      this.masterDegree,
      this.doctorateDegree,
      required  this.crm,
      required  this.cpf,
      required  this.rg ,
      required  this.moipAccountID,
      required  this.bankAccountID,
      required  this.configured,
      required  this.email,
      required  this.xp,
      required  this.confirmed,
      required  this.birthDate,
      required  this.createdAt,
      required  this.firstName,
      required  this.lastName,
      required  this.rating
  });

  Map<String, dynamic> toMap() {
    return {
      'userID': userID,
      'number': number,
      'address': address,
      'distance': distance,
      'id': id,
      'phoneNumber': phoneNumber,
      'area': area,
      'graduation': graduation,
      'masterDegree': masterDegree,
      'doctorateDegree': doctorateDegree,
      'crm': crm,
      'cpf': cpf,
      'rg': rg,
      'moipAccountID': moipAccountID,
      'bankAccountID': bankAccountID,
      'configured': configured,
      'email': email,
      'xp': xp,
      'confirmed': confirmed,
      'birthDate': birthDate,
      'createdAt': createdAt,
      'firstName': firstName,
      'lastName': lastName,
      'rating': rating,
    };
  }

  factory MedicModel.fromMap(Map<String, dynamic> map) {
    return MedicModel(
      userID: map['userID'],
      number: map['number'],
      address: map['address'],
      distance: map['distance'],
      id: map['id'],
      phoneNumber: map['phoneNumber'],
      area: map['area'],
      graduation: map['graduation'],
      masterDegree: map['master_degree'] ?? '',
      doctorateDegree: map['doctorate_degree'] ?? '',
      crm: map['crm'],
      cpf: map['cpf'],
      rg: map['rg'],
      moipAccountID: map['moipAccountID'],
      bankAccountID: map['bankAccountID'],
      configured: map['configured'],
      email: map['email'],
      xp: map['xp'],
      confirmed: map['confirmed'],
      birthDate: map['birth_date'],
      createdAt: map['created_at'],
      firstName: map['firstName'],
      lastName: map['lastName'],
      rating: map['rating'],
    );
  }

  String toJson() => json.encode(toMap());

  factory MedicModel.fromJson(String source) => MedicModel.fromMap(json.decode(source));
}
