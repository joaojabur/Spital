import 'dart:convert';

class ConsultModel {
  final int id;
  final String type;
  final String? description;
  final double price;

  ConsultModel(
    this.id,
    this.type,
    this.description, 
    this.price,
  );
  

  ConsultModel copyWith({
    int? id,
    String? type,
    String? description,
    double? price,
  }) {
    return ConsultModel(
      id ?? this.id,
      type ?? this.type,
      description ?? this.description,
      price ?? this.price,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'type': type,
      'description': description,
      'price': price,
    };
  }

  factory ConsultModel.fromMap(Map<String, dynamic> map) {
    return ConsultModel(
      map['id'],
      map['type'],
      map['description'],
      double.parse(map['price']),
    );
  }

  String toJson() => json.encode(toMap());

  factory ConsultModel.fromJson(String source) => ConsultModel.fromMap(json.decode(source));

  @override
  String toString() {
    return 'ConsultModel(id: $id, type: $type, description: $description, price: $price)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is ConsultModel &&
      other.id == id &&
      other.type == type &&
      other.description == description &&
      other.price == price;
  }

  @override
  int get hashCode {
    return id.hashCode ^
      type.hashCode ^
      description.hashCode ^
      price.hashCode;
  }
}
