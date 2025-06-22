import 'package:flutter/material.dart';

class Vocabulary extends StatelessWidget {
  const Vocabulary({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, String>> items = [
      {
        'title': 'Economics',
        'subtitle': '1.Kinh tế học',
        'image':
            'https://vinuni.edu.vn/wp-content/uploads/2024/08/kinh-te-hoc-la-gi-kinh-te-hoc-nghien-cuu-nhung-gi-so-1.jpg',
        'highlight': 'true',
      },
      {'title': 'Commerce P1', 'subtitle': '2.Thương mại', 'image': ''},
      {'title': 'Commerce P2', 'subtitle': '3.Thương mại', 'image': ''},
      {
        'title': 'Business Planning P1',
        'subtitle': '4.Kế hoạch kinh doanh',
        'image': '',
      },
    ];
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'BASIC TOEIC',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(height: 1, thickness: 1, color: Colors.grey),
        ),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: items.length,
        separatorBuilder: (_, __) => const SizedBox(height: 16),
        itemBuilder: (context, index) {
          final item = items[index];
          final isHighlight = item['highlight'] == 'true';

          return Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color:
                  isHighlight
                      ? Color(0xFF251C91)
                      : const Color.fromARGB(255, 210, 209, 209),
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  offset: const Offset(0, 4),
                  blurRadius: 4,
                ),
              ],
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 32,
                  backgroundImage: NetworkImage(item['image']!),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item['title']!,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item['subtitle']!,
                        style: const TextStyle(
                          fontSize: 14,
                          color: Colors.black87,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
