import 'package:flutter/material.dart';
import 'package:flip_card/flip_card.dart';
import 'package:mobile/data/models/word_model.dart';

class FlashcardWidget extends StatelessWidget {
  final WordModel vocab;
  final VoidCallback? onSpeak;

  const FlashcardWidget({super.key, required this.vocab, this.onSpeak});

  @override
  Widget build(BuildContext context) {
    return FlipCard(
      direction: FlipDirection.HORIZONTAL,
      front: frontCard(),
      back: backCard(),
    );
  }

  Widget frontCard() {
    final v = vocab;
    return cardContainer(
      Column(
        children: [
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [iconButton(Icons.volume_up, onSpeak)],
          ),
          const SizedBox(height: 40),
          Text(
            v.word,
            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 30),
          Text(
            v.def,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.grey[700],
              height: 1.5,
            ),
          ),
          const Spacer(),
        ],
      ),
    );
  }

  Widget backCard() {
    final v = vocab;
    return cardContainer(
      Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            v.word,
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),
          Text(
            v.phonetic,
            style: TextStyle(
              fontSize: 18,
              fontStyle: FontStyle.italic,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 30),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.blue[50],
              borderRadius: BorderRadius.circular(15),
            ),
            child: Column(
              children: [
                Text(
                  'Nghĩa tiếng Việt:',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue[800],
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  v.vieDef,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 18, height: 1.4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Text(
            'Ví dụ: ${v.examples}',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              fontStyle: FontStyle.italic,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }

  Widget cardContainer(Widget child) {
    return Container(
      width: 300,
      height: 400,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: child,
    );
  }

  Widget iconButton(IconData icon, VoidCallback? onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: Colors.blue[50],
          borderRadius: BorderRadius.circular(25),
        ),
        child: Icon(icon, color: Colors.blue),
      ),
    );
  }
}
