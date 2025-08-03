import 'package:flutter/material.dart';

class FillInTheBlank extends StatefulWidget {
  final String definition;
  final int wordLength;

  const FillInTheBlank({
    Key? key,
    required this.definition,
    required this.wordLength,
  }) : super(key: key);

  @override
  State<FillInTheBlank> createState() => _FillInTheBlankState();
}

class _FillInTheBlankState extends State<FillInTheBlank> {
  final TextEditingController _controller = TextEditingController();
  int currentPosition = 0;

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      final text = _controller.text;
      setState(() {
        currentPosition = text.length;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final input = _controller.text;

    return GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(FocusNode());
      },
      child: Container(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Điền từ',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
                fontWeight: FontWeight.w400,
              ),
            ),

            const SizedBox(height: 24),

            Text(
              widget.definition,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                color: Colors.black,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 32),

            Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 20,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.grey[50],
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.grey[300]!),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(widget.wordLength, (index) {
                      final isCurrent = index == currentPosition;
                      final letter = index < input.length ? input[index] : '';

                      return Container(
                        margin: const EdgeInsets.symmetric(horizontal: 8),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              letter,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w500,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Container(
                              width: 24,
                              height: 2,
                              color:
                                  isCurrent
                                      ? Color.fromARGB(255, 1, 60, 142)
                                      : Colors.grey[400],
                            ),
                            const SizedBox(height: 4),
                            if (isCurrent)
                              CustomPaint(
                                size: const Size(0, 0),
                                painter: TrianglePainter(),
                              )
                            else
                              const SizedBox(height: 12),
                          ],
                        ),
                      );
                    }),
                  ),
                ),

                Positioned.fill(
                  child: Opacity(
                    opacity: 0,
                    child: TextField(
                      autofocus: true,
                      controller: _controller,
                      maxLength: widget.wordLength,
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.text,
                      style: const TextStyle(color: Colors.transparent),
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        counterText: '',
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class TrianglePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint =
        Paint()
          ..color = const Color.fromARGB(255, 1, 60, 142)
          ..style = PaintingStyle.fill;

    final path = Path();
    path.moveTo(0, 0);
    path.lineTo(-6, 12);
    path.lineTo(6, 12);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
