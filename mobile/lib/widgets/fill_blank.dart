import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/models/word_model.dart';
import 'package:mobile/providers/course_provider.dart';
import 'package:pin_code_fields/pin_code_fields.dart';

class FillInTheBlank extends ConsumerStatefulWidget {
  final WordModel word;
  const FillInTheBlank({Key? key, required this.word}) : super(key: key);

  @override
  ConsumerState<FillInTheBlank> createState() => _FillInTheBlankState();
}

class _FillInTheBlankState extends ConsumerState<FillInTheBlank> {
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
                  'Điền từ với nghĩa như sau',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const SizedBox(height: 24),
                Text(
                  widget.word.vieDef,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),
                PinCodeTextField(
                  controller: _controller,
                  length: widget.word.word.length,
                  obscureText: false,
                  animationType: AnimationType.fade,
                  cursorColor: Colors.black,
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
  void didUpdateWidget(covariant FillInTheBlank oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.word.id != widget.word.id) {
      _controller.text = '';
    }
  }
}
