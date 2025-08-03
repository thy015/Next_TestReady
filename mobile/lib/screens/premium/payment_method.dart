import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/core/api_constants.dart';
import 'dart:convert';
import 'package:url_launcher/url_launcher.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../screens/premium/premium.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:intl/intl.dart';

enum PaymentMethod { stripe, momo }

class PaymentMethodScreen extends StatefulWidget {
  final Plan selectedPlan;

  const PaymentMethodScreen({Key? key, required this.selectedPlan})
    : super(key: key);

  @override
  _PaymentMethodScreenState createState() => _PaymentMethodScreenState();
}

class _PaymentMethodScreenState extends State<PaymentMethodScreen> {
  PaymentMethod selectedPaymentMethod = PaymentMethod.stripe;
  bool isLoading = false;

  final List<Map<String, dynamic>> paymentMethods = [
    {
      'method': PaymentMethod.stripe,
      'title': 'Thanh toán Stripe',
      'subtitle': 'Visa, Mastercard, JCB - An toàn & bảo mật',
      'icon': Icons.credit_card,
      'color': Color(0xFF6772E5),
      'badge': 'Phổ biến',
    },
    {
      'method': PaymentMethod.momo,
      'title': 'Ví MoMo',
      'subtitle': 'Thanh toán nhanh chóng qua ví điện tử',
      'icon': Icons.account_balance_wallet,
      'color': Color(0xFFD82D8B),
      'badge': 'Nhanh chóng',
    },
  ];

  final NumberFormat vndFormatter = NumberFormat.currency(
    locale: 'vi_VN',
    symbol: '₫',
    decimalDigits: 0,
  );

