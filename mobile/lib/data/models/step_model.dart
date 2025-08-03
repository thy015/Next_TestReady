import 'package:mobile/data/models/word_model.dart';

enum PhaseType { flashcard, listening, fillInTheBlank }

class LearningStep {
  final PhaseType phaseType;
  final WordModel word;
  final bool skipped;

  LearningStep({
    required this.phaseType,
    required this.word,
    this.skipped = false,
  });

  LearningStep copyWith({bool? skipped}) {
    return LearningStep(
      phaseType: phaseType,
      word: word,
      skipped: skipped ?? this.skipped,
    );
  }
}
