import '../datasources/newspaper_datasource.dart';
import '../models/newspaper_model.dart';

class NewsRepository {
  final NewsRemoteDataSource remoteDataSource;

  NewsRepository({required this.remoteDataSource});

  Future<List<NewsArticle>> fetchAllNews() {
    return remoteDataSource.getAllNews();
  }

  Future<NewsArticle> fetchNewsById(int id) {
    return remoteDataSource.getNewsById(id);
  }
}
