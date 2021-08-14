import 'package:mobx/mobx.dart';
part 'controller.g.dart';

class SearchPageController = _SearchPageControllerBase with _$SearchPageController;

List<String> _imagesCatergorias = [
  "images/icons/hospital/svg/012-swollen.svg",
  "images/icons/hospital/svg/016-heart.svg",
  "images/icons/hospital/svg/051-dentist.svg",
  "images/icons/hospital/svg/023-ear.svg",
  "images/icons/hospital/svg/014-broken bone.svg",
  "images/icons/hospital/svg/041-lungs.svg",
  "images/icons/hospital/svg/026-brain.svg",
  "images/icons/hospital/svg/015-sick.svg",
  "images/icons/hospital/svg/052-kidney.svg",
  "images/icons/hospital/svg/053-urology.svg",
  "images/icons/hospital/svg/044-blood bag.svg",
  "images/icons/hospital/svg/005-virus.svg",
  "images/icons/hospital/svg/054-colon.svg",
  "images/icons/hospital/svg/055-dermis.svg",
  "images/icons/hospital/svg/056-endocrinology.svg",
  "images/icons/hospital/svg/057-stomach.svg",
  "images/icons/hospital/svg/058-gynecology.svg",
  "images/icons/hospital/svg/059-bacteria.svg",
  "images/icons/hospital/svg/060-nutrology.svg",
  "images/icons/hospital/svg/061-obstetrics.svg",
  "images/icons/hospital/svg/062-pediatrician.svg",
  "images/icons/hospital/svg/025-x ray.svg",
  "images/icons/hospital/svg/063-radiotherapy.svg",
  "images/icons/hospital/svg/064-muscle.svg",
  "images/icons/hospital/svg/065-globulos-vermelhos.svg",
];
List<String> _ogCategorias = [
  "Oftalmologista",
  "Cardiologista",
  "Dentista",
  "Otorrinolaringologista",
  "Ortopedista",
  "Pneumologista",
  "Nefrologista",
  "Geriatra",
  "Neurologista",
  "Urologista",
  "Hematologista",
  "Alergista e\n Imunologista",
  "Coloproctologista",
  "Dermatologista",
  "Endocrinologista",
  "Gastroenterologista",
  "Ginecologista",
  "Infectologista",
  "Nutrologista",
  "Obstetricista",
  "Pediatra",
  "Radiologista",
  "Radioterapista",
  "Reumatologista",
  "Angiologista",
];
abstract class _SearchPageControllerBase with Store {
  @observable
  String searchTerm = "";

  @observable
  ObservableList<String> categorias = _ogCategorias.asObservable();

  @observable
  ObservableList<String> categorias_imagens = _imagesCatergorias.asObservable();

  @action
  changeSearchTerm(String value){
    searchTerm = value;
    filter(value);
  }

  @action
  filter(String value){
    categorias = ObservableList<String>.of(_ogCategorias.where((element) => element.toLowerCase().contains(value.toLowerCase())));
    categorias_imagens = ObservableList<String>.of(
      _imagesCatergorias.where((element){
        int index = _imagesCatergorias.indexOf(element);
        String ogCategoria = _ogCategorias[index];

        return categorias.indexOf(ogCategoria) != -1;
      })
    );
  }
}