import 'package:flutter/material.dart';

class SpecialPlansScreen extends StatefulWidget {
  @override
  _SpecialPlansScreenState createState() => _SpecialPlansScreenState();
}

class _SpecialPlansScreenState extends State<SpecialPlansScreen> {
  int selectedPlan = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Goo Plus Plans',
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(
              child: ListView(
                children: [
                  SizedBox(height: 20),
                  _buildPlanCard(
                    index: 0,
                    isPopular: true,
                    duration: '3 Tháng',
                    price: '99,000 VND',
                    monthlyPrice: '33,000 VND / Tháng',
                    discount: '15%',
                    discountLabel: 'Gói sơ cấp',
                  ),
                  SizedBox(height: 16),
                  _buildPlanCard(
                    index: 1,
                    duration: '1 Năm',
                    price: '259,000 VND',
                    monthlyPrice: '25,000 VND / Tháng',
                    discount: '20%',
                    discountLabel: 'Gói trung cấp',
                  ),
                  SizedBox(height: 16),
                  _buildPlanCard(
                    index: 2,
                    duration: '3 Năm',
                    price: '739,000 VND',
                    monthlyPrice: '20,000 VND / Tháng',
                    discount: '25%',
                    discountLabel: 'Gói cao cấp',
                  ),
                  SizedBox(height: 16),
                  _buildPlanCard(
                    index: 3,
                    duration: 'Trọn Đời',
                    price: '1,499,000 VND',
                    monthlyPrice: '',
                    discount: '99%',
                    discountLabel: 'Bỏ đi',
                    isLifetime: true,
                  ),
                  SizedBox(height: 30),
                  _buildBenefits(),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              height: 56,
              margin: EdgeInsets.only(bottom: 20),
              child: ElevatedButton(
                onPressed: () {
                  print('Selected plan: $selectedPlan');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF4285F4),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Text(
                  'Tiếp theo',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanCard({
    required int index,
    bool isPopular = false,
    required String duration,
    required String price,
    required String monthlyPrice,
    required String discount,
    required String discountLabel,
    bool isLifetime = false,
  }) {
    bool isSelected = selectedPlan == index;

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedPlan = index;
        });
      },
      child: Container(
        decoration: BoxDecoration(
          color: isSelected ? Color(0xFF4285F4).withOpacity(0.1) : Colors.white,
          border: Border.all(
            color: isSelected ? Color(0xFF4285F4) : Colors.grey[300]!,
            width: isSelected ? 2 : 1,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Stack(
          children: [
            Padding(
              padding: EdgeInsets.all(20),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          duration,
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(height: 4),
                        Row(
                          children: [
                            Text(
                              discountLabel,
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey[600],
                              ),
                            ),
                            SizedBox(width: 8),
                            Text(
                              '$discount',
                              style: TextStyle(
                                fontSize: 14,
                                color: Color(0xFF4285F4),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        price,
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      if (monthlyPrice.isNotEmpty)
                        Text(
                          monthlyPrice,
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
            if (isPopular)
              Positioned(
                top: 0,
                left: 0,
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: Color(0xFF4285F4),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(16),
                      bottomRight: Radius.circular(16),
                    ),
                  ),
                  child: Text(
                    'Phổ biến',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildBenefits() {
    return Column(
      children: [
        _buildBenefitItem(
          'Gói trả phí của Goo sẽ cho bạn quyền truy cập tới một số khóa học cao cấp hơn',
        ),
        SizedBox(height: 12),
        _buildBenefitItem(
          'Bạn có thể điều chỉnh gói ở trên App Store hoặc GooglePlay. Xem thêm về chính sách và điều khoản tại đây.',
        ),
      ],
    );
  }

  Widget _buildBenefitItem(String text) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          margin: EdgeInsets.only(top: 6, right: 12),
          width: 4,
          height: 4,
          decoration: BoxDecoration(
            color: Colors.black,
            shape: BoxShape.circle,
          ),
        ),
        Expanded(
          child: Text(
            text,
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[700],
              height: 1.4,
            ),
          ),
        ),
      ],
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Goo Plus Plans',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'SF Pro Display',
      ),
      home: SpecialPlansScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
