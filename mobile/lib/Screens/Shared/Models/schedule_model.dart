import 'dart:convert';

class ScheduleModel {
  final String from;
  final String to;
  final int weekDay;

  ScheduleModel(
    this.from,
    this.to,
    this.weekDay,
  );

  ScheduleModel copyWith({
    String? from,
    String? to,
    int? weekDay,
  }) {
    return ScheduleModel(
      from ?? this.from,
      to ?? this.to,
      weekDay ?? this.weekDay,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'from': from,
      'to': to,
      'weekDay': weekDay,
    };
  }

  factory ScheduleModel.fromMap(Map<String, dynamic> map) {
    return ScheduleModel(
      map['from'],
      map['to'],
      map['week_day'],
    );
  }

  String toJson() => json.encode(toMap());

  factory ScheduleModel.fromJson(String source) => ScheduleModel.fromMap(json.decode(source));

  @override
  String toString() => 'ScheduleModel(from: $from, to: $to, weekDay: $weekDay)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is ScheduleModel &&
      other.from == from &&
      other.to == to &&
      other.weekDay == weekDay;
  }

  @override
  int get hashCode => from.hashCode ^ to.hashCode ^ weekDay.hashCode;
}
