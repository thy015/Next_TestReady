enum CourseType { toeic, ielts, starters }

extension CourseTypeExtension on CourseType {
  String get name {
    switch (this) {
      case CourseType.toeic:
        return 'TOEIC CƠ BẢN';
      case CourseType.ielts:
        return 'IELTS';
      case CourseType.starters:
        return 'TOEIC NÂNG CAO';
    }
  }

  static CourseType fromString(String value) {
    switch (value.toUpperCase()) {
      case 'TOEIC CƠ BẢN':
        return CourseType.toeic;
      case 'IELTS':
        return CourseType.ielts;
      case 'TOEIC NÂNG CAO':
        return CourseType.starters;
      default:
        throw Exception('Invalid CourseType: $value');
    }
  }
}
