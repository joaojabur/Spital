String getMonth(int month){
  switch (month){      
    case 2:
      return 'Fevereiro';
    case 3:
      return 'Março';
    case 4:
      return 'Abril';
    case 5:
      return 'Maio';
    case 6:
      return 'Junho';
    case 7:
      return 'Julho';
    case 8:
      return 'Agosto';
    case 9:
      return 'Setembro';
    case 10:
      return 'Outubro';
    case 11:
      return 'Novembro';
    case 12:
      return 'Dezembro';
    default:
      return 'Janeiro';
  }
}

enum FormatDateType {
  withMonth,
  ddmmyy,
  fromIsoTohhmmDDMMYY,
  fromIsoTohhmm
}

String formatDate(String date, FormatDateType type){
  List<String> dateSplited = date.split('/');

  switch (type){
    case FormatDateType.ddmmyy:
      return '${dateSplited[1].padLeft(2, '0')}/${dateSplited[0].padLeft(2, '0')} de ${dateSplited[2]}';
    case FormatDateType.fromIsoTohhmmDDMMYY:
      List<String> rawDate = date.split('T');
      List<String> dateSplited = rawDate[0].split('-');
      List<String> timeSplited = rawDate[1].split(".")[0].split(":");

      return ' ${timeSplited[0].padLeft(2, '0')}:${timeSplited[2].padLeft(2, '0')} ${dateSplited[1].padLeft(2, '0')}/${int.parse(dateSplited[1])}/${dateSplited[0]}';
    case FormatDateType.fromIsoTohhmm:
      List<String> rawDate = date.split('T');
      List<String> timeSplited = rawDate[1].split(".")[0].split(":");

      return ' ${timeSplited[0].padLeft(2, '0')}:${timeSplited[2].padLeft(2, '0')}';
    default:
      return '${dateSplited[1].padLeft(2, '0')} de ${getMonth(int.parse(dateSplited[0]))} de ${dateSplited[2]}';
  }
}