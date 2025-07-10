
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/datasources/course_datasource.dart';
import '../data/repositories/course_repository.dart';
import '../data/models/topic_model.dart';
import '../data/models/word_model.dart';

final courseDataSourceProvider = Provider<CourseDataSource>((ref) {
  return CourseDataSource();
});
final courseRepositoryProvider = Provider<CourseRepository>((ref) {
  final dataSource = ref.watch(courseDataSourceProvider);
  return CourseRepository(dataSource: dataSource);
});
final topicsProvider = FutureProvider<List<TopicModel>>((ref) async {
  final repository = ref.watch(courseRepositoryProvider);
  return repository.loadTopics();
});
final wordsByTopicProvider = FutureProvider.family<List<WordModel>, int>((
  ref,
  topicId,
) async {
  final repository = ref.watch(courseRepositoryProvider);
  return repository.loadWordsByTopic(topicId);
});
