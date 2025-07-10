import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import 'package:mobile/data/models/topic_model.dart';
import 'package:mobile/data/models/word_model.dart';

class CourseDataSource {
  Future<List<TopicModel>> loadTopics() async {
    final String response = await rootBundle.loadString(
      'lib/assets/data/topics.json',
    );
    final List<dynamic> data = json.decode(response);
    return data.map((topic) => TopicModel.fromJson(topic)).toList();
  }

  Future<List<WordModel>> loadWords() async {
    final String response = await rootBundle.loadString(
      'lib/assets/data/words.json',
    );
    final List<dynamic> data = json.decode(response);
    return data.map((topic) => WordModel.fromJson(topic)).toList();
  }

  Future<List<WordModel>> loadWordsByTopic(int topicId) async {
    final List<WordModel> allWords = await loadWords();
    return allWords.where((word) => word.topicId == topicId).toList();
  }
}
