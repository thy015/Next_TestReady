import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/core/api_constants.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'payment_method.dart';

class Plan {
  final int id;
  final String duration;
  final int price;
  final int discount;
  final String label;
  final int months;

  Plan({
    required this.id,
    required this.duration,
    required this.price,
    required this.discount,
    required this.label,
    required this.months,
  });

  int get pricePerMonth => (price - discount) ~/ (months == 0 ? 1 : months);
}

class SpecialPlansScreen extends ConsumerStatefulWidget {
  @override
  ConsumerState<SpecialPlansScreen> createState() => _SpecialPlansScreenState();
}

class _SpecialPlansScreenState extends ConsumerState<SpecialPlansScreen> {
  int selectedPlanIndex = 0;
  bool isLoading = true;
  int? remainingDays;

  final List<Plan> plans = [
    Plan(
      id: 1,
      duration: '3 Tháng',
      price: 99000,
      discount: 0,
      label: 'Gói sơ cấp',
      months: 3,
    ),
    Plan(
      id: 2,
      duration: '1 Năm',
      price: 259000,
      discount: 0,
      label: 'Gói trung cấp',
      months: 12,
    ),
    Plan(
      id: 3,
      duration: '3 Năm',
      price: 599000,
      discount: 0,
      label: 'Gói cao cấp',
      months: 36,
    ),
    Plan(
      id: 4,
      duration: 'Trọn Đời',
      price: 1499000,
      discount: 0,
      label: 'Bao học',
      months: 100,
    ),
  ];

  @override
  void initState() {
    super.initState();
    Future.microtask(() => checkUserPackage());
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

  void navigateToPaymentMethod() async {
    final selectedPlan = plans[selectedPlanIndex];
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PaymentMethodScreen(selectedPlan: selectedPlan),
      ),
    );

    if (result == true) {
      setState(() {
        isLoading = true;
      });
      await checkUserPackage();
    }
  }

  String formatCurrency(int amount) {
    final formatter = NumberFormat.currency(locale: 'vi_VN', symbol: '₫');
    return formatter.format(amount);
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (remainingDays != null) {
      return ActivePackageScreen(remainingDays: remainingDays!);
    }

    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.grey[50],
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: const Text(
            'Goo Plus Plans',
            style: TextStyle(
              color: Colors.black,
              fontSize: 20,
              fontWeight: FontWeight.w600,
            ),
          ),
          centerTitle: true,
          foregroundColor: Colors.black,
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Expanded(
                child: ListView.separated(
                  itemCount: plans.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 16),
                  itemBuilder: (context, index) {
                    final plan = plans[index];
                    final isSelected = index == selectedPlanIndex;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedPlanIndex = index;
                        });
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color:
                              isSelected
                                  ? const Color(0xFF4285F4).withOpacity(0.1)
                                  : Colors.white,
                          border: Border.all(
                            color:
                                isSelected
                                    ? const Color(0xFF4285F4)
                                    : Colors.grey[300]!,
                            width: isSelected ? 2 : 1,
                          ),
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color:
                                  isSelected
                                      ? const Color(0xFF4285F4).withOpacity(0.1)
                                      : Colors.black.withOpacity(0.05),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        padding: const EdgeInsets.all(20),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    plan.duration,
                                    style: const TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    plan.label,
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text(
                                  formatCurrency(plan.price - plan.discount),
                                  style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                    color:
                                        plan.discount > 0
                                            ? const Color(0xFF4285F4)
                                            : Colors.black,
                                  ),
                                ),
                                if (plan.months > 1 && plan.id != 4)
                                  Text(
                                    '${formatCurrency(plan.pricePerMonth)} / tháng',
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: Colors.grey[600],
                                    ),
                                  ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blue.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.blue.withOpacity(0.1)),
                ),
                child: Row(
                  children: [
                    const Icon(
                      Icons.info_outline,
                      color: Color(0xFF4285F4),
                      size: 20,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Gói trả phí của Goo sẽ cho bạn quyền truy cập tới một số khóa học cao cấp hơn',
                        style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: navigateToPaymentMethod,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF251C91),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  minimumSize: const Size(double.infinity, 56),
                  elevation: 0,
                ),
                child: const Text(
                  'Tiếp theo',
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}

class ActivePackageScreen extends StatelessWidget {
  final int remainingDays;

  const ActivePackageScreen({super.key, required this.remainingDays});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FF),
      appBar: AppBar(
        title: const Text('Gói của bạn'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        foregroundColor: Colors.black,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  blurRadius: 10,
                  color: Colors.blue.withOpacity(0.1),
                  offset: const Offset(0, 5),
                ),
              ],
            ),
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.verified, size: 60, color: Colors.blue),
                const SizedBox(height: 16),
                const Text(
                  'Gói Premium đang hoạt động!',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Còn $remainingDays ngày sử dụng',
                  style: TextStyle(fontSize: 16, color: Colors.grey[700]),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
