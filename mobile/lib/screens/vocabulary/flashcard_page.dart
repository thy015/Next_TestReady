import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:mobile/core/api_constants.dart';
import 'package:mobile/screens/vocabulary/completion_page.dart';
import "../../widgets/bottom_modal.dart";
import 'package:mobile/widgets/fill_blank.dart';
import 'package:mobile/widgets/listening.dart';
import '../../widgets/flashcard_widget.dart';
import "../../providers/course_provider.dart";
import "../../data/models/step_model.dart";
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

bool isCorrect = false;

class FlashcardPage extends ConsumerStatefulWidget {
  final int? topicId;

  const FlashcardPage({super.key, this.topicId});

  @override
  ConsumerState<FlashcardPage> createState() => _FlashcardPageState();
}

class _FlashcardPageState extends ConsumerState<FlashcardPage>
    with AutomaticKeepAliveClientMixin {
  final PageController pageController = PageController();
  final FlutterTts _flutterTts = FlutterTts();

  int crtPage = 0;
  bool _isInitialized = false;
  bool _isProcessing = false;

  @override
  bool get wantKeepAlive => true;

  @override
  void initState() {
    super.initState();
    _initializeTts();
  }

  Future<void> _initializeTts() async {
    if (_isInitialized) return;

    try {
      await _flutterTts.setLanguage('en-US');
      await _flutterTts.setSpeechRate(0.5);
      _isInitialized = true;
    } catch (e) {
      print('TTS initialization error: $e');
    }
  }

  Future<void> speakWord(String word) async {
    if (!_isInitialized) {
      await _initializeTts();
    }
    try {
      await _flutterTts.stop();
      await _flutterTts.speak(word);
    } catch (e) {
      print('TTS speak error: $e');
    }
  }

  @override
  void dispose() {
    _flutterTts.stop();
    pageController.dispose();
    super.dispose();
  }

  Future<void> saveWordStateApi(int wordId, String state) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      print('Không tìm thấy token');
      return;
    }
    final url = Uri.parse('${ApiConstants.baseUrl}/word-user');
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({'wordID': wordId, 'state': state}),
    );

    if (response.statusCode == 200) {
      print('Đã lưu từ $wordId');
    } else {
      print(
        'Lỗi khi lưu từ $wordId: ${response.statusCode} - ${response.body}',
      );
    }
  }

  void goToNextCard() {
    if (_isProcessing) return;
    _isProcessing = true;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final steps = ref.read(stepListProvider);
      final step = steps[crtPage];

      if (!isCorrect) {
        final stepNotifier = ref.read(stepListProvider.notifier);
        switch (step.phaseType) {
          case PhaseType.listening:
            stepNotifier.addListening(step.word);
            break;
          case PhaseType.fillInTheBlank:
            stepNotifier.addReading(step.word);
            break;
          case PhaseType.flashcard:
            break;
        }
      }

      final updatedSteps = ref.read(stepListProvider);
      final canNext = crtPage < updatedSteps.length - 1;

      if (canNext || (!isCorrect && crtPage == updatedSteps.length - 1)) {
        pageController.nextPage(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );

        if (mounted) {
          setState(() {
            crtPage++;
          });
        }
        ref.read(isRight.notifier).state = false;
      }

      _isProcessing = false;
    });
  }

  void goBack() {
    if (_isProcessing) return;
    ref.read(isRight.notifier).state = false;
    ref.read(stepListProvider.notifier).clearSteps();
    _flutterTts.stop();
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final typed = ref.watch(word);
    final canNext = ref.watch(isRight);
    final wordList =
        widget.topicId == null
            ? ref.watch(allLearnedWordsProvider)
            : ref.watch(wordsByTopicProvider(widget.topicId!));
    final steps = ref.watch(stepListProvider);

    return wordList.when(
      loading:
          () => const Scaffold(
            backgroundColor: Color(0xFFF5F5F5),
            body: Center(child: CircularProgressIndicator()),
          ),
      error:
          (error, _) => Scaffold(
            backgroundColor: const Color(0xFFF5F5F5),
            body: Center(child: Text('Lỗi: $error')),
          ),
      data: (articles) {
        if (articles.isEmpty) {
          return const Scaffold(
            backgroundColor: Color(0xFFF5F5F5),
            body: Center(child: Text('Không có từ vựng nào.')),
          );
        }

        if (steps.isEmpty && !_isProcessing) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            ref.read(stepListProvider.notifier).generateSteps(articles);
          });
          return const Scaffold(
            backgroundColor: Color(0xFFF5F5F5),
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (steps.isEmpty) {
          return const Scaffold(
            backgroundColor: Color(0xFFF5F5F5),
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final progress = (crtPage + 1) / steps.length;

        return Scaffold(
          backgroundColor: const Color(0xFFF5F5F5),
          body: SafeArea(
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: goBack,
                        icon: const Icon(Icons.close, color: Colors.grey),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: LinearProgressIndicator(
                          value: progress,
                          backgroundColor: Colors.grey[300],
                          color: Colors.blue[900],
                          minHeight: 16,
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      const SizedBox(width: 12),
                    ],
                  ),
                ),

                Expanded(
                  child: PageView.builder(
                    controller: pageController,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: steps.length,
                    onPageChanged: (index) {
                      if (mounted && !_isProcessing) {
                        setState(() {
                          crtPage = index;
                        });
                      }
                    },
                    itemBuilder: (context, index) {
                      if (index >= steps.length) return const SizedBox();

                      final step = steps[index];

                      return RepaintBoundary(child: _buildStepWidget(step));
                    },
                  ),
                ),

                Container(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed:
                              !canNext || _isProcessing
                                  ? null
                                  : _handleConfirmPressed,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color.fromARGB(
                              255,
                              3,
                              64,
                              156,
                            ),
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                            elevation: 0,
                          ),
                          child:
                              _isProcessing
                                  ? const SizedBox(
                                    width: 20,
                                    height: 20,
                                    child: CircularProgressIndicator(
                                      color: Colors.white,
                                      strokeWidth: 2,
                                    ),
                                  )
                                  : const Text(
                                    'Xác nhận',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      TextButton(
                        onPressed: () {},
                        child: Text(
                          'Mình đã thuộc từ này',
                          style: TextStyle(
                            color: Colors.grey[600],
                            fontSize: 14,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildStepWidget(dynamic step) {
    switch (step.phaseType) {
      case PhaseType.flashcard:
        return Center(
          child: FlashcardWidget(
            vocab: step.word,
            onSpeak: () => speakWord(step.word.word),
          ),
        );
      case PhaseType.listening:
        return Center(
          child: Listening(
            word: step.word,
            onSpeak: () => speakWord(step.word.word),
          ),
        );
      case PhaseType.fillInTheBlank:
        return Center(child: FillInTheBlank(word: step.word));
      default:
        return const SizedBox();
    }
  }

  void _handleConfirmPressed() async {
    if (_isProcessing) return;

    final steps = ref.read(stepListProvider);
    if (crtPage >= steps.length) return;

    final currentStep = steps[crtPage];
    final isLast = crtPage == steps.length - 1;
    final typed = ref.read(word);
    isCorrect =
        typed.toString().toLowerCase() == currentStep.word.word.toLowerCase();

    if (currentStep.phaseType != PhaseType.flashcard) {
      showFlashcardPopup(context, currentStep.word, isCorrect, () async {
        if (isLast && isCorrect) {
          await _markAllWordsAsLearned();
          await _markTopicAsDone();
          final articles =
              ref.read(wordsByTopicProvider(widget.topicId ?? 0)).value ?? [];
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => CompletionPage(wordsAdded: articles.length),
            ),
          );
        } else if (isLast) {
          goToNextCard();
        } else if (!isCorrect) {
          ref.read(isRight.notifier).state = false;
          goToNextCard();
        } else {
          goToNextCard();
        }
      }, () => speakWord(currentStep.word.word));
    } else {
      if (isLast) {
        await _markAllWordsAsLearned();
        goBack();
      } else {
        goToNextCard();
      }
    }
  }

  Future<void> _markTopicAsDone() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token == null || widget.topicId == null) return;

    final url = Uri.parse('${ApiConstants.baseUrl}/topic-user');
    final response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'topicID': widget.topicId, 'isDone': true}),
    );
    if (response.statusCode == 200) {
      print(" Đã đánh dấu topic ${widget.topicId} là hoàn thành");
    } else {
      print(
        "Lỗi khi đánh dấu topic: ${response.statusCode} - ${response.body}",
      );
    }
  }

  Future<void> _markAllWordsAsLearned() async {
    final wordList =
        widget.topicId == null
            ? ref.watch(allLearnedWordsProvider)
            : ref.watch(wordsByTopicProvider(widget.topicId!));
    wordList.whenData((articles) async {
      for (final word in articles) {
        await saveWordStateApi(word.id, "Đã học");
      }
    });
  }
}
