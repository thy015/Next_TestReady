import 'package:flutter/material.dart';
import 'package:mobile/data/models/word_model.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';
import 'package:audioplayers/audioplayers.dart';

void showFlashcardPopup(
  BuildContext context,
  word,
  isCorrect,
  VoidCallback onContinue,
  VoidCallback onSpeak,
) {
  showCupertinoModalBottomSheet(
    context: context,
    expand: false,
    backgroundColor: Colors.transparent,
    builder:
        (context) => FlashcardPopupContent(
          word: word,
          isCorrect: isCorrect,
          onContinue: onContinue,
          onSpeak: onSpeak,
        ),
  );
}

class FlashcardPopupContent extends StatefulWidget {
  final VoidCallback onContinue;
  final WordModel word;
  final bool isCorrect;
  final VoidCallback? onSpeak;

  const FlashcardPopupContent({
    Key? key,
    required this.word,
    required this.isCorrect,
    required this.onContinue,
    required this.onSpeak,
  }) : super(key: key);

  @override
  State<FlashcardPopupContent> createState() => _FlashcardPopupContentState();
}

class _FlashcardPopupContentState extends State<FlashcardPopupContent> {
  final AudioPlayer _audioPlayer = AudioPlayer();

  @override
  void initState() {
    super.initState();
    _playSound();
  }

  Future<void> _playSound() async {
    try {
      final soundPath =
          widget.isCorrect
              ? 'lib/assets/sounds/correct.mp3'
              : 'lib/assets/sounds/fail.mp3';

      await _audioPlayer.play(AssetSource(soundPath));
    } catch (e) {
      print('Lỗi khi phát âm thanh: $e');
    }
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              color:
                  widget.isCorrect
                      ? const Color.fromARGB(255, 19, 157, 28)
                      : const Color.fromARGB(255, 203, 31, 31),
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(32),
              ),
            ),
            padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      widget.word.word,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 12),
                    GestureDetector(
                      onTap: widget.onSpeak,
                      child: const Icon(
                        Icons.volume_up,
                        color: Colors.white,
                        size: 28,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  widget.word.phonetic,
                  style: const TextStyle(color: Colors.white70, fontSize: 16),
                ),
                const SizedBox(height: 8),
                Text(
                  widget.word.vieDef,
                  style: const TextStyle(color: Colors.white, fontSize: 16),
                ),
                const SizedBox(height: 16),
                Text(
                  widget.word.examples[0],
                  style: const TextStyle(color: Colors.white, fontSize: 15),
                ),
                const SizedBox(height: 32),
                Center(
                  child: SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                        widget.onContinue();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
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
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            top: 25,
            right: 24,
            child: Icon(
              widget.isCorrect ? Icons.check_circle : Icons.highlight_off,
              color: Colors.white,
              size: 32,
            ),
          ),
        ],
      ),
    );
  }
}
