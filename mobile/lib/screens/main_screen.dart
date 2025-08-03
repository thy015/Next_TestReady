import 'package:flutter/material.dart';
import 'package:animated_bottom_navigation_bar/animated_bottom_navigation_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../screens/leaderboard/ative_recall.dart' as wordchart;
import 'newspaper/newspaper.dart' as newspaper;
import 'settings/settings.dart' as settings;
import 'vocabulary/course.dart' as vocabulary;
import 'premium/premium.dart' as premium;

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  String? token;
  List<Widget>? _pages;

  final List<IconData> iconList = [
    Icons.newspaper,
    Icons.leaderboard,
    Icons.diamond,
    Icons.settings,
  ];

  final List<String> labelList = ['Đọc báo', 'Ôn tập', 'Nâng cấp', 'Cài đặt'];

  @override
  void initState() {
    super.initState();
    loadTokenAndInitPages();
  }

  Future<void> loadTokenAndInitPages() async {
    final prefs = await SharedPreferences.getInstance();
    final storedToken = prefs.getString('token');

    setState(() {
      token = storedToken;

      _pages = [
        newspaper.Newspaper(),
        wordchart.WordChartScreen(token: token!),
        premium.SpecialPlansScreen(),
        settings.Settings(),
        vocabulary.Vocabulary(),
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_pages == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      backgroundColor: Colors.white,
      body: _pages![_currentIndex],
      floatingActionButton: Container(
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: FloatingActionButton(
          backgroundColor:
              _currentIndex == 4 ? const Color(0xFF251C91) : Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(32),
          ),
          child: Icon(
            Icons.book,
            color: _currentIndex == 4 ? Colors.white : const Color(0xFF251C91),
          ),
          onPressed: () => setState(() => _currentIndex = 4),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              spreadRadius: 2,
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: AnimatedBottomNavigationBar.builder(
          itemCount: iconList.length,
          tabBuilder: (int index, bool isActive) {
            final color = isActive ? Colors.white : const Color(0xFF251C91);
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: isActive ? const Color(0xFF251C91) : Colors.transparent,
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
