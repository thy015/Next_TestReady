import 'package:flutter/material.dart';
import 'package:animated_bottom_navigation_bar/animated_bottom_navigation_bar.dart';
import 'screens/newspaper/newspaper.dart' as newspaper;
import 'screens/settings/settings.dart' as settings;
import 'screens/vocabulary/vocabulary.dart' as vocabulary;
import 'screens/premium/premium.dart' as premium;
import 'screens/leaderboard/leaderboard.dart' as leaderboard;
import 'screens/onboarding/onboarding_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  Future<bool> hasSeenOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('seenOnboarding') ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.light(),
      home: FutureBuilder<bool>(
        future: hasSeenOnboarding(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          }

          final seen = snapshot.data!;
          return seen ? const MainScreen() : const OnboardingScreen();
        },
      ),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<IconData> iconList = [
    Icons.newspaper,
    Icons.leaderboard,
    Icons.diamond,
    Icons.settings,
  ];
  final List<String> labelList = ['Đọc báo', 'Xếp hạng', 'Nâng cấp', 'Cài đặt'];
  final List<Widget> _pages = [
    newspaper.Newspaper(),
    leaderboard.Leaderboard(),
    premium.SpecialPlansScreen(),
    settings.Settings(),
    vocabulary.Vocabulary(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: _pages[_currentIndex],
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(32)),
        child: const Icon(Icons.book),
        foregroundColor: Color(0xFF251C91),
        onPressed:
            () => setState(() {
              _currentIndex = 4;
            }),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              spreadRadius: 2,
              blurRadius: 8,
              offset: Offset(0, -2),
            ),
          ],
        ),
        child: AnimatedBottomNavigationBar.builder(
          itemCount: iconList.length,
          tabBuilder: (int index, bool isActive) {
            final color = isActive ? Colors.white : Color(0xFF251C91);
            return Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: isActive ? Color(0xFF251C91) : Colors.transparent,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(iconList[index], color: color, size: 20),
                  const SizedBox(height: 2),
                  Text(
                    labelList[index],
                    style: TextStyle(color: color, fontSize: 10),
                  ),
                ],
              ),
            );
          },
          activeIndex: _currentIndex,
          gapLocation: GapLocation.center,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: Colors.white,
        ),
      ),
    );
  }
}
