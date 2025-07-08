import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:mobile/screens/login_signup/loginscreen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'onboarding_page.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _controller = PageController();
  int _currentIndex = 0;

  void _finishOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('seenOnboarding', true);
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const LoginScreen()),
    );
  }

  void _nextPage() {
    _controller.nextPage(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final isMiddlePage =
        _currentIndex > 0 && _currentIndex < onboardingPages.length - 1;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            if (isMiddlePage)
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: LinearProgressIndicator(
                  value: (_currentIndex + 1) / onboardingPages.length,
                  color: const Color(0xFF251C91),
                  backgroundColor: Colors.grey,
                  minHeight: 10,
                  borderRadius: BorderRadius.circular(5),
                ),
              ),
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: onboardingPages.length,
                onPageChanged: (index) => setState(() => _currentIndex = index),
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (context, index) {
                  final page = onboardingPages[index];
                  final isMiddlePage =
                      index > 0 && index < onboardingPages.length - 1;
                  final isLastPage = index == onboardingPages.length - 1;

                  return Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32.0,
                      vertical: 24.0,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        if (!isMiddlePage && page.title != null)
                          Text(
                            page.title!,
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        if (!isMiddlePage && page.title != null)
                          const SizedBox(height: 24),
                        if (!isMiddlePage && page.lottieAsset != null)
                          GestureDetector(
                            child: Lottie.asset(page.lottieAsset!, height: 250),
                            onTap: () {
                              if (onboardingPages[index] ==
                                  onboardingPages.last)
                                _finishOnboarding();
                              else
                                _nextPage();
                            },
                          ),
                        if (!isMiddlePage && page.lottieAsset != null)
                          const SizedBox(height: 32),
                        if (!isMiddlePage && page.description != null)
                          Text(
                            page.description!,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 18),
                          ),
                        if (!isMiddlePage && page.description != null)
                          const SizedBox(height: 32),
                        if (isMiddlePage && page.question != null)
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(24),
                            decoration: BoxDecoration(
                              color: const Color(0xFF251C91),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: const Color(0xFF251C91),
                              ),
                            ),
                            child: Text(
                              page.question!,
                              style: const TextStyle(
                                fontSize: 22,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        if (isMiddlePage) const SizedBox(height: 40),
                        if (isMiddlePage && page.options != null)
                          Expanded(
                            child: Center(
                              child: ListView.builder(
                                itemCount: page.options!.length,
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemBuilder: (context, optionIndex) {
                                  return Container(
                                    margin: const EdgeInsets.only(bottom: 20),
                                    width: double.infinity,
                                    child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.white,
                                        foregroundColor: Colors.black87,
                                        elevation: 3,
                                        padding: const EdgeInsets.symmetric(
                                          vertical: 20,
                                          horizontal: 16,
                                        ),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                            16,
                                          ),
                                          side: BorderSide(
                                            color: Colors.grey.shade300,
                                          ),
                                        ),
                                      ),
                                      onPressed: () {
                                        _nextPage();
                                      },
                                      child: Text(
                                        page.options![optionIndex],
                                        style: const TextStyle(fontSize: 18),
                                      ),
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
