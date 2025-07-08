import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:mobile/screens/vocabulary/flashcard_page.dart';

class Vocabulary extends StatefulWidget {
  const Vocabulary({super.key});

  @override
  State<Vocabulary> createState() => _VocabularyState();
}

class _VocabularyState extends State<Vocabulary> {
  final List<Map<String, dynamic>> allItems = [
    {
      'title': 'Economics',
      'subtitle': '1. Kinh tế học',
      'image':
          'https://vinuni.edu.vn/wp-content/uploads/2024/08/kinh-te-hoc-la-gi-kinh-te-hoc-nghien-cuu-nhung-gi-so-1.jpg',
      'highlight': false,
      'category': 'TOEIC BASIC',
    },
    {
      'title': 'Commerce P1',
      'subtitle': '1. Thương mại',
      'image': '',
      'highlight': false,
      'category': 'TOEIC ADVANCED',
    },
    {
      'title': 'Commerce P2',
      'subtitle': '2. Thương mại',
      'image': '',
      'highlight': false,
      'category': 'TOEIC ADVANCED',
    },
    {
      'title': 'Business Planning P1',
      'subtitle': '4. Kế hoạch kinh doanh',
      'image': '',
      'highlight': false,
      'category': 'TOEIC BASIC',
    },
    {
      'title': 'Hoc an hoc noi hoc goi',
      'subtitle': '1. Hoc cu xu',
      'image': '',
      'highlight': false,
      'category': 'IELTS BASIC',
    },
    {
      'title': 'Qua kho bo qua',
      'subtitle': '1. Hoc cach chap nhan',
      'image': '',
      'highlight': false,
      'category': 'IELTS ADVANCED',
    },
  ];

  late List<String> categories;
  String selectedCategory = 'TOEIC BASIC';

  @override
  void initState() {
    super.initState();
    categories = allItems.map((e) => e['category'] as String).toSet().toList();
    selectedCategory = categories.first;
  }

  void toggleHighlight(int index) {
    setState(() {
      final filteredItems = getFilteredItems();
      for (var item in filteredItems) {
        item['highlight'] = false;
      }
      filteredItems[index]['highlight'] = true;
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => FlashcardPage()),
      );
    });
  }

  List<Map<String, dynamic>> getFilteredItems() {
    return allItems
        .where((item) => item['category'] == selectedCategory)
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final filteredItems = getFilteredItems();

    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: SizedBox(
            width: 200,
            child: DropdownButtonHideUnderline(
              child: DropdownButton2<String>(
                isExpanded: true,
                value: selectedCategory,
                dropdownStyleData: const DropdownStyleData(maxHeight: 200),
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      selectedCategory = value;
                    });
                  }
                },
                items:
                    categories
                        .map(
                          (category) => DropdownMenuItem<String>(
                            value: category,
                            child: Text(
                              category,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        )
                        .toList(),
              ),
            ),
          ),
        ),
        centerTitle: true,
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(height: 1, thickness: 1, color: Colors.grey),
        ),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: filteredItems.length,
        separatorBuilder: (_, __) => const SizedBox(height: 16),
        itemBuilder: (context, index) {
          final item = filteredItems[index];
          final isHighlight = item['highlight'] == true;
          final imageUrl = item['image'] ?? '';
          return GestureDetector(
            onTap: () => toggleHighlight(index),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color:
                    isHighlight
                        ? const Color(0xFF251C91)
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
                    backgroundImage:
                        imageUrl.isNotEmpty ? NetworkImage(imageUrl) : null,
                    backgroundColor:
                        imageUrl.isEmpty ? Colors.grey.shade300 : null,
                    child:
                        imageUrl.isEmpty
                            ? const Icon(Icons.image_not_supported)
                            : null,
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item['title']!,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            color: isHighlight ? Colors.white : Colors.black,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          item['subtitle']!,
                          style: TextStyle(
                            fontSize: 14,
                            color:
                                isHighlight ? Colors.white70 : Colors.black87,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
