import 'course_type.dart';

class TopicModel {
  final int id;
  final String name;
  final String nameVN;
  final CourseType courseType;
  final String createdAt;
  final String updatedAt;
  final String image;

  TopicModel({
    required this.id,
    required this.name,
    required this.nameVN,
    required this.courseType,
    required this.createdAt,
    required this.updatedAt,
    required this.image,
  });

  factory TopicModel.fromJson(Map<String, dynamic> json) {
    return TopicModel(
      id: json['id'],
      name: json['name'],
      nameVN: json['nameVN'],
      courseType: CourseTypeExtension.fromString(json['category']),
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      image: json['image'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'name_vn': nameVN,
      'category': courseType.name,
      'created_at': createdAt,
      'updated_at': updatedAt,
      'image': image,
    };
  }
}
