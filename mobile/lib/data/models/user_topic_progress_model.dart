class UserTopicProgress {
  final int userId;
  final int topicId;
  final List<int> wordProgress;

  UserTopicProgress({
    required this.userId,
    required this.topicId,
    required this.wordProgress,
  });

  factory UserTopicProgress.fromJson(Map<String, dynamic> json) {
    return UserTopicProgress(
      userId: json['user_id'],
      topicId: json['topic_id'],
      wordProgress: List<int>.from(json['word_progress']),
    );
  }

  Map<String, dynamic> toJson() => {
    'user_id': userId,
    'topic_id': topicId,
    'word_progress': wordProgress,
  };
}
