import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import 'package:mobile/data/models/topic_model.dart';
import 'package:mobile/data/models/word_model.dart';
import 'package:http/http.dart' as http;
import '../../core/api_constants.dart';

class CourseDataSource {
  Future<List<TopicModel>> loadTopics() async {
    final url = Uri.parse('${ApiConstants.baseUrl}/topic/get-all');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((topic) => TopicModel.fromJson(topic)).toList();
    } else {
      throw Exception('Failed to load topics: ${response.statusCode}');
    }
  }

  Future<List<WordModel>> loadWordsByTopic(int topicId) async {
    final response = await http.get(
      Uri.parse('${ApiConstants.baseUrl}/word/get-by-topic/$topicId'),
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => WordModel.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load words by topic');
    }
  }
}