  Future<int> getUserId() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    if (userJson != null) {
      final userData = jsonDecode(userJson);
      return userData['id'] ?? 0;
    }
    return 0;
  }

  Future<void> processPayment() async {
    setState(() {
      isLoading = true;
    });

    try {
      switch (selectedPaymentMethod) {
        case PaymentMethod.stripe:
          await createStripePaymentIntent();
          break;
        case PaymentMethod.momo:
          await createMoMoPayment();
          break;
      }
    } catch (e) {
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> createStripePaymentIntent() async {
    final body = {
      'idPackage': widget.selectedPlan.id,
      'name': widget.selectedPlan.label,
      'duration': widget.selectedPlan.months,
      'price': widget.selectedPlan.price,
      'price_per_month': widget.selectedPlan.pricePerMonth,
      'discount': widget.selectedPlan.discount,
      'payment_method': 'stripe',
    };

    final uri = Uri.parse(
      '${ApiConstants.baseUrl}/checkout/create-payment-intent',
    );
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token') ?? '';

    final response = await http.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode(body),
    );

    if (response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final clientSecret = json['clientSecret'];

      try {
        await Stripe.instance.initPaymentSheet(
          paymentSheetParameters: SetupPaymentSheetParameters(
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'Goo Premium',
            style: ThemeMode.system,
          ),
        );

        await Stripe.instance.presentPaymentSheet();
        final confirmUri = Uri.parse(
          '${ApiConstants.baseUrl}/checkout/confirm-payment',
        );
        final confirmResponse = await http.post(
          confirmUri,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token',
          },
          body: jsonEncode({
            'idPackage': widget.selectedPlan.id,
            'duration': widget.selectedPlan.months,
          }),
        );

        if (confirmResponse.statusCode == 201 ||
            confirmResponse.statusCode == 200) {
          Navigator.pop(context, true);
        } else {
          throw Exception(
            "Thanh toán thành công nhưng không xác nhận gói được",
          );
        }
      } on Exception catch (e) {
        if (e is StripeException) {
        } else {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text("Lỗi không xác định: $e")));
        }
      }
    } else {
      throw Exception('Không thể tạo payment intent');
    }
  }

  Future<void> createMoMoPayment() async {
    final body = {
      'idPackage': widget.selectedPlan.id,
      'name': widget.selectedPlan.label,
      'duration': widget.selectedPlan.months,
      'price': widget.selectedPlan.price,
      'payment_method': 'momo',
    };

    final uri = Uri.parse('http://192.168.1.3:4040/payment/momo');
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token') ?? '';

    final response = await http.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode(body),
    );

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final payUrl = json['payUrl'];
      if (payUrl != null) {
        final uriToLaunch = Uri.parse(payUrl);
        if (await canLaunchUrl(uriToLaunch)) {
          await launchUrl(uriToLaunch, mode: LaunchMode.externalApplication);
        }
      }
    } else {
      throw Exception('Không thể tạo thanh toán MoMo');
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.grey[50],
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          leading: IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.black),
            onPressed: () => Navigator.pop(context),
          ),
          title: Text(
            'Phương thức thanh toán',
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
              Container(
                padding: EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Tóm tắt đơn hàng',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Goo Plus - ${widget.selectedPlan.duration}',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              widget.selectedPlan.label,
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            if (widget.selectedPlan.discount > 0) ...[
                              Text(
                                vndFormatter.format(
                                  widget.selectedPlan.price +
                                      widget.selectedPlan.discount,
                                ),
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.grey[500],
                                  decoration: TextDecoration.lineThrough,
                                ),
                              ),
                              SizedBox(height: 2),
                            ],
                            Text(
                              vndFormatter.format(widget.selectedPlan.price),
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF4285F4),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    if (widget.selectedPlan.discount > 0) ...[
                      SizedBox(height: 12),
                      Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.green.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: Colors.green.withOpacity(0.3),
                          ),
                        ),
                        child: Text(
                          'Tiết kiệm ${vndFormatter.format(widget.selectedPlan.discount)}',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.green[700],
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              SizedBox(height: 24),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Chọn phương thức thanh toán',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(height: 16),
                    Expanded(
                      child: ListView.separated(
                        itemCount: paymentMethods.length,
                        separatorBuilder: (_, __) => SizedBox(height: 12),
                        itemBuilder: (context, index) {
                          final method = paymentMethods[index];
                          final isSelected =
                              selectedPaymentMethod == method['method'];

                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                selectedPaymentMethod = method['method'];
                              });
                            },
                            child: Container(
                              padding: EdgeInsets.all(20),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                border: Border.all(
                                  color:
                                      isSelected
                                          ? Color(0xFF4285F4)
                                          : Colors.grey[300]!,
                                  width: isSelected ? 2 : 1,
                                ),
                                borderRadius: BorderRadius.circular(16),
                                boxShadow:
                                    isSelected
                                        ? [
                                          BoxShadow(
                                            color: Color(
                                              0xFF4285F4,
                                            ).withOpacity(0.1),
                                            blurRadius: 8,
                                            offset: Offset(0, 2),
                                          ),
                                        ]
                                        : [],
                              ),
                              child: Stack(
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        width: 56,
                                        height: 56,
                                        decoration: BoxDecoration(
                                          color: method['color'].withOpacity(
                                            0.1,
                                          ),
                                          borderRadius: BorderRadius.circular(
                                            16,
                                          ),
                                        ),
                                        child: Icon(
                                          method['icon'],
                                          color: method['color'],
                                          size: 28,
                                        ),
                                      ),
                                      SizedBox(width: 16),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              method['title'],
                                              style: TextStyle(
                                                fontSize: 18,
                                                fontWeight: FontWeight.w600,
                                                color: Colors.black,
                                              ),
                                            ),
                                            SizedBox(height: 6),
                                            Text(
                                              method['subtitle'],
                                              style: TextStyle(
                                                fontSize: 14,
                                                color: Colors.grey[600],
                                                height: 1.3,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  if (method['badge'] != null)
                                    Positioned(
                                      top: 0,
                                      right: 0,
                                      child: Container(
                                        padding: EdgeInsets.symmetric(
                                          horizontal: 8,
                                          vertical: 4,
                                        ),
                                        decoration: BoxDecoration(
                                          color: method['color'],
                                          borderRadius: BorderRadius.circular(
                                            12,
                                          ),
                                        ),
                                        child: Text(
                                          method['badge'],
                                          style: TextStyle(
                                            fontSize: 10,
                                            color: Colors.white,
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blue.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.blue.withOpacity(0.1)),
                ),
                child: Row(
                  children: [
                    Icon(Icons.security, color: Color(0xFF4285F4), size: 20),
                    SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Thanh toán được bảo mật bằng mã hóa SSL 256-bit',
                        style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: isLoading ? null : processPayment,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF251C91),
                  disabledBackgroundColor: Colors.grey[300],
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  minimumSize: Size(double.infinity, 56),
                  elevation: 0,
                ),
                child:
                    isLoading
                        ? Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                valueColor: AlwaysStoppedAnimation<Color>(
                                  Colors.white,
                                ),
                              ),
                            ),
                            SizedBox(width: 12),
                            Text(
                              'Đang xử lý...',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        )
                        : Text(
                          'Thanh toán ${vndFormatter.format(widget.selectedPlan.price)}',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
