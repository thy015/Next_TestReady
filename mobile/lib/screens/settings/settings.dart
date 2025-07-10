import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class Settings extends StatelessWidget {
  const Settings({super.key});

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
  ];

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
                  const Expanded(
                    child: Text(
                      'Bé Phúc chubby',
                      style: TextStyle(
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
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: const Align(
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
                      onTap: () {
                        // TODO: handle tap
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
