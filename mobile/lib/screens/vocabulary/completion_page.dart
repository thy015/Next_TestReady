import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class CompletionPage extends StatelessWidget {
  final int wordsAdded;

  const CompletionPage({super.key, required this.wordsAdded});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [
                              Colors.amber.shade300,
                              Colors.amber.shade700,
                            ],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.amber.withOpacity(0.5),
                              spreadRadius: 5,
                              blurRadius: 10,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                      ),
                      Lottie.asset(
                        'lib/assets/animations/book.json',
                        width: 140,
                        height: 140,
                        fit: BoxFit.contain,
                      ),
                      Positioned(
                        top: 20,
                        left: 20,
                        child: Icon(Icons.star, color: Colors.white, size: 24),
                      ),
                      Positioned(
                        right: 20,
                        child: Icon(Icons.star, color: Colors.white, size: 20),
                      ),
                      Positioned(
                        top: 50,
                        right: 10,
                        child: Icon(Icons.star, color: Colors.white, size: 18),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'Bạn vừa nạp thêm $wordsAdded từ',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context, true);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 6, 0, 113),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 40),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                  ),
                  child: const Text(
                    "Học từ mới",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
