import 'package:flutter/material.dart';
import 'package:mobile/data/models/word_model.dart';
import 'package:mobile/providers/course_provider.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Listening extends ConsumerStatefulWidget {
  final WordModel word;
  final VoidCallback onSpeak;

  const Listening({Key? key, required this.word, required this.onSpeak})
    : super(key: key);

  @override
  ConsumerState<Listening> createState() => _ListeningState();
}

class _ListeningState extends ConsumerState<Listening> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return SafeArea(
      child: AnimatedPadding(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
        padding: EdgeInsets.only(bottom: bottomInset),
        child: SingleChildScrollView(
          reverse: true,
          child: Container(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Điền từ mà bạn nghe được',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    GestureDetector(
                      onTap: widget.onSpeak,
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: Colors.blue[50],
                          borderRadius: BorderRadius.circular(25),
                        ),
                        child: const Icon(Icons.volume_up, color: Colors.blue),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 32),
                PinCodeTextField(
                  controller: _controller,
                  length: widget.word.word.length,
                  cursorColor: Colors.black,
                  obscureText: false,
                  animationType: AnimationType.fade,
                  textStyle: const TextStyle(
                    fontSize: 20,
                    color: Colors.black,
                    fontWeight: FontWeight.w500,
                  ),
                  pinTheme: PinTheme(
                    shape: PinCodeFieldShape.underline,
                    fieldHeight: 50,
                    fieldWidth: 30,
                    activeColor: const Color.fromARGB(255, 1, 60, 142),
                    selectedColor: const Color.fromARGB(255, 1, 60, 142),
                    inactiveColor: Colors.grey,
                  ),
                  animationDuration: const Duration(milliseconds: 300),
                  enableActiveFill: false,
                  keyboardType: TextInputType.text,
                  onChanged: (value) {
                    ref.read(word.notifier).state = value;
                    if (value.length == widget.word.word.length) {
                      ref.read(isRight.notifier).state = true;
                    } else {
                      ref.read(isRight.notifier).state = false;
                    }
                  },
                  appContext: context,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant Listening oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.word.id != widget.word.id) {
      _controller.text = '';
    }
  }
}
