import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/datasources/newspaper_datasource.dart';
import '../data/repositories/newspaper_repository.dart';
import '../data/models/newspaper_model.dart';
import '../core/api_constants.dart';

final String baseUrl = ApiConstants.baseUrl;

final newsRemoteDataSourceProvider = Provider<NewsRemoteDataSource>((ref) {
  return NewsRemoteDataSource();
});

final newsRepositoryProvider = Provider<NewsRepository>((ref) {
  final remoteDataSource = ref.watch(newsRemoteDataSourceProvider);
  return NewsRepository(remoteDataSource: remoteDataSource);
});

final newsListProvider = FutureProvider<List<NewsArticle>>((ref) async {
  final repository = ref.watch(newsRepositoryProvider);
  return repository.fetchAllNews();
});
