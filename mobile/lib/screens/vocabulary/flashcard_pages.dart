import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_tts/flutter_tts.dart';
import '../../widgets/flashcard_widget.dart';
import "../../providers/course_provider.dart";

int _totalArticles = 0;

class FlashcardPage extends ConsumerStatefulWidget {
  final int? topicId;
  const FlashcardPage({super.key, this.topicId});

  @override
  ConsumerState<FlashcardPage> createState() => _FlashcardPageState();
}

class _FlashcardPageState extends ConsumerState<FlashcardPage> {
  final PageController _pageController = PageController();
  final FlutterTts _flutterTts = FlutterTts();
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _flutterTts.setLanguage('en-US');
    _flutterTts.setSpeechRate(0.5);
  }

  void _goToNextCard() {
    if (_currentIndex < _totalArticles - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _speakWord(String word) {
    _flutterTts.speak(word);
    print('Đang đọc từ: $word');
  }

  @override
  void dispose() {
    _pageController.dispose();
    _flutterTts.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final wordList = ref.watch(wordsByTopicProvider(widget.topicId ?? 0));
    return wordList.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, _) => Center(child: Text('Lỗi: $error')),
      data: (articles) {
        if (articles.isEmpty) {
          return const Center(child: Text('Không có từ vựng nào.'));
        }
        _totalArticles = articles.length;
        final progress = (_currentIndex + 1) / articles.length;
        return Scaffold(
          backgroundColor: const Color(0xFFF5F5F5),
          body: SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: () => Navigator.pop(context),
                        icon: const Icon(Icons.close, color: Colors.grey),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            LinearProgressIndicator(
                              value: progress,
                              backgroundColor: Colors.grey[300],
                              color: Colors.blue[900],
                              minHeight: 6,
                              borderRadius: BorderRadius.circular(3),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '${_currentIndex + 1} / ${articles.length}',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                    ],
                  ),
                ),

                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    itemCount: articles.length,
                    onPageChanged: (index) {
                      setState(() {
                        _currentIndex = index;
                      });
                    },
                    itemBuilder: (context, index) {
                      return Center(
                        child: FlashcardWidget(
                          vocab: articles[index],
                          onSpeak: () => _speakWord(articles[index].word),
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _goToNextCard,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 3, 64, 156),
                            foregroundColor: Colors.black,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                            elevation: 0,
                          ),
                          child: const Text(
                            'Tiếp tục',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.white,
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
}
