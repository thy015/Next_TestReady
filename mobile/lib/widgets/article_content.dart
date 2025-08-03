import 'package:flutter/material.dart';
import 'package:mobile/data/models/newspaper_model.dart';
import 'package:selectable/selectable.dart';
import 'package:intl/intl.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:audioplayers/audioplayers.dart';

class ArticleContent extends StatelessWidget {
  final NewsArticle article;

  const ArticleContent({Key? key, required this.article}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final formattedDate = DateFormat(
      'EEEE, dd/MM/yyyy',
    ).format(article.createdAt);

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ArticleTitle(title: article.title),
          const SizedBox(height: 12),
          ArticleMetadata(date: formattedDate, author: article.author),
          const SizedBox(height: 20),
          SelectableArticleText(content: article.content),
        ],
      ),
    );
  }
}

class ArticleTitle extends StatelessWidget {
  final String title;

  const ArticleTitle({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Color(0xFF2196F3),
        height: 1.3,
      ),
    );
  }
}

class ArticleMetadata extends StatelessWidget {
  final String date;
  final String author;

  const ArticleMetadata({Key? key, required this.date, required this.author})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          date,
          style: const TextStyle(
            fontSize: 14,
            color: Color(0xFF2196F3),
            fontWeight: FontWeight.w500,
          ),
        ),
        Row(
          children: [
            const Text(
              'Tác giả: ',
              style: TextStyle(
                fontSize: 14,
                color: Colors.green,
                fontWeight: FontWeight.w500,
              ),
            ),
            Text(
              author,
              style: const TextStyle(
                fontSize: 14,
                color: Colors.black,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class SelectableArticleText extends StatelessWidget {
  final String content;

  const SelectableArticleText({Key? key, required this.content})
    : super(key: key);

  Future<void> getTranslation(BuildContext context, String word) async {
    final uri = Uri.parse(
      'https://api.dictionaryapi.dev/api/v2/entries/en/$word',
    );
    final scaffold = ScaffoldMessenger.of(context);

    try {
      final response = await http.get(uri);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data is List && data.isNotEmpty) {
          final item = data.first;
          final phonetic = item['phonetic'] ?? '';
          final meanings = item['meanings'] as List<dynamic>;
          final partOfSpeech =
              meanings.isNotEmpty ? meanings[0]['partOfSpeech'] ?? '' : '';
          final definitions = meanings[0]['definitions'] as List<dynamic>;
          final definition =
              definitions.isNotEmpty ? definitions[0]['definition'] ?? '' : '';
          final example =
              definitions.isNotEmpty ? definitions[0]['example'] ?? '' : '';
          final audioUrl =
              (item['phonetics'] as List<dynamic>).firstWhere(
                (p) => (p['audio'] ?? '').toString().isNotEmpty,
                orElse: () => {},
              )['audio'] ??
              '';
          showDialog<void>(
            context: context,
            builder:
                (context) => AlertDialog(
                  content: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Row(
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          Text(
                            '$word',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(width: 8),
                          if (partOfSpeech.isNotEmpty)
                            Text(
                              '($partOfSpeech)',
                              style: const TextStyle(
                                fontSize: 16,
                                color: Colors.grey,
                              ),
                            ),
                          const SizedBox(width: 8),
                          if (audioUrl.isNotEmpty)
                            IconButton(
                              icon: const Icon(
                                Icons.volume_up,
                                color: Colors.blue,
                              ),
                              tooltip: 'Nghe phát âm',
                              onPressed: () => _playAudio(audioUrl),
                            ),
                        ],
                      ),
                      if (phonetic.isNotEmpty)
                        Text(
                          ' [$phonetic]',
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.grey,
                          ),
                        ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 2),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              constraints: BoxConstraints(
                                maxWidth:
                                    MediaQuery.of(context).size.width * 0.4,
                              ),
                              child:
                                  partOfSpeech.isNotEmpty
                                      ? Text(
                                        'Nghĩa: ',
                                        textAlign: TextAlign.left,
                                        style: const TextStyle(
                                          fontSize: 16,
                                          color: Color.fromARGB(
                                            255,
                                            223,
                                            21,
                                            21,
                                          ),
                                        ),
                                      )
                                      : const SizedBox.shrink(),
                            ),
                            const SizedBox(width: 8),
                            if (definition.isNotEmpty)
                              Expanded(
                                child: Text(
                                  definition,
                                  textAlign: TextAlign.left,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    color: Colors.black87,
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 2),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              constraints: BoxConstraints(
                                maxWidth:
                                    MediaQuery.of(context).size.width * 0.4,
                              ),
                              child:
                                  example.isNotEmpty
                                      ? Text(
                                        'Ví dụ: ',
                                        textAlign: TextAlign.left,
                                        style: const TextStyle(
                                          fontSize: 16,
                                          color: Color.fromARGB(
                                            255,
                                            0,
                                            159,
                                            56,
                                          ),
                                        ),
                                      )
                                      : const SizedBox.shrink(),
                            ),
                            const SizedBox(width: 8),
                            if (example.isNotEmpty)
                              Expanded(
                                child: Text(
                                  example,
                                  textAlign: TextAlign.left,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    color: Colors.black87,
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
          );
        }
      } else {
        scaffold.showSnackBar(
          const SnackBar(content: Text("Không tìm thấy nghĩa từ")),
        );
      }
    } catch (e) {
      scaffold.showSnackBar(SnackBar(content: Text("Lỗi: $e")));
    }
  }

  void _playAudio(String url) {
    final player = AudioPlayer();
    player.play(UrlSource(url));
  }

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxHeight: 300),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Selectable(
              popupMenuItems: [
                SelectableMenuItem(
                  title: 'Dịch',
                  isEnabled: (controller) => controller!.isTextSelected,
                  handler: (controller) {
                    final selectedText = controller!.getSelection()!.text!;
                    getTranslation(context, selectedText.trim().toLowerCase());
                    return true;
                  },
                ),
              ],
              selectWordOnDoubleTap: true,
              child: Text(
                content,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.black87,
                  height: 1.6,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
