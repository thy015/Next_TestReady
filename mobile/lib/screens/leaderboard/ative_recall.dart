import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/core/api_constants.dart';
import 'package:mobile/screens/vocabulary/flashcard_page.dart';

class WordChartScreen extends StatefulWidget {
  final String token;
  const WordChartScreen({super.key, required this.token});

  @override
  State<WordChartScreen> createState() => _WordChartScreenState();
}

class _WordChartScreenState extends State<WordChartScreen> {
  late Future<Map<String, int>> _wordStateFuture;

  @override
  void initState() {
    super.initState();
    _wordStateFuture = fetchAndCountWordStates(widget.token);
  }

  Future<Map<String, int>> fetchAndCountWordStates(String token) async {
    final response = await http.get(
      Uri.parse('${ApiConstants.baseUrl}/word-user'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as List<dynamic>;
      final List<String> states =
          data.map((item) => item['state'] as String).toList();
      final Map<String, int> counts = {'Đã học': 0, 'Đã nhớ': 0, 'Đã thuộc': 0};
      for (var state in states) {
        if (counts.containsKey(state)) {
          counts[state] = counts[state]! + 1;
        }
      }
      return counts;
    } else {
      throw Exception('Lỗi lấy dữ liệu từ API: ${response.statusCode}');
    }
  }

  Widget buildBarChart(Map<String, int> stateCounts) {
    final items = ['Đã học', 'Đã nhớ', 'Đã thuộc'];
    final colors = [
      Colors.red.shade400,
      Colors.amber.shade400,
      Colors.lightBlue.shade400,
    ];

    double maxYValue =
        (stateCounts.values.isEmpty
                ? 1
                : stateCounts.values.reduce((a, b) => a > b ? a : b))
            .toDouble();
    if (maxYValue == 0) maxYValue = 1;
    maxYValue += 2;

    return BarChart(
      BarChartData(
        maxY: maxYValue,
        minY: 0,
        barGroups: List.generate(items.length, (index) {
          final value = stateCounts[items[index]] ?? 0;
          return BarChartGroupData(
            x: index,
            barRods: [
              BarChartRodData(
                toY: value.toDouble(),
                width: 22,
                color: colors[index],
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(6),
                  topRight: Radius.circular(6),
                ),
              ),
            ],
          );
        }),
        titlesData: FlTitlesData(
          show: true,
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                final text = (value.toInt() + 1).toString();
                return SideTitleWidget(
                  meta: meta,
                  space: 8.0,
                  child: Text(
                    text,
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                );
              },
            ),
          ),
          leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        ),
        borderData: FlBorderData(
          show: true,
          border: Border(
            bottom: BorderSide(color: Colors.grey.shade400, width: 2),
          ),
        ),
        gridData: FlGridData(show: false),
        barTouchData: BarTouchData(
          enabled: true,
          touchTooltipData: BarTouchTooltipData(
            tooltipPadding: const EdgeInsets.all(8),
            tooltipMargin: 8,
            getTooltipItem: (group, groupIndex, rod, rodIndex) {
              String category = items[group.x.toInt()];
              return BarTooltipItem(
                '${rod.toY.toInt()} từ',
                const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
                children: <TextSpan>[
                  TextSpan(
                    text: '\n($category)',
                    style: const TextStyle(
                      color: Colors.yellow,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          "Thống kê từ vựng",
          style: TextStyle(color: Colors.black87, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        iconTheme: const IconThemeData(color: Colors.black54),
      ),
      body: FutureBuilder<Map<String, int>>(
        future: _wordStateFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      color: Colors.red,
                      size: 60,
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Không thể tải dữ liệu thống kê.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 16, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Lỗi: ${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _wordStateFuture = fetchAndCountWordStates(
                            widget.token,
                          );
                        });
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue.shade600,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: const Text('Thử lại'),
                    ),
                  ],
                ),
              ),
            );
          }
          final counts = snapshot.data!;
          final wordsToReview =
              (counts['Đã nhớ'] ?? 0) + (counts['Đã học'] ?? 0);

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 30),
                SizedBox(height: 250, child: buildBarChart(counts)),
                const SizedBox(height: 30),
                Text(
                  'Chuẩn bị ôn tập: $wordsToReview từ',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.black87,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => FlashcardPage()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 76, 175, 80),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 40,
                      vertical: 15,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    elevation: 5,
                  ),
                  child: const Text(
                    "Ôn từ vựng",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
