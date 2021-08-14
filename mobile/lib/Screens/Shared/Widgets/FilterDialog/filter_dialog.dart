
import 'package:Spital/core/core.dart';
import 'package:flutter/material.dart';

class FilterDialog extends StatefulWidget {
  FilterDialog({
    Key? key,
    required this.currentPrice,
    required this.currentDistance,
    required this.onFilter
  }) : super(key: key);
  final int currentPrice;
  final int currentDistance;
  final Function(int, int) onFilter;

  @override
  _FilterDialogState createState() => _FilterDialogState(price: currentPrice, distance: currentDistance);
}

class _FilterDialogState extends State<FilterDialog> {
  _FilterDialogState({
    required this.price,
    required this.distance
  });
  int price;
  int distance;
  final List<Map<String, dynamic>> filterDistance = [
    {
      "label": "Até 10km",
      "value": 10,
    },
    {
      "label": "Até 20km",
      "value": 20,
    },
    {
      "label": "Até 40km",
      "value": 40,
    },
    {
      "label": "Até 60km",
      "value": 60,
    },
    {
      "label": "Até 80km",
      "value": 80,
    },
    {
      "label": "Até 100km",
      "value": 100,
    },
    {
      "label": "Independente da distância",
      "value": 9999,
    }
  ];

  final List<Map<String, dynamic>> filterPrices = [
    {
      "label": "Até R\$ 100",
      "value": 100
    },
    {
      "label": "Até R\$ 200",
      "value": 200
    },
    {
      "label": "Até R\$ 300",
      "value": 300
    },
    {
      "label": "Até R\$ 400",
      "value": 400
    },
    {
      "label": "Até R\$ 500",
      "value": 500
    },
  ];

  @override
  Widget build(BuildContext context) {
    print("Price $price");
    return AlertDialog(
      insetPadding: EdgeInsets.all(16),
      title: Container(
        child: Text("Filtros"),
        alignment: Alignment.center,
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Preço até", style: AppTextStyles.titleBold3Cinza.merge(TextStyle(fontSize: 16)), textAlign: TextAlign.left,),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.lighGray,
              borderRadius: BorderRadius.circular(16)
            ),
            child: DropdownButton<int>(
              isExpanded: true,
              underline: Container(),
              iconDisabledColor: AppColors.lighGray,
              dropdownColor: AppColors.lighGray,
              focusColor: AppColors.lighGray,
              value: price,
              onChanged:  (int? value){
                setState((){
                  print("Value $value");
                  price = value!;
                });
              },
              items: filterPrices.map((Map<String, dynamic> item){
                return DropdownMenuItem<int>(
                  value: item["value"],
                  child: Text(item["label"]),
                );
              }).toList()
            ),
          ),
          Text("Distância até", style: AppTextStyles.titleBold3Cinza.merge(TextStyle(fontSize: 16)), textAlign: TextAlign.left,),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.lighGray,
              borderRadius: BorderRadius.circular(16)
            ),
            child: DropdownButton<int>(
              isExpanded: true,
              underline: Container(),
              iconDisabledColor: AppColors.lighGray,
              dropdownColor: AppColors.lighGray,
              focusColor: AppColors.lighGray,
              value: distance,
              onChanged: (int? value){
                setState((){
                  distance = value!;
                });
              },
              items: filterDistance.map((Map<String, dynamic> item){
                return DropdownMenuItem<int>(
                  value: item["value"],
                  child: Text(item["label"]),
                );
              }).toList()
            ),
          ),
          ElevatedButton(
            onPressed: () => this.widget.onFilter(distance, price),
            style: ButtonStyle(
              minimumSize: MaterialStateProperty.all<Size>(Size(double.infinity, 30)),
              backgroundColor: MaterialStateProperty.all<Color>(AppColors.darkBlue),
              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                )
              )
            ),
            child: Text("Filtrar")
          )
        ],
      ),
    );
  }
}
