import 'dart:convert';
import '../../screens/login_signup/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Settings extends StatefulWidget {
  const Settings({super.key});

  @override
  State<Settings> createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  String username = 'User';

  final List<Map<String, dynamic>> data = const [
    {
      'id': '1',
      'icon': Ionicons.sync_circle_outline,
      'title': 'Chế độ tối',
      'color': Colors.grey,
    },
    {
      'id': '2',
      'icon': Ionicons.language_outline,
      'title': 'Đổi ngôn ngữ',
      'color': Colors.green,
    },
    {
      'id': '3',
      'icon': Ionicons.school_outline,
      'title': 'Hẹn giờ nha ku kem',
      'color': Colors.orange,
    },
    {
      'id': '4',
      'icon': Ionicons.flag_outline,
      'title': 'Đặt mục tiêu',
      'color': Colors.cyan,
    },
    {
      'id': '5',
      'icon': Ionicons.log_out_outline,
      'title': 'Đăng xuất',
      'color': Colors.red,
    },
  ];

  @override
  void initState() {
    super.initState();
    loadUserName();
  }

  Future<void> loadUserName() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');

    if (userJson != null) {
      final userData = jsonDecode(userJson);
      setState(() {
        username = userData['fullname'] ?? 'User';
      });
    }
  }

  Future<void> logout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');

    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (Route<dynamic> route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.grey[100],
        body: Column(
          children: [
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black12,
                    blurRadius: 6,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  const Icon(
                    Ionicons.person_circle_outline,
                    size: 40,
                    color: Colors.grey,
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      username,
                      style: const TextStyle(
                        color: Colors.blue,
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  const Icon(
                    Ionicons.chevron_forward,
                    size: 24,
                    color: Colors.grey,
                  ),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Cài đặt',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: data.length,
                itemBuilder: (context, index) {
                  final item = data[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: const [
                        BoxShadow(
                          color: Colors.black12,
                          blurRadius: 6,
                          offset: Offset(0, 2),
                        ),
                      ],
                    ),
                    child: ListTile(
                      leading: Icon(
                        item['icon'],
                        color: item['color'],
                        size: 30,
                      ),
                      title: Text(
                        item['title'],
                        style: const TextStyle(fontSize: 16),
                      ),
                      trailing: const Icon(
                        Ionicons.chevron_forward,
                        color: Colors.grey,
                      ),
                      onTap: () async {
                        if (item['id'] == '5') {
                          logout(context);
                        }
                      },
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
