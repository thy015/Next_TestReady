import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/newspaper_model.dart';
import '../../core/api_constants.dart';

class NewsRemoteDataSource {
  final String baseUrl = ApiConstants.baseUrl;
  NewsRemoteDataSource();

  Future<List<NewsArticle>> getAllNews() async {
    final response = await http.get(Uri.parse('$baseUrl/newspaper/'));

    if (response.statusCode == 200) {
      final List<dynamic> jsonList = json.decode(response.body);
      return jsonList.map((json) => NewsArticle.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load news');
    }
  }

  Future<NewsArticle> getNewsById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/news/$id'));

    if (response.statusCode == 200) {
      final Map<String, dynamic> jsonMap = json.decode(response.body);
      return NewsArticle.fromJson(jsonMap);
    } else {
      throw Exception('Failed to load news with id $id');
    }
  }
}
