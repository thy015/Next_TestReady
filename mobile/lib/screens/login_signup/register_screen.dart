import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../screens/login_signup/login_screen.dart';
import 'package:mobile/core/api_constants.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _fullnameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  final TextEditingController _birthdayController = TextEditingController();

  final FocusNode _fullnameFocusNode = FocusNode();
  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _phoneFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();
  final FocusNode _confirmPasswordFocusNode = FocusNode();
  final FocusNode _birthdayFocusNode = FocusNode();

  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  final _formKey = GlobalKey<FormState>();
  String? _registerError;
  DateTime? _selectedDate;
  bool _isLoading = false;

  @override
  void dispose() {
    _fullnameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _birthdayController.dispose();
    _fullnameFocusNode.dispose();
    _emailFocusNode.dispose();
    _phoneFocusNode.dispose();
    _passwordFocusNode.dispose();
    _confirmPasswordFocusNode.dispose();
    _birthdayFocusNode.dispose();
    super.dispose();
  }

  InputDecoration inputDecoration({
    required String hintText,
    required bool isFocused,
    Widget? suffixIcon,
  }) {
    return InputDecoration(
      hintText: hintText,
      filled: true,
      fillColor: isFocused ? Colors.white : const Color(0xFFE2E8F0),
      hintStyle: const TextStyle(color: Color(0xFF94A3B8), fontSize: 16),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Color(0xFF2B5CE6), width: 1.5),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Colors.red, width: 1.5),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Colors.red, width: 1.5),
      ),
      suffixIcon: suffixIcon,
      errorStyle: const TextStyle(color: Colors.red, fontSize: 14),
    );
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime(2000),
      firstDate: DateTime(1950),
      lastDate: DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: const ColorScheme.light(
              primary: Color(0xFF2B5CE6),
              onPrimary: Colors.white,
              surface: Colors.white,
              onSurface: Colors.black,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
        _birthdayController.text =
            "${picked.year}-${picked.month.toString().padLeft(2, '0')}-${picked.day.toString().padLeft(2, '0')}";
      });
    }
  }

  String _parseErrorMessage(dynamic errorData) {
    if (errorData == null) return 'Đăng ký thất bại';

    if (errorData is String) {
      return errorData;
    }

    if (errorData is List) {
      if (errorData.isNotEmpty) {
        return errorData.first.toString();
      }
      return 'Đăng ký thất bại';
    }

    if (errorData is Map) {
      if (errorData.containsKey('message')) {
        return _parseErrorMessage(errorData['message']);
      }
      if (errorData.containsKey('error')) {
        return _parseErrorMessage(errorData['error']);
      }
    }

    return errorData.toString();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _registerError = null;
      _isLoading = true;
    });

    final fullname = _fullnameController.text.trim();
    final email = _emailController.text.trim();
    final birthday = _birthdayController.text.trim();
    final password = _passwordController.text.trim();
    final phoneNumber = _phoneController.text.trim();

    try {
      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/user/create-user'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'fullname': fullname,
          'email': email,
          'birthday': birthday,
          'password': password,
          'phone_number': phoneNumber,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 201 || response.statusCode == 200) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Đăng ký thành công!'),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const LoginScreen()),
          );
        }
      } else {
        setState(() {
          _registerError =
              _parseErrorMessage(data['message']) ?? 'Đăng ký thất bại';
        });
      }
    } catch (e) {
      setState(() {
        _registerError = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 40),
                const Text(
                  'Đăng Ký',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2B5CE6),
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                const Text(
                  'Tạo tài khoản mới',
                  style: TextStyle(fontSize: 16, color: Color(0xFF64748B)),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),

                TextFormField(
                  controller: _fullnameController,
                  focusNode: _fullnameFocusNode,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: inputDecoration(
                    hintText: 'Họ và tên',
                    isFocused: _fullnameFocusNode.hasFocus,
                  ),
                  validator:
                      (value) =>
                          value == null || value.trim().isEmpty
                              ? 'Vui lòng nhập họ và tên'
                              : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _emailController,
                  focusNode: _emailFocusNode,
                  keyboardType: TextInputType.emailAddress,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: inputDecoration(
                    hintText: 'Email',
                    isFocused: _emailFocusNode.hasFocus,
                  ),
                  validator:
                      (value) =>
                          value == null || !value.contains('@')
                              ? 'Email không hợp lệ'
                              : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _phoneController,
                  focusNode: _phoneFocusNode,
                  keyboardType: TextInputType.phone,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: inputDecoration(
                    hintText: 'Số điện thoại',
                    isFocused: _phoneFocusNode.hasFocus,
                  ),
                  validator:
                      (value) =>
                          value == null || value.trim().length < 10
                              ? 'Số điện thoại không hợp lệ'
                              : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _birthdayController,
                  focusNode: _birthdayFocusNode,
                  readOnly: true,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: inputDecoration(
                    hintText: 'Ngày sinh (YYYY-MM-DD)',
                    isFocused: _birthdayFocusNode.hasFocus,
                    suffixIcon: IconButton(
                      icon: const Icon(
                        Icons.calendar_today,
                        color: Color(0xFF94A3B8),
                      ),
                      onPressed: _selectDate,
                    ),
                  ),
                  onTap: _selectDate,
                  validator:
                      (value) =>
                          value == null || value.trim().isEmpty
                              ? 'Vui lòng chọn ngày sinh'
                              : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _passwordController,
                  focusNode: _passwordFocusNode,
                  obscureText: _obscurePassword,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: inputDecoration(
                    hintText: 'Mật khẩu',
                    isFocused: _passwordFocusNode.hasFocus,
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_off
                            : Icons.visibility,
                        color: const Color(0xFF94A3B8),
                      ),
                      onPressed:
                          () => setState(
                            () => _obscurePassword = !_obscurePassword,
                          ),
                    ),
                  ),
                  validator:
                      (value) =>
                          value == null || value.length < 6
                              ? 'Mật khẩu phải có ít nhất 6 ký tự'
                              : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _confirmPasswordController,
                  focusNode: _confirmPasswordFocusNode,
                  obscureText: _obscureConfirmPassword,
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: inputDecoration(
                    hintText: 'Xác nhận mật khẩu',
                    isFocused: _confirmPasswordFocusNode.hasFocus,
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscureConfirmPassword
                            ? Icons.visibility_off
                            : Icons.visibility,
                        color: const Color(0xFF94A3B8),
                      ),
                      onPressed:
                          () => setState(
                            () =>
                                _obscureConfirmPassword =
                                    !_obscureConfirmPassword,
                          ),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Vui lòng xác nhận mật khẩu';
                    }
                    if (value != _passwordController.text) {
                      return 'Mật khẩu không khớp';
                    }
                    return null;
                  },
                ),

                if (_registerError != null) ...[
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.red.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.red.withOpacity(0.3)),
                    ),
                    child: Text(
                      _registerError!,
                      style: const TextStyle(color: Colors.red, fontSize: 14),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ],

                const SizedBox(height: 32),

                ElevatedButton(
                  onPressed: _isLoading ? null : _register,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2B5CE6),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 0,
                  ),
                  child:
                      _isLoading
                          ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(
                                Colors.white,
                              ),
                            ),
                          )
                          : const Text(
                            'Đăng Ký',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                ),

                const SizedBox(height: 24),

                TextButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const LoginScreen(),
                      ),
                    );
                  },
                  child: const Text(
                    'Đã có tài khoản? Đăng nhập',
                    style: TextStyle(
                      color: Color(0xFF64748B),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),

                const SizedBox(height: 24),

                const Text(
                  'Hoặc tiếp tục với',
                  style: TextStyle(color: Color(0xFF64748B), fontSize: 14),
                  textAlign: TextAlign.center,
                ),

                const SizedBox(height: 24),

                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildSocialButton(
                      icon: Icons.g_mobiledata,
                      onPressed: () {},
                    ),
                    const SizedBox(width: 16),
                    _buildSocialButton(icon: Icons.facebook, onPressed: () {}),
                    const SizedBox(width: 16),
                    _buildSocialButton(icon: Icons.apple, onPressed: () {}),
                  ],
                ),

                const SizedBox(height: 48),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSocialButton({
    required IconData icon,
    required VoidCallback onPressed,
  }) {
    return Container(
      width: 56,
      height: 56,
      decoration: BoxDecoration(
        color: const Color(0xFFE2E8F0),
        borderRadius: BorderRadius.circular(12),
      ),
      child: IconButton(
        onPressed: onPressed,
        icon: Icon(icon, color: const Color(0xFF64748B), size: 24),
      ),
    );
  }
}
