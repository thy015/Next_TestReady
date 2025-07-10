class UserWordProgress {
  final String id;
  final String userId;
  final String wordId;
  final bool isWordDone;
  final String? completedAt;

  UserWordProgress({
    required this.id,
    required this.userId,
    required this.wordId,
    required this.isWordDone,
    this.completedAt,
  });

  factory UserWordProgress.fromJson(Map<String, dynamic> json) {
    return UserWordProgress(
      id: json['id'],
      userId: json['user_id'],
      wordId: json['word_id'],
      isWordDone: json['is_word_done'],
      completedAt: json['completed_at'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'word_id': wordId,
      'is_word_done': isWordDone,
      'completed_at': completedAt,
    };
  }
}
