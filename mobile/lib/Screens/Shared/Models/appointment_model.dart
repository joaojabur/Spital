import 'dart:convert';

class AppointmentModel {
  final String date;
  final String time;
  final String doctorName;
  final String type;
  final String price;

  AppointmentModel(
    this.date,
    this.time,
    this.doctorName,
    this.type,
    this.price,
  );

  AppointmentModel copyWith({
    String? date,
    String? time,
    String? doctorName,
    String? type,
    String? price,
  }) {
    return AppointmentModel(
      date ?? this.date,
      time ?? this.time,
      doctorName ?? this.doctorName,
      type ?? this.type,
      price ?? this.price,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'date': date,
      'time': time,
      'medicFirstName': doctorName,
      'type': type,
      'price': price,
    };
  }

  factory AppointmentModel.fromMap(Map<String, dynamic> map) {
    return AppointmentModel(
      map['date'],
      map['time'],
      map['medicFirstName'],
      map['type'],
      map['price'],
    );
  }

  String toJson() => json.encode(toMap());

  factory AppointmentModel.fromJson(String source) => AppointmentModel.fromMap(json.decode(source));

  @override
  String toString() {
    return 'AppointmentModel(date: $date, time: $time, doctorName: $doctorName, type: $type, price: $price)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is AppointmentModel &&
      other.date == date &&
      other.time == time &&
      other.doctorName == doctorName &&
      other.type == type &&
      other.price == price;
  }

  @override
  int get hashCode {
    return date.hashCode ^
      time.hashCode ^
      doctorName.hashCode ^
      type.hashCode ^
      price.hashCode;
  }
}
