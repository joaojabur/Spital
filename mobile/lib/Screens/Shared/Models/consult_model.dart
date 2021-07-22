import 'dart:convert';

class ConsultModel {
  final int id;
  final String type;
  final String? description;

  ConsultModel(
    this.id,
    this.type,
    this.description,
  );
  

  ConsultModel copyWith({
    int? id,
    String? type,
    String? description,
  }) {
    return ConsultModel(
      id ?? this.id,
      type ?? this.type,
      description ?? this.description,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'type': type,
      'description': description,
    };
  }

  factory ConsultModel.fromMap(Map<String, dynamic> map) {
    return ConsultModel(
      map['id'],
      map['type'],
      map['description'],
    );
  }

  String toJson() => json.encode(toMap());

  factory ConsultModel.fromJson(String source) => ConsultModel.fromMap(json.decode(source));

  @override
  String toString() => 'ConsultModel(id: $id, type: $type, description: $description)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is ConsultModel &&
      other.id == id &&
      other.type == type &&
      other.description == description;
  }

  @override
  int get hashCode => id.hashCode ^ type.hashCode ^ description.hashCode;
}
