import 'package:mobile/data/models/word_model.dart';

enum PhaseType { flashcard, listening, fillInTheBlank, redo }

class LearningStep {
  final PhaseType phaseType;
  final WordModel word;

  LearningStep({required this.phaseType, required this.word});
}
