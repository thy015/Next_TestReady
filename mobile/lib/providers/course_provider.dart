import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/core/api_constants.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../data/datasources/course_datasource.dart';
import '../data/repositories/course_repository.dart';
import '../data/models/topic_model.dart';
import '../data/models/word_model.dart';
import '../data/models/step_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

final courseDataSourceProvider = Provider.autoDispose<CourseDataSource>((ref) {
  return CourseDataSource();
});

final courseRepositoryProvider = Provider.autoDispose<CourseRepository>((ref) {
  final dataSource = ref.watch(courseDataSourceProvider);
  return CourseRepository(dataSource: dataSource);
});

final topicsProvider = FutureProvider.autoDispose<List<TopicModel>>((
  ref,
) async {
  final repository = ref.watch(courseRepositoryProvider);
  return repository.loadTopics();
});

final wordsByTopicProvider = FutureProvider.autoDispose
    .family<List<WordModel>, int>((ref, topicId) async {
      final repository = ref.watch(courseRepositoryProvider);
      return repository.loadWordsByTopic(topicId);
    });

final isRight = StateProvider.autoDispose<bool>((ref) => false);
final word = StateProvider.autoDispose<String>((ref) => '');

class StepListNotifier extends StateNotifier<List<LearningStep>> {
  StepListNotifier() : super([]);

  void generateSteps(List<WordModel> words) {
    final newSteps = <LearningStep>[];
    for (var word in words) {
      newSteps.add(LearningStep(phaseType: PhaseType.flashcard, word: word));
    }
    for (var word in words) {
      newSteps.add(LearningStep(phaseType: PhaseType.listening, word: word));
      newSteps.add(
        LearningStep(phaseType: PhaseType.fillInTheBlank, word: word),
      );
    }

    state = newSteps;
  }

  void addListening(WordModel word) {
    final updatedSteps = [...state];
    updatedSteps.add(LearningStep(phaseType: PhaseType.listening, word: word));
    state = updatedSteps;
  }

  void addReading(WordModel word) {
    final updatedSteps = [...state];
    updatedSteps.add(
      LearningStep(phaseType: PhaseType.fillInTheBlank, word: word),
    );
    state = updatedSteps;
  }

  void clearSteps() {
    state = [];
  }

  @override
  void dispose() {
    print('StepListNotifier disposed');
    super.dispose();
  }
}

final stepListProvider =
    StateNotifierProvider.autoDispose<StepListNotifier, List<LearningStep>>(
      (ref) => StepListNotifier(),
    );
final allLearnedWordsProvider = FutureProvider<List<WordModel>>((ref) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) throw Exception("Missing token");

  final response = await http.get(
    Uri.parse('${ApiConstants.baseUrl}/word-user'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    },
  );
  if (response.statusCode != 200) {
    throw Exception('Lỗi lấy từ vựng: ${response.statusCode}');
  }
  final data = jsonDecode(response.body) as List;
  final filteredWords =
      data
          .where((e) => e['state'] == "Đã nhớ" || e['state'] == "Đã học")
          .toList();
  return filteredWords
      .map<WordModel>((e) => WordModel.fromJson(e['word']))
      .toList();
});
