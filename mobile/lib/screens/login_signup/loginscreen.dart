import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/screens/main_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController pwController = TextEditingController();
  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode pwFocus = FocusNode();
  bool obscurePw = true;

  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _emailController.dispose();
    pwController.dispose();
    _emailFocusNode.dispose();
    pwFocus.dispose();
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
      suffixIcon: suffixIcon,
    );
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    final email = _emailController.text.trim();
    final password = pwController.text.trim();

    try {
      print('im gay LOGIN TRC RESPONSE');
      final response = await http.post(
        Uri.parse('http://10.21.11.97:4040/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      final data = jsonDecode(response.body);
      print('im gay LOGIN');
      if (response.statusCode == 201 && data['access_token'] != null) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', data['access_token']);
        await prefs.setString('user', jsonEncode(data['user_payload']));
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const MainScreen()),
        );
      } else {
        _showError(data['message'] ?? 'Đăng nhập thất bại');
      }
    } catch (e) {
      _showError('Đã xảy ra lỗi. Vui lòng thử lại.' + e.toString());
    }
  }

  void _showError(String message) {
    showDialog(
      context: context,
      builder:
          (ctx) => AlertDialog(
            title: const Text('Lỗi'),
            content: Text(message),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('OK'),
              ),
            ],
          ),
    );
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
                const SizedBox(height: 60),
                const Text(
                  'Đăng Nhập',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2B5CE6),
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                const Text(
                  'Chào mừng bạn trở lại',
                  style: TextStyle(fontSize: 16, color: Color(0xFF64748B)),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 48),
                TextFormField(
                  controller: _emailController,
                  focusNode: _emailFocusNode,
                  keyboardType: TextInputType.emailAddress,
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
                  controller: pwController,
                  focusNode: pwFocus,
                  obscureText: obscurePw,
                  decoration: inputDecoration(
                    hintText: 'Mật khẩu',
                    isFocused: pwFocus.hasFocus,
                    suffixIcon: IconButton(
                      icon: Icon(
                        obscurePw ? Icons.visibility_off : Icons.visibility,
                        color: const Color(0xFF94A3B8),
                      ),
                      onPressed: () => setState(() => obscurePw = !obscurePw),
                    ),
                  ),
                  validator:
                      (value) =>
                          value == null || value.length < 6
                              ? 'Mật khẩu phải có ít nhất 6 ký tự'
                              : null,
                ),
                const SizedBox(height: 16),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Quên mật khẩu',
                      style: TextStyle(
                        color: Color(0xFF2B5CE6),
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _login,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2B5CE6),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 0,
                  ),
                  child: const Text(
                    'Đăng Nhập',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                ),
                const SizedBox(height: 24),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    'Tạo tài khoản mới',
                    style: TextStyle(
                      color: Color(0xFF64748B),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                const SizedBox(height: 48),
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
