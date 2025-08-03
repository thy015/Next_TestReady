enum CourseType { toeic, ielts, starters, advanced, unknown }

extension CourseTypeExtension on CourseType {
  String get name {
    switch (this) {
      case CourseType.toeic:
        return 'TOEIC CƠ BẢN';
      case CourseType.ielts:
        return 'IELTS CƠ BẢN';
      case CourseType.starters:
        return 'TOEIC NÂNG CAO';
      case CourseType.advanced:
        return 'IELTS NÂNG CAO';
      case CourseType.unknown:
      default:
        return '';
    }
  }

  static CourseType fromString(String? value) {
    switch (value?.toUpperCase().trim()) {
      case 'TOEIC CƠ BẢN':
        return CourseType.toeic;
      case 'IELTS CƠ BẢN':
        return CourseType.ielts;
      case 'IELTS NÂNG CAO':
        return CourseType.advanced;
      case 'TOEIC NÂNG CAO':
        return CourseType.starters;
      default:
        return CourseType.unknown;
    }
  }
}
