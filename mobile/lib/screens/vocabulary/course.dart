import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:mobile/screens/vocabulary/flashcard_page.dart';
import '../../data/models/topic_model.dart';
import '../../data/models/course_type.dart';
import '../../providers/course_provider.dart';

class Vocabulary extends ConsumerStatefulWidget {
  const Vocabulary({super.key});

  @override
  ConsumerState<Vocabulary> createState() => _VocabularyState();
}

class _VocabularyState extends ConsumerState<Vocabulary> {
  CourseType? selectedCategory;
  int? highlightedTopicId;

  void toggleHighlight(int topicId) {
    setState(() {
      highlightedTopicId = topicId;
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => FlashcardPage(topicId: topicId),
        ),
      );
    });
  }

  List<TopicModel> getFilteredItems(List<TopicModel> topics) {
    if (selectedCategory == null) return topics;

    return topics
        .where((topic) => topic.courseType == selectedCategory)
        .toList();
  }

  List<CourseType> getAvailableCategories(List<TopicModel> topics) {
    return topics.map((topic) => topic.courseType).toSet().toList();
  }

  String getCategoryDisplayName(CourseType courseType) {
    switch (courseType) {
      case CourseType.toeic:
        return 'TOEIC CƠ BẢN';
      case CourseType.starters:
        return 'TOEIC NÂNG CAO';
      case CourseType.ielts:
        return 'IELTS CƠ BẢN';
      default:
        return courseType.name.toUpperCase();
    }
  }

  @override
  Widget build(BuildContext context) {
    final topicsAsync = ref.watch(topicsProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Center(
          child: SizedBox(
            width: 200,
            child: topicsAsync.when(
              data: (topics) {
                final categories = getAvailableCategories(topics);
                if (selectedCategory == null && categories.isNotEmpty) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    setState(() {
                      selectedCategory = categories.first;
                      highlightedTopicId =
                          topics
                              .where(
                                (topic) => topic.courseType == selectedCategory,
                              )
                              .first
                              .id;
                    });
                  });
                }

                return DropdownButtonHideUnderline(
                  child: DropdownButton2<CourseType>(
                    isExpanded: true,
                    value: selectedCategory,
                    dropdownStyleData: const DropdownStyleData(maxHeight: 200),
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          selectedCategory = value;
                          final matchTopic =
                              topics
                                  .where((topic) => topic.courseType == value)
                                  .toList();
                          highlightedTopicId =
                              matchTopic.isNotEmpty
                                  ? matchTopic.first.id
                                  : null;
                        });
                      }
                    },
                    items:
                        categories
                            .map(
                              (category) => DropdownMenuItem<CourseType>(
                                value: category,
                                child: Text(
                                  getCategoryDisplayName(category),
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
                );
              },
              loading: () => const Text(""),
              error:
                  (error, stack) => Text(
                    'Lỗi tải khóa học',
                    style: const TextStyle(color: Colors.red),
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
      body: topicsAsync.when(
        data: (topics) {
          final filteredItems = getFilteredItems(topics);

          if (filteredItems.isEmpty) {
            return const Center(
              child: Text(
                'Khóa học này k có topic',
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),
            );
          }

          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: filteredItems.length,
            separatorBuilder: (_, __) => const SizedBox(height: 16),
            itemBuilder: (context, index) {
              final topic = filteredItems[index];
              final isHighlight = highlightedTopicId == topic.id;

              return GestureDetector(
                onTap: () => toggleHighlight(topic.id),
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
                            topic.image.isNotEmpty
                                ? NetworkImage(topic.image)
                                : null,
                        backgroundColor:
                            topic.image.isEmpty
                                ? const Color.fromARGB(255, 255, 255, 255)
                                : null,
                        child:
                            topic.image.isEmpty
                                ? const Icon(Icons.image_not_supported)
                                : null,
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              topic.name,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                                color:
                                    isHighlight ? Colors.white : Colors.black,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              topic.nameVN,
                              style: TextStyle(
                                fontSize: 14,
                                color:
                                    isHighlight
                                        ? Colors.white70
                                        : Colors.black87,
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
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error:
            (error, stack) => Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.error_outline, color: Colors.red, size: 60),
                  const SizedBox(height: 16),
                  Text(
                    'Lỗi dữ liệu',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    error.toString(),
                    style: const TextStyle(color: Colors.grey),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      ref.invalidate(topicsProvider);
                    },
                    child: const Text('Thử lại'),
                  ),
                ],
              ),
            ),
      ),
    );
  }
}
