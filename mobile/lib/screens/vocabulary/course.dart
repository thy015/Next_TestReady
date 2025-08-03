import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:mobile/screens/premium/premium.dart';
import 'package:mobile/screens/vocabulary/flashcard_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../data/models/topic_model.dart';
import '../../data/models/course_type.dart';
import '../../providers/course_provider.dart';
import 'package:mobile/core/api_constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Vocabulary extends ConsumerStatefulWidget {
  const Vocabulary({super.key});

  @override
  ConsumerState<Vocabulary> createState() => _VocabularyState();
}

class _VocabularyState extends ConsumerState<Vocabulary> {
  CourseType? selectedCategory;
  int? remainingDays;
  bool isLoading = true;
  bool _hasInitialized = false;
  Set<int> doneTopicIds = {};

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
  void initState() {
    super.initState();
    Future.microtask(() async {
      await checkUserPackage();
      await fetchDoneTopics();
    });
  }

  Future<void> fetchDoneTopics() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null || token.isEmpty) return;

    final url = Uri.parse('${ApiConstants.baseUrl}/topic-user');
    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );
      if (response.statusCode == 200) {
        final List data = json.decode(response.body);
        setState(() {
          doneTopicIds =
              data
                  .where((e) => e['isDone'] == true)
                  .map<int>((e) => e['topic']['id'] as int)
                  .toSet();
        });
      } else {
        print('Lỗi lấy danh sách topic-user: ${response.statusCode}');
      }
    } catch (e) {
      print('Lỗi khi gọi topic-user: $e');
    }
  }

  Future<void> checkUserPackage() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null || token.isEmpty) {
      setState(() {
        isLoading = false;
      });
      return;
    }
    final url = Uri.parse('${ApiConstants.baseUrl}/checkout/get-package');
    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['status'] == true) {
          setState(() {
            remainingDays = data['counterDay'];
          });
        }
      } else {
        print('Lỗi status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Lỗi khi kiểm tra package: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void _showPremiumUpgradeDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          backgroundColor: Colors.white,
          contentPadding: const EdgeInsets.all(24),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.workspace_premium,
                color: Color.fromARGB(255, 3, 67, 119),
                size: 60,
              ),
              const SizedBox(height: 20),
              const Text(
                'Nâng cấp Premium để học thêm chủ đề này!',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => SpecialPlansScreen(),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 3, 67, 119),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  minimumSize: const Size(double.infinity, 50),
                  elevation: 5,
                ),
                child: const Text(
                  'Nâng cấp ngay!',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: Text(
                  'Để sau',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[700],
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
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
                if (!_hasInitialized &&
                    selectedCategory == null &&
                    categories.isNotEmpty) {
                  selectedCategory = categories.first;
                  _hasInitialized = true;
                }
                return DropdownButtonHideUnderline(
                  child: DropdownButton2<CourseType>(
                    isExpanded: true,
                    value: selectedCategory,
                    dropdownStyleData: const DropdownStyleData(
                      maxHeight: 200,
                      decoration: BoxDecoration(color: Colors.white),
                    ),
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
                  (error, stack) => const Text(
                    'Lỗi tải khóa học',
                    style: TextStyle(color: Colors.red),
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
          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: filteredItems.length,
            separatorBuilder: (_, __) => const SizedBox(height: 16),
            itemBuilder: (context, index) {
              final topic = filteredItems[index];
              final hasPremium = (remainingDays ?? 0) > 0;
              final isDone = doneTopicIds.contains(topic.id);
              final isLocked = !hasPremium && topic.isFree == false;
              return GestureDetector(
                onTap:
                    isLocked
                        ? () => _showPremiumUpgradeDialog(context)
                        : () async {
                          ref.invalidate(stepListProvider);
                          ref.invalidate(wordsByTopicProvider(topic.id));
                          final result = await Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder:
                                  (context) => FlashcardPage(topicId: topic.id),
                            ),
                          );
                          if (result == true) {
                            await fetchDoneTopics();
                          }
                        },
                child: Opacity(
                  opacity: isLocked ? 0.6 : 1.0,
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color:
                          isDone
                              ? const Color.fromARGB(255, 3, 67, 119)
                              : const Color(0xFFF5F5F5),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          offset: const Offset(0, 8),
                          blurRadius: 12,
                          spreadRadius: 1,
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
                              topic.image.isEmpty ? Colors.grey : null,
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
                                  color: isDone ? Colors.white : Colors.black,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                topic.nameVN,
                                style: TextStyle(
                                  fontSize: 14,
                                  color:
                                      isDone ? Colors.white70 : Colors.black87,
                                ),
                              ),
                            ],
                          ),
                        ),
                        if (isLocked)
                          const Icon(
                            Icons.lock,
                            color: Color.fromARGB(255, 3, 67, 119),
                          ),
                        if (!isLocked && isDone)
                          const Icon(Icons.check_circle, color: Colors.white),
                      ],
                    ),
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
                  const Text(
                    'Lỗi dữ liệu',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
