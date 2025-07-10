import '../datasources/course_datasource.dart';
import '../models/topic_model.dart';
import '../models/word_model.dart';

class CourseRepository {
  final CourseDataSource dataSource;

  CourseRepository({required this.dataSource});

  Future<List<TopicModel>> loadTopics() async {
    return await dataSource.loadTopics();
  }
  Future<List<WordModel>> loadWordsByTopic(int topicId) async {
    return await dataSource.loadWordsByTopic(topicId);
  }
}
